import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "inswe-fallback-secret-change-in-production"
);

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required." },
        { status: 400 }
      );
    }

    const record = otpStore.get(email);

    if (!record) {
      return NextResponse.json(
        { error: "No verification code found. Please request a new one." },
        { status: 400 }
      );
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return NextResponse.json(
        { error: "Code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    record.attempts += 1;

    if (record.attempts > 5) {
      otpStore.delete(email);
      return NextResponse.json(
        { error: "Too many incorrect attempts. Please request a new code." },
        { status: 429 }
      );
    }

    if (record.code !== code.trim()) {
      return NextResponse.json(
        { error: `Incorrect code. ${5 - record.attempts} attempt${5 - record.attempts === 1 ? "" : "s"} remaining.` },
        { status: 400 }
      );
    }

    // ✅ Code is correct — delete it so it can't be reused
    otpStore.delete(email);

    // Issue a signed JWT session token (7-day expiry)
    const token = await new SignJWT({ email, verified: true })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true, email });

    // httpOnly session cookie — secure, JS cannot read it
    response.cookies.set("inswe_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // Readable cookie — JS can read this for UI display (email initial in header)
    response.cookies.set("inswe_user", email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

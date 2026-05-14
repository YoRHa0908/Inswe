import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, body } = await req.json();

    if (!email || !body) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // Send notification to the store owner
    await transporter.sendMail({
      from: `"Inswè Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // send to yourself
      replyTo: email,
      subject: `New contact message from ${name || email}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff;">
          <h2 style="font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 20px;">New contact message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-size:13px;color:#888;width:80px;">Name</td><td style="padding:8px 0;font-size:14px;color:#1a1a1a;">${name || "—"}</td></tr>
            <tr><td style="padding:8px 0;font-size:13px;color:#888;">Email</td><td style="padding:8px 0;font-size:14px;color:#1a1a1a;"><a href="mailto:${email}" style="color:#2563EB;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;font-size:13px;color:#888;">Phone</td><td style="padding:8px 0;font-size:14px;color:#1a1a1a;">${phone || "—"}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px;">
            <p style="font-size:13px;color:#888;margin:0 0 8px;">Message</p>
            <p style="font-size:14px;color:#1a1a1a;margin:0;white-space:pre-wrap;">${body}</p>
          </div>
        </div>
      `,
      text: `Name: ${name || "—"}\nEmail: ${email}\nPhone: ${phone || "—"}\n\nMessage:\n${body}`,
    });

    // Send confirmation to the user
    await transporter.sendMail({
      from: `"Inswè" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — Inswè",
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#fff;">
          <h2 style="font-size:20px;font-weight:700;color:#1a1a1a;margin:0 0 8px;">Inswè</h2>
          <p style="font-size:15px;color:#555;margin:0 0 24px;">Thanks for reaching out, ${name ? name.split(" ")[0] : "there"}!</p>
          <p style="font-size:14px;color:#444;margin:0 0 16px;">We've received your message and will get back to you as soon as possible.</p>
          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="font-size:13px;color:#888;margin:0 0 6px;">Your message</p>
            <p style="font-size:14px;color:#1a1a1a;margin:0;white-space:pre-wrap;">${body}</p>
          </div>
          <p style="font-size:13px;color:#aaa;margin:0;">— The Inswè team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

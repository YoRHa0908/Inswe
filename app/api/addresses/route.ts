import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "inswe-fallback-secret-change-in-production"
);

async function getEmailFromSession(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("inswe_session")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return (payload as any).email ?? null;
  } catch {
    return null;
  }
}

// GET — fetch all addresses
export async function GET() {
  const email = await getEmailFromSession();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ addresses: data ?? [] });
}

// POST — create address
export async function POST(req: NextRequest) {
  const email = await getEmailFromSession();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // Ensure profile row exists first
  await supabase.from("profiles").upsert({ email }, { onConflict: "email" });

  // If new address is default, clear existing defaults
  if (body.isDefault) {
    await supabase.from("addresses").update({ is_default: false }).eq("email", email);
  }

  // If this is the first address, make it default automatically
  const { count } = await supabase.from("addresses").select("*", { count: "exact", head: true }).eq("email", email);
  const isDefault = body.isDefault || count === 0;

  const { data, error } = await supabase
    .from("addresses")
    .insert({
      email,
      first_name: body.firstName,
      last_name: body.lastName,
      address: body.address,
      apartment: body.apartment,
      city: body.city,
      postcode: body.postcode,
      country: body.country,
      is_default: isDefault,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ address: data });
}

// PUT — update address
export async function PUT(req: NextRequest) {
  const email = await getEmailFromSession();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...fields } = body;

  if (fields.isDefault) {
    await supabase.from("addresses").update({ is_default: false }).eq("email", email);
  }

  const { data, error } = await supabase
    .from("addresses")
    .update({
      first_name: fields.firstName,
      last_name: fields.lastName,
      address: fields.address,
      apartment: fields.apartment,
      city: fields.city,
      postcode: fields.postcode,
      country: fields.country,
      is_default: fields.isDefault,
    })
    .eq("id", id)
    .eq("email", email)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ address: data });
}

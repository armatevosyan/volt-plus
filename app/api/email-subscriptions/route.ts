import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Անվավեր JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Սխալ հարցում" }, { status: 400 });
  }

  const { email } = body as Record<string, unknown>;
  if (typeof email !== "string") {
    return NextResponse.json({ error: "Էլ. հասցեն պարտադիր է" }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  if (!normalized || !isValidEmail(normalized)) {
    return NextResponse.json({ error: "Մուտքագրեք վավեր էլ. հասցե" }, { status: 400 });
  }

  const row = await prisma.emailSubscription.upsert({
    where: { email: normalized },
    create: { email: normalized },
    update: { updatedAt: new Date() },
  });

  return NextResponse.json({
    id: row.id,
    email: row.email,
    message: "Դուք բաժանորդագրվել եք։",
  });
}

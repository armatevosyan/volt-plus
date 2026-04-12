import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_COMMENT = 2000;
const MIN_PHONE = 6;
const MAX_PHONE = 32;

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function normalizePhone(s: string): string {
  return s.trim();
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

  const { phone, email, comment } = body as Record<string, unknown>;

  if (typeof phone !== "string") {
    return NextResponse.json({ error: "Հեռախոսահամարը պարտադիր է" }, { status: 400 });
  }
  const phoneTrimmed = normalizePhone(phone);
  if (phoneTrimmed.length < MIN_PHONE || phoneTrimmed.length > MAX_PHONE) {
    return NextResponse.json(
      { error: `Հեռախոսահամարը պետք է լինի ${MIN_PHONE}–${MAX_PHONE} նիշ` },
      { status: 400 },
    );
  }

  if (typeof email !== "string") {
    return NextResponse.json({ error: "Էլ. հասցեն պարտադիր է" }, { status: 400 });
  }
  const emailTrimmed = email.trim().toLowerCase();
  if (!emailTrimmed || !isValidEmail(emailTrimmed)) {
    return NextResponse.json({ error: "Անվավեր էլ. հասցե" }, { status: 400 });
  }

  let commentValue: string | null = null;
  if (comment !== undefined && comment !== null && comment !== "") {
    if (typeof comment !== "string") {
      return NextResponse.json({ error: "Մեկնաբանությունը տեքստ պետք է լինի" }, { status: 400 });
    }
    const c = comment.trim();
    if (c.length > MAX_COMMENT) {
      return NextResponse.json(
        { error: `Մեկնաբանությունը առավելագույնը ${MAX_COMMENT} նիշ` },
        { status: 400 },
      );
    }
    commentValue = c || null;
  }

  const offer = await prisma.offer.create({
    data: {
      phone: phoneTrimmed,
      email: emailTrimmed,
      comment: commentValue,
    },
  });

  return NextResponse.json({
    id: offer.id,
    message: "Շնորհակալություն։ Մենք կկապվենք ձեզ հետ։",
  });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_CONTENT = 4000;
const MIN_CONTENT = 10;
const MAX_AUTHOR = 120;

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

  const { content, author, rating } = body as Record<string, unknown>;

  if (typeof content !== "string") {
    return NextResponse.json(
      { error: "Կարծիքի տեքստը պարտադիր է" },
      { status: 400 },
    );
  }

  const trimmed = content.trim();
  if (trimmed.length < MIN_CONTENT) {
    return NextResponse.json(
      { error: `Նվազագույն երկարությունը ${MIN_CONTENT} նիշ է` },
      { status: 400 },
    );
  }
  if (trimmed.length > MAX_CONTENT) {
    return NextResponse.json(
      { error: `Առավելագույն երկարությունը ${MAX_CONTENT} նիշ է` },
      { status: 400 },
    );
  }

  let authorValue: string | null = null;
  if (author !== undefined && author !== null && author !== "") {
    if (typeof author !== "string") {
      return NextResponse.json({ error: "Անունը պետք է տեքստ լինի" }, { status: 400 });
    }
    const a = author.trim();
    if (a.length > MAX_AUTHOR) {
      return NextResponse.json(
        { error: `Անունը չի կարող գերազանցել ${MAX_AUTHOR} նիշը` },
        { status: 400 },
      );
    }
    authorValue = a || null;
  }

  let ratingValue: number | null = null;
  if (rating !== undefined && rating !== null) {
    const n = typeof rating === "number" ? rating : Number(rating);
    if (!Number.isInteger(n) || n < 1 || n > 5) {
      return NextResponse.json(
        { error: "Գնահատականը պետք է լինի 1–5 ամբողջ թիվ" },
        { status: 400 },
      );
    }
    ratingValue = n;
  }

  const review = await prisma.review.create({
    data: {
      content: trimmed,
      author: authorValue,
      rating: ratingValue,
    },
  });

  return NextResponse.json({
    id: review.id,
    message: "Շնորհակալություն, ձեր կարծիքը պահպանվել է։",
  });
}

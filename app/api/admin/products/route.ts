import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseStrings(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string" && x.trim().length > 0);
}

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const title = typeof o.title === "string" ? o.title.trim() : "";
  if (!title) {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  const description =
    typeof o.description === "string" ? o.description.trim() || null : null;
  const price = typeof o.price === "string" ? o.price.trim() || null : null;
  const imageUrls = parseStrings(o.imageUrls);

  const created = await prisma.product.create({
    data: {
      title,
      description,
      price,
      imageUrls,
    },
  });
  return NextResponse.json(created);
}

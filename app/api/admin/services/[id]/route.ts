import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseStrings(v: unknown): string[] | undefined {
  if (v === undefined) return undefined;
  if (!Array.isArray(v)) return undefined;
  const arr = v.filter((x): x is string => typeof x === "string" && x.trim().length > 0);
  return arr;
}

function parseSortOrderField(v: unknown): number | undefined {
  if (v === undefined) return undefined;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return undefined;
  return Math.trunc(Math.max(-2_147_483_648, Math.min(2_147_483_647, n)));
}

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const item = await prisma.service.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PATCH(req: Request, ctx: Ctx) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
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
  const data: {
    title?: string;
    description?: string | null;
    price?: string | null;
    imageUrls?: string[];
    sortOrder?: number;
  } = {};

  if (o.title !== undefined) {
    if (typeof o.title !== "string" || !o.title.trim()) {
      return NextResponse.json({ error: "Invalid title" }, { status: 400 });
    }
    data.title = o.title.trim();
  }

  if (o.description !== undefined) {
    data.description =
      typeof o.description === "string" ? o.description.trim() || null : null;
  }

  if (o.price !== undefined) {
    data.price = typeof o.price === "string" ? o.price.trim() || null : null;
  }

  const urls = parseStrings(o.imageUrls);
  if (urls !== undefined) {
    data.imageUrls = urls;
  }

  if (o.sortOrder !== undefined) {
    const so = parseSortOrderField(o.sortOrder);
    if (so === undefined) {
      return NextResponse.json({ error: "Invalid sortOrder" }, { status: 400 });
    }
    data.sortOrder = so;
  }

  try {
    const updated = await prisma.service.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  try {
    await prisma.service.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

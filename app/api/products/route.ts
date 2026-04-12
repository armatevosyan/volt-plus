import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const items = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

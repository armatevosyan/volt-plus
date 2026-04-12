import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      work: { select: { id: true, title: true } },
    },
  });
  return NextResponse.json(items);
}

import { NextResponse } from "next/server";
import { isCreateAdminAllowed } from "@/lib/allow-create-admin";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function POST(req: Request) {
  try {
    if (!isCreateAdminAllowed()) {
      return NextResponse.json(
        { error: "Գրանցումը թույլատրված չէ" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (username.length < 3) {
      return NextResponse.json(
        { error: "Օգտանունը պետք է լինի առնվազն 3 նիշ" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Գաղտնաբառը պետք է լինի առնվազն 6 նիշ" },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json(
        { error: "Այդ օգտանունն արդեն գործածված է" },
        { status: 409 },
      );
    }

    const hashed = await hashPassword(password);
    await prisma.user.create({
      data: {
        username,
        password: hashed,
        role: "admin",
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Սխալ սերվերում" }, { status: 500 });
  }
}

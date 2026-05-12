import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = getAuthUser();
  if (!auth) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await prisma.user.findUnique({
    where: { email: auth.email },
    select: {
      id: true,
      email: true,
      name: true,
      firstName: true,
      lastName: true,
      avatar: true,
      isAdmin: true,
    },
  });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user });
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { signToken, COOKIE_NAME } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Called after Google OAuth succeeds — creates our custom JWT cookie
// and ensures the user exists in our DB.
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login?error=google");
  }

  const email = session.user.email;
  const name = session.user.name ?? email.split("@")[0];
  const image = session.user.image ?? undefined;

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      avatar: image,
    },
    create: {
      email,
      name,
      avatar: image,
      verified: true,
    },
  });

  const token = signToken({
    userId: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/dashboard");
}

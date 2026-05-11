import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signToken, COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Called after Google OAuth succeeds — creates our custom JWT cookie
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login?error=google");
  }

  // Derive a stable numeric ID from the email (mock; replace with DB lookup in prod)
  const userId = Math.abs(
    session.user.email.split("").reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0) % 1_000_000
  );

  const token = signToken({
    userId,
    email: session.user.email,
    isAdmin: false,
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

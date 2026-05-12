import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL } = process.env;

const missing: string[] = [];
if (!GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID");
if (!GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET");
if (!NEXTAUTH_SECRET) missing.push("NEXTAUTH_SECRET");
if (process.env.NODE_ENV === "production" && !NEXTAUTH_URL) missing.push("NEXTAUTH_URL");

if (missing.length) {
  console.error(
    `[next-auth] Missing required env var(s): ${missing.join(", ")}. ` +
    `Set them in Vercel → Settings → Environment Variables and redeploy.`,
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? "",
      clientSecret: GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/`) return `${baseUrl}/api/auth/google-sync`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/api/auth/google-sync`;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(`[next-auth][error][${code}]`, metadata);
    },
    warn(code) {
      console.warn(`[next-auth][warn][${code}]`);
    },
  },
};

import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // After Google sign-in, go to google-sync which sets our custom cookie
      if (url === baseUrl || url === `${baseUrl}/`) return `${baseUrl}/api/auth/google-sync`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/api/auth/google-sync`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

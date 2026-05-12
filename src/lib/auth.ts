import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { JWTPayload } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("[auth] Missing JWT_SECRET env var. Set it in Vercel → Settings → Environment Variables.");
}

export function signToken(payload: JWTPayload): string {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  if (!JWT_SECRET) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function getAuthUser(): JWTPayload | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("cambiazo_token")?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export const COOKIE_NAME = "cambiazo_token";

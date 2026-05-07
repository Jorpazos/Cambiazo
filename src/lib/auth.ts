import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { JWTPayload } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET ?? "cambiazo-secret-dev-key-change-in-prod";

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
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

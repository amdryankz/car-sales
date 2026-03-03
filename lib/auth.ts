import { SignJWT, jwtVerify } from "jose";
import { scryptSync, timingSafeEqual } from "crypto";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "fallback-secret-change-me"
);

const COOKIE_NAME = "token";
const EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 7 days

// ── JWT ───────────────────────────────────────────────────────────────────────

export type JWTPayload = {
  sub: string; // user id
  email: string;
  role: string;
};

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRY_SECONDS}s`)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// ── Password ──────────────────────────────────────────────────────────────────

/**
 * Verifies a plain-text password against a stored `salt:hash` string
 * produced by Node's `scryptSync`.
 */
export function verifyPassword(plain: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    const candidate = scryptSync(plain, salt, 64).toString("hex");
    return timingSafeEqual(Buffer.from(candidate), Buffer.from(hash));
  } catch {
    return false;
  }
}

// ── Cookie helpers ────────────────────────────────────────────────────────────

export { COOKIE_NAME, EXPIRY_SECONDS };

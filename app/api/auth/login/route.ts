import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken, verifyPassword, COOKIE_NAME, EXPIRY_SECONDS } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    // Look up user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    // Sign JWT
    const token = await signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // Build response and attach HttpOnly cookie
    const response = NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: EXPIRY_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("[POST /api/auth/login]", error);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}

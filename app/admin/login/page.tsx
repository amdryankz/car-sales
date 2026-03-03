"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Login gagal. Coba lagi.");
      }
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-1 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900">
            <Lock size={18} className="text-white" />
          </div>
          <h1 className="mt-3 text-xl font-extrabold tracking-tight text-zinc-900">
            Astra Daihatsu Aceh
          </h1>
          <p className="text-sm text-zinc-400">Admin Panel</p>
        </div>

        <Card className="border border-zinc-200/60 bg-white shadow-none rounded-2xl">
          <CardContent className="p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-zinc-900">Masuk</h2>
              <p className="text-xs text-zinc-400">
                Masukkan kredensial Anda untuk melanjutkan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="admin@daihatsu.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-zinc-200 bg-zinc-50 focus-visible:ring-zinc-900 text-sm"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-zinc-200 bg-zinc-50 focus-visible:ring-zinc-900 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-red-600 font-medium bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-full bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-semibold py-5 shadow-none transition-colors"
              >
                {loading ? "Memproses..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} Astra Daihatsu Aceh
        </p>
      </div>
    </div>
  );
}

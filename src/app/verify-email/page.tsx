"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, AlertCircle, CheckCircle, RotateCw } from "lucide-react";
import LogoMark from "@/components/LogoMark";

const CODE_LENGTH = 6;

function VerifyEmailInner() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-hero-gradient">
        <div className="glass-card p-8 max-w-md text-center">
          <AlertCircle className="h-10 w-10 mx-auto mb-3 text-amber-400" />
          <p className="text-white font-semibold mb-1">Falta el email</p>
          <p className="text-sm text-blue-200/60 mb-5">No sabemos a qué cuenta corresponde este código.</p>
          <Link href="/register" className="btn-primary inline-flex">Ir a registrarme</Link>
        </div>
      </div>
    );
  }

  function setDigit(i: number, value: string) {
    const clean = value.replace(/\D/g, "").slice(0, 1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = clean;
      return next;
    });
    if (clean && i < CODE_LENGTH - 1) {
      inputsRef.current[i + 1]?.focus();
    }
    setError("");
    setInfo("");
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== CODE_LENGTH) {
      setError("Completá los 6 dígitos.");
      return;
    }
    setSubmitting(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "No pudimos verificar el código.");
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Error de conexión. Probá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "No pudimos reenviar el código.");
        return;
      }
      setInfo("Listo, te enviamos un código nuevo. Revisá tu email (puede tardar un minuto).");
      setCooldown(30);
    } catch {
      setError("Error de conexión. Probá de nuevo.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-hero-gradient">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
            <LogoMark className="h-10 w-10" />
            <span className="text-2xl font-black text-white">
              Cambia<span className="text-brand-gold">zo</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Verificá tu email</h1>
          <p className="text-sm text-blue-200/60 mt-2 px-4 leading-relaxed">
            Te enviamos un código de 6 dígitos a <span className="text-white font-semibold">{email}</span>.
            Ingresalo abajo. Vence en 5 minutos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8">
          <div className="flex justify-center gap-2 mb-6" onPaste={onPaste}>
            {Array.from({ length: CODE_LENGTH }).map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digits[i]}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                onFocus={(e) => e.currentTarget.select()}
                className="h-14 w-12 rounded-xl border border-white/10 bg-white/5 text-center text-2xl font-black text-white focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all"
                aria-label={`Dígito ${i + 1}`}
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-sm text-red-400 mb-4">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}
          {info && (
            <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2.5 text-sm text-green-400 mb-4">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              {info}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || digits.join("").length !== CODE_LENGTH}
            className="btn-primary w-full py-3 disabled:opacity-60"
          >
            {submitting ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            {submitting ? "Verificando..." : "Verificar y entrar"}
          </button>

          <div className="mt-5 text-center">
            <p className="text-xs text-blue-200/50 mb-2">¿No te llegó? Revisá spam.</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending || cooldown > 0}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold hover:text-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCw className={`h-3.5 w-3.5 ${resending ? "animate-spin" : ""}`} />
              {cooldown > 0 ? `Reenviar (${cooldown}s)` : resending ? "Reenviando..." : "Reenviar código"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-blue-200/50">
          <Link href="/login" className="font-semibold text-brand-gold hover:text-amber-300 transition-colors">
            ← Volver al login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailInner />
    </Suspense>
  );
}

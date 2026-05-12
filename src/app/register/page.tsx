"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import LogoMark from "@/components/LogoMark";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function RegisterPage() {
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/api/auth/google-sync" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-hero-gradient">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
            <LogoMark className="h-10 w-10" />
            <span className="text-2xl font-black text-white">
              Cambia<span className="text-brand-gold">zo</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Creá tu cuenta gratis</h1>
          <p className="text-sm text-blue-200/60 mt-1">Empezá a intercambiar en menos de un minuto</p>
        </div>

        <div className="glass-card p-8">
          {/* Google sign-up */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200 mb-6 disabled:opacity-60"
          >
            {googleLoading ? (
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <GoogleIcon />
            )}
            {googleLoading ? "Conectando con Google..." : "Registrarse con Google"}
          </button>

          <p className="text-center text-xs text-blue-200/40 mt-2">
            El registro con email estará disponible próximamente.
          </p>

          <p className="text-xs text-blue-200/40 mt-6 text-center">
            Al registrarte aceptás los{" "}
            <Link href="/terminos" className="text-brand-gold hover:underline">Términos de Uso</Link>{" "}
            de Cambiazo.
          </p>

          <p className="mt-6 text-center text-sm text-blue-200/50">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="font-semibold text-brand-gold hover:text-amber-300 transition-colors">
              Ingresá acá
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

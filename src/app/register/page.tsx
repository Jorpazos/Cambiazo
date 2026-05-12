"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, User, UserPlus, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { PASSWORD_MIN_LENGTH } from "@/lib/passwordPolicy";

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

function checks(password: string) {
  return {
    length: password.length >= PASSWORD_MIN_LENGTH,
    letter: /[A-Za-z]/.test(password),
    number: /[0-9]/.test(password),
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const pw = checks(form.password);
  const pwAllOk = pw.length && pw.letter && pw.number;
  const matches = form.confirm.length > 0 && form.password === form.confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!pwAllOk) {
      setError(`La contraseña tiene que tener al menos ${PASSWORD_MIN_LENGTH} caracteres, una letra y un número.`);
      return;
    }
    if (!matches) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Error al registrarse");
        return;
      }
      router.push(`/verify-email?email=${encodeURIComponent(data.email ?? form.email)}`);
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/api/auth/google-sync" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-hero-gradient">
      <div className="w-full max-w-lg">
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

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-brand-card px-3 text-blue-200/40">o con tu email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  placeholder="Tu nombre"
                  className="input-field pl-10"
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  placeholder="tu@email.com"
                  className="input-field pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  required
                  placeholder={`Mínimo ${PASSWORD_MIN_LENGTH} caracteres`}
                  className="input-field pl-10 pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/40 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.password.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs">
                  <li className={pw.length ? "text-green-400" : "text-blue-200/40"}>
                    {pw.length ? "✓" : "○"} Al menos {PASSWORD_MIN_LENGTH} caracteres
                  </li>
                  <li className={pw.letter ? "text-green-400" : "text-blue-200/40"}>
                    {pw.letter ? "✓" : "○"} Al menos una letra
                  </li>
                  <li className={pw.number ? "text-green-400" : "text-blue-200/40"}>
                    {pw.number ? "✓" : "○"} Al menos un número
                  </li>
                </ul>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Repetir contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.confirm}
                  onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
                  required
                  placeholder="Repetí tu contraseña"
                  className="input-field pl-10 pr-10"
                  autoComplete="new-password"
                />
                {matches && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400" />
                )}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <p className="text-xs text-blue-200/40">
              Al registrarte aceptás los{" "}
              <Link href="/terminos" className="text-brand-gold hover:underline">Términos de Uso</Link>{" "}
              de Cambiazo. Te vamos a mandar un código por email para confirmar tu cuenta.
            </p>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
          </form>

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

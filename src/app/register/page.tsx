"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trophy, Mail, Lock, User, MapPin, UserPlus, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";

const PROVINCES = [
  "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba",
  "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja",
  "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan",
  "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán",
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "", province: "", city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          province: form.province,
          city: form.city,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error al registrarse");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-hero-gradient">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-blue-400 shadow-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black text-white">
              Cambia<span className="text-brand-gold">zo</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Creá tu cuenta gratis</h1>
          <p className="text-sm text-blue-200/60 mt-1">Empezá a intercambiar en menos de un minuto</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required placeholder="Tu nombre" className="input-field pl-10" autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  type="email" value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required placeholder="tu@email.com" className="input-field pl-10" autoComplete="email"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Provincia</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40 z-10" />
                  <select
                    value={form.province}
                    onChange={(e) => setForm((p) => ({ ...p, province: e.target.value }))}
                    className="input-field pl-10 appearance-none"
                  >
                    <option value="">Seleccioná...</option>
                    {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Ciudad</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                  placeholder="Tu ciudad" className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  type={showPass ? "text" : "password"} value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  required placeholder="Mínimo 6 caracteres" className="input-field pl-10 pr-10"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/40 hover:text-white transition-colors">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Repetir contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  type={showPass ? "text" : "password"} value={form.confirm}
                  onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
                  required placeholder="Repetí tu contraseña" className="input-field pl-10"
                  autoComplete="new-password"
                />
                {form.confirm && form.password === form.confirm && (
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
              de Cambiazo.
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
              {loading ? "Registrando..." : "Crear cuenta gratis"}
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

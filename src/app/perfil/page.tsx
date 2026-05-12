"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Mail, Phone, MapPin, Calendar, FileText, Save, User as UserIcon, CheckCircle, AlertCircle } from "lucide-react";

const PROVINCES = [
  "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba",
  "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja",
  "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan",
  "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán",
];

type ProfileForm = {
  firstName: string;
  lastName: string;
  phone: string;
  province: string;
  city: string;
  birthDate: string;
  bio: string;
};

const EMPTY_FORM: ProfileForm = {
  firstName: "",
  lastName: "",
  phone: "",
  province: "",
  city: "",
  birthDate: "",
  bio: "",
};

function splitName(fullName: string | null | undefined) {
  if (!fullName) return { firstName: "", lastName: "" };
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export default function PerfilPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/perfil");
        if (!res.ok) throw new Error("No se pudo cargar el perfil.");
        const { user } = await res.json();
        if (cancelled) return;

        const fallback = splitName(session?.user?.name);
        setForm({
          firstName: user.firstName ?? fallback.firstName,
          lastName: user.lastName ?? fallback.lastName,
          phone: user.phone ?? "",
          province: user.province ?? "",
          city: user.city ?? "",
          birthDate: user.birthDate ? user.birthDate.slice(0, 10) : "",
          bio: user.bio ?? "",
        });
      } catch {
        if (!cancelled) setError("No se pudo cargar el perfil. Recargá la página.");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, session?.user?.name]);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/perfil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "No se pudo guardar.");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || !loaded) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <svg className="h-8 w-8 animate-spin text-blue-400" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Mi perfil</h1>
          <p className="mt-1 text-sm text-blue-200/60">
            Completá tus datos para que otros coleccionistas te puedan contactar.
          </p>
        </div>

        {/* Account info from Google (read-only) */}
        <div className="glass-card p-6 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4">Cuenta vinculada</p>
          <div className="flex items-center gap-4">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "Avatar"}
                width={64}
                height={64}
                className="h-16 w-16 rounded-xl object-cover ring-2 ring-white/10"
                unoptimized
              />
            ) : (
              <div className="h-16 w-16 rounded-xl bg-brand-blue flex items-center justify-center text-2xl font-bold text-white">
                {session?.user?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-base font-bold text-white truncate">{session?.user?.name ?? "Sin nombre"}</p>
              <p className="text-sm text-blue-200/60 flex items-center gap-1.5 mt-0.5">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{session?.user?.email}</span>
              </p>
              <p className="text-xs text-blue-200/40 mt-1">Conectado con Google</p>
            </div>
          </div>
        </div>

        {/* Editable form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Nombre</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Tu nombre"
                  className="input-field pl-10"
                  autoComplete="given-name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Apellido</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Tu apellido"
                  className="input-field pl-10"
                  autoComplete="family-name"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+54 9 11 1234 5678"
                  className="input-field pl-10"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Fecha de nacimiento</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40 z-10" />
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                  className="input-field pl-10"
                  autoComplete="bday"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Provincia</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40 z-10" />
                <select
                  value={form.province}
                  onChange={(e) => handleChange("province", e.target.value)}
                  className="input-field pl-10 appearance-none"
                >
                  <option value="">Seleccioná tu provincia</option>
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Ciudad</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
                <input
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Tu ciudad"
                  className="input-field pl-10"
                  autoComplete="address-level2"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Bio corta</label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3 h-4 w-4 text-blue-200/40" />
              <textarea
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Contale al resto qué figuritas coleccionás, hace cuánto, qué selección te falta..."
                rows={3}
                maxLength={280}
                className="input-field pl-10 pt-3 resize-none"
              />
            </div>
            <p className="mt-1 text-xs text-blue-200/40 text-right">{form.bio.length}/280</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary py-2.5 px-6 disabled:opacity-60">
              <Save className="h-4 w-4" />
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-green-400">
                <CheckCircle className="h-4 w-4" />
                Guardado
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

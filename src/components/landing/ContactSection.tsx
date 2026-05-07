"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Left info */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
              Contacto
            </p>
            <h2 className="section-title text-2xl md:text-3xl">¿Necesitás ayuda?</h2>
            <p className="mt-3 text-sm text-blue-200/60 leading-relaxed">
              Escribinos por cualquier consulta sobre intercambios, compras o problemas con tu cuenta.
            </p>

            <div className="mt-6 space-y-4">
              {[
                { icon: Mail, label: "Email", value: "info@cambiazo.ar" },
                { icon: MessageSquare, label: "Horario", value: "Lun-Vie 10hs a 20hs" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/20">
                    <Icon className="h-4 w-4 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200/40">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 glass-card p-6">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                <CheckCircle className="h-12 w-12 text-green-400" />
                <h3 className="text-lg font-bold text-white">¡Mensaje enviado!</h3>
                <p className="text-sm text-blue-200/60">Te respondemos en menos de 24hs hábiles.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Nombre</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Asunto</label>
                  <select name="subject" value={form.subject} onChange={handleChange} className="input-field" required>
                    <option value="" disabled>Seleccioná un asunto...</option>
                    <option value="intercambio">Problema con un intercambio</option>
                    <option value="compra">Consulta sobre compra</option>
                    <option value="cuenta">Problema con mi cuenta</option>
                    <option value="reportar">Reportar usuario</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-200/60 mb-1.5">Mensaje</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Contanos tu consulta..."
                    className="input-field resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    No pudimos enviar tu mensaje. Intentá de nuevo.
                  </div>
                )}

                <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
                  {status === "loading" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

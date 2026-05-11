"use client";

import Link from "next/link";
import { ArrowRight, Users, Zap } from "lucide-react";

// Datos reales del álbum y torneo FIFA World Cup 2026
const STATS = [
  { label: "Figuritas en el álbum", value: "980",  note: "Panini oficial" },
  { label: "Selecciones participantes", value: "48", note: "Récord histórico" },
  { label: "Países sede", value: "3",   note: "USA · CAN · MEX" },
  { label: "Partidos del torneo", value: "104",  note: "Fase de grupos + eliminatorias" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blue blob — FIFA navy */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-navy/30 blur-3xl" />
        {/* Red blob — FIFA red */}
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />
        {/* Gold accent */}
        <div className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-brand-gold/8 blur-2xl" />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-brand-navy/20 blur-3xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,184,28,0.6) 1px, transparent 1px), linear-gradient(to right, rgba(255,184,28,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-sm font-semibold text-brand-gold">
            <Zap className="h-3.5 w-3.5" />
            <span>La comunidad del álbum FIFA World Cup 2026™</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Hacé el{" "}
            <span className="bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold bg-clip-text text-transparent">
              cambiazo
            </span>
            <br />
            de tus figuritas
            <br />
            del{" "}
            <span className="bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold bg-clip-text text-transparent">
              Mundial 2026
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-blue-200/70 max-w-2xl leading-relaxed">
            Intercambiá tus dobles, comprá las que te faltan y vendé lo que sobra.
            La plataforma argentina para completar el álbum{" "}
            <strong className="text-white">Panini FIFA World Cup 2026™</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Link href="/register" className="btn-gold text-base px-8 py-3.5 shadow-xl">
              <Users className="h-5 w-5" />
              Empezar Gratis
            </Link>
            <Link href="/marketplace" className="btn-outline text-base px-8 py-3.5">
              Ver Intercambios
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200/50">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Gratis para registrarse
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Sin datos de tarjeta
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Comunidad verificada
            </span>
          </div>
        </div>

        {/* Stats — datos reales del torneo */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-5 text-center hover:border-brand-navy/50 transition-colors duration-300 group"
            >
              <p className="text-2xl sm:text-3xl font-black text-white group-hover:text-brand-gold transition-colors duration-200">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-blue-200/70 font-semibold">{stat.label}</p>
              <p className="mt-0.5 text-[10px] text-blue-200/35 font-medium">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

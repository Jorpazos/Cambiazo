"use client";

import Link from "next/link";
import { Plus, Repeat2, ShoppingBag, Search, Trophy, Star, ArrowRight, PackageOpen } from "lucide-react";

const QUICK_ACTIONS = [
  { icon: Plus, label: "Nueva publicación", desc: "Ofrecé, vendé o buscá", href: "/dashboard/nueva", color: "from-blue-600 to-blue-400", glow: "shadow-blue-900/40" },
  { icon: Repeat2, label: "Mis intercambios", desc: "Ver tus publicaciones", href: "/dashboard/mis-figuritas", color: "from-violet-600 to-violet-400", glow: "shadow-violet-900/40" },
  { icon: Search, label: "Buscar matches", desc: "Usuarios que te encajan", href: "/marketplace", color: "from-amber-500 to-yellow-400", glow: "shadow-amber-900/40" },
  { icon: ShoppingBag, label: "Tienda", desc: "Comprar sobres y álbum", href: "/#tienda", color: "from-green-600 to-green-400", glow: "shadow-green-900/40" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-white">
              ¡Hola, <span className="text-brand-gold">coleccionista!</span> 👋
            </h1>
            <p className="mt-1 text-sm text-blue-200/60">
              Bienvenido a tu panel de Cambiazo. ¿Qué querés hacer hoy?
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2">
            <Star className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">0 intercambios</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Figuritas ofrecidas", value: "0", icon: "🃏" },
            { label: "Figuritas buscadas", value: "0", icon: "🔍" },
            { label: "Intercambios completados", value: "0", icon: "✅" },
            { label: "Reputación", value: "⭐ Nueva", icon: "🏆" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-blue-200/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <h2 className="text-lg font-bold text-white mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="glass-card p-5 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 group flex flex-col gap-4"
              >
                <div className={`w-fit flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} shadow-lg ${action.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{action.label}</p>
                  <p className="text-xs text-blue-200/50 mt-0.5">{action.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-200/30 group-hover:text-brand-gold group-hover:translate-x-1 transition-all duration-200 mt-auto" />
              </Link>
            );
          })}
        </div>

        {/* Empty state - my listings */}
        <h2 className="text-lg font-bold text-white mb-4">Mis publicaciones recientes</h2>
        <div className="glass-card p-12 text-center">
          <PackageOpen className="h-12 w-12 text-blue-200/20 mx-auto mb-4" />
          <p className="text-white/50 font-semibold">Todavía no publicaste nada</p>
          <p className="text-sm text-blue-200/30 mt-1 mb-5">
            Publicá las figuritas que tenés dobles o las que te faltan
          </p>
          <Link href="/dashboard/nueva" className="btn-primary inline-flex">
            <Plus className="h-4 w-4" />
            Crear primera publicación
          </Link>
        </div>
      </div>
    </div>
  );
}

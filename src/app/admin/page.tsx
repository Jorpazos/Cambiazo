"use client";

import { useState } from "react";
import { Users, Package, Image as ImageIcon, Plus, Edit3, Trash2, BarChart3, ShoppingBag, MessageSquare, Eye, Upload } from "lucide-react";
import { FEATURED_LISTINGS, STORE_PRODUCTS } from "@/lib/mockData";
import { formatPrice, cn } from "@/lib/utils";

type AdminTab = "dashboard" | "players" | "listings" | "products" | "messages" | "users";

const TABS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "players", label: "Jugadores", icon: ImageIcon },
  { id: "listings", label: "Publicaciones", icon: Package },
  { id: "products", label: "Tienda", icon: ShoppingBag },
  { id: "messages", label: "Mensajes", icon: MessageSquare },
  { id: "users", label: "Usuarios", icon: Users },
];

const MOCK_STATS = [
  { label: "Usuarios totales", value: "12.421", change: "+84 esta semana", color: "text-blue-400" },
  { label: "Publicaciones activas", value: "4.283", change: "+127 hoy", color: "text-green-400" },
  { label: "Mensajes recibidos", value: "38", change: "12 sin leer", color: "text-amber-400" },
  { label: "Ventas del mes", value: "$284.000", change: "+23% vs mes anterior", color: "text-violet-400" },
];

function DashboardTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <p className="text-xs text-blue-200/50 mb-1">{s.label}</p>
            <p className={`text-2xl font-black text-white`}>{s.value}</p>
            <p className={`text-xs mt-1 ${s.color}`}>{s.change}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <h3 className="font-bold text-white mb-4">Últimas publicaciones</h3>
        <div className="space-y-3">
          {FEATURED_LISTINGS.slice(0, 4).map((l) => (
            <div key={l.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-xs font-bold text-blue-400">
                  {l.player.number}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{l.player.name}</p>
                  <p className="text-xs text-blue-200/50">{l.user.name} · {l.player.country}</p>
                </div>
              </div>
              <span className={cn("text-xs font-bold px-2 py-1 rounded-full", {
                "bg-blue-500/20 text-blue-400": l.type === "CAMBIO",
                "bg-green-500/20 text-green-400": l.type === "VENDO",
                "bg-amber-500/20 text-amber-400": l.type === "BUSCO",
              })}>
                {l.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayersTab() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", country: "", number: "", position: "", section: "", image: "" });

  const handleSave = () => {
    alert("Jugador guardado (conectar con API real)");
    setShowForm(false);
    setForm({ name: "", country: "", number: "", position: "", section: "", image: "" });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white">Jugadores del álbum</h3>
        <button className="btn-primary text-sm py-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          Agregar jugador
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 border-brand-blue/20">
          <h4 className="font-bold text-white mb-4">Nuevo jugador</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: "name", label: "Nombre completo", placeholder: "ej. Lionel Messi" },
              { key: "country", label: "País / Selección", placeholder: "ej. Argentina" },
              { key: "number", label: "Nro. figurita", placeholder: "ej. 42" },
              { key: "position", label: "Posición", placeholder: "ej. Delantero" },
              { key: "section", label: "Código sección", placeholder: "ej. ARG" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-blue-200/60 mb-1.5">{label}</label>
                <input
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="input-field"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-blue-200/60 mb-1.5">URL de foto</label>
              <div className="flex gap-2">
                <input
                  value={form.image}
                  onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                  placeholder="https://..."
                  className="input-field flex-1"
                />
                <button className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Upload className="h-4 w-4 text-blue-200/60" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="btn-primary text-sm py-2" onClick={handleSave}>Guardar jugador</button>
            <button className="btn-outline text-sm py-2" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-blue-200/50 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-xs font-semibold text-blue-200/50 uppercase tracking-wider">Jugador</th>
                <th className="px-4 py-3 text-xs font-semibold text-blue-200/50 uppercase tracking-wider">País</th>
                <th className="px-4 py-3 text-xs font-semibold text-blue-200/50 uppercase tracking-wider">Posición</th>
                <th className="px-4 py-3 text-xs font-semibold text-blue-200/50 uppercase tracking-wider">Foto</th>
                <th className="px-4 py-3 text-xs font-semibold text-blue-200/50 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {FEATURED_LISTINGS.map((l) => (
                <tr key={l.player.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 font-bold text-brand-gold">{l.player.number}</td>
                  <td className="px-4 py-3 font-semibold text-white">{l.player.name}</td>
                  <td className="px-4 py-3 text-blue-200/60">{l.player.country}</td>
                  <td className="px-4 py-3 text-blue-200/60">{l.player.position ?? "—"}</td>
                  <td className="px-4 py-3">
                    {l.player.image ? (
                      <a href={l.player.image} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs">
                        <Eye className="h-3 w-3" /> Ver
                      </a>
                    ) : (
                      <span className="text-xs text-red-400/70">Sin foto</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductsTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white">Productos de la tienda</h3>
        <button className="btn-primary text-sm py-2">
          <Plus className="h-4 w-4" />
          Nuevo producto
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STORE_PRODUCTS.map((p) => (
          <div key={p.id} className="glass-card p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-white text-sm">{p.name}</p>
                <p className="text-xs text-blue-200/50 mt-0.5">{p.type}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            {p.description && <p className="text-xs text-blue-200/40 mb-3 line-clamp-2">{p.description}</p>}
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-white">{formatPrice(p.price)}</span>
              <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", p.stock > 10 ? "bg-green-500/20 text-green-400" : p.stock > 0 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400")}>
                Stock: {p.stock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab() {
  const MOCK_MESSAGES = [
    { id: 1, name: "Juan García", email: "juan@mail.com", subject: "intercambio", body: "Hola, tengo doble de Messi y busco Mbappé.", read: false, date: "hace 2hs" },
    { id: 2, name: "María López", email: "maria@mail.com", subject: "compra", body: "¿Tienen disponible el pack de 50?", read: false, date: "hace 5hs" },
    { id: 3, name: "Carlos Ruiz", email: "carlos@mail.com", subject: "cuenta", body: "No puedo iniciar sesión, me olvidé la contraseña.", read: true, date: "ayer" },
  ];

  return (
    <div className="space-y-3">
      {MOCK_MESSAGES.map((msg) => (
        <div key={msg.id} className={cn("glass-card p-4 hover:border-white/15 transition-colors cursor-pointer", !msg.read && "border-brand-blue/30")}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              {!msg.read && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-white text-sm">{msg.name}</p>
                  <span className="text-xs text-blue-200/40">{msg.email}</span>
                </div>
                <p className="text-xs text-blue-200/60 mt-0.5 capitalize">Asunto: {msg.subject}</p>
                <p className="text-sm text-blue-200/50 mt-1 line-clamp-2">{msg.body}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-blue-200/40">{msg.date}</p>
              {!msg.read && <span className="text-xs font-bold text-brand-gold">Nuevo</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersTab() {
  const MOCK_USERS = [
    { id: 1, name: "Pablo Mendez", email: "pablo@mail.com", province: "Buenos Aires", listings: 12, trades: 8, joined: "Ene 2026" },
    { id: 2, name: "Sofía Rodríguez", email: "sofia@mail.com", province: "Córdoba", listings: 7, trades: 5, joined: "Feb 2026" },
    { id: 3, name: "Lucas González", email: "lucas@mail.com", province: "Santa Fe", listings: 3, trades: 1, joined: "Mar 2026" },
  ];

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left">
              {["Usuario", "Email", "Provincia", "Publicaciones", "Intercambios", "Desde", "Acciones"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold text-blue-200/50 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((u) => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td className="px-4 py-3 font-semibold text-white">{u.name}</td>
                <td className="px-4 py-3 text-blue-200/60 text-xs">{u.email}</td>
                <td className="px-4 py-3 text-blue-200/60">{u.province}</td>
                <td className="px-4 py-3 text-center font-bold text-white">{u.listings}</td>
                <td className="px-4 py-3 text-center text-green-400 font-bold">{u.trades}</td>
                <td className="px-4 py-3 text-blue-200/40 text-xs">{u.joined}</td>
                <td className="px-4 py-3">
                  <button className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const tabContent: Record<AdminTab, React.ReactNode> = {
    dashboard: <DashboardTab />,
    players: <PlayersTab />,
    listings: (
      <div className="glass-card p-8 text-center text-blue-200/40">
        <Package className="h-10 w-10 mx-auto mb-3 opacity-30" />
        <p>Gestión de publicaciones en desarrollo</p>
      </div>
    ),
    products: <ProductsTab />,
    messages: <MessagesTab />,
    users: <UsersTab />,
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Admin header */}
      <div className="bg-gradient-to-r from-violet-900/50 to-brand-navy border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 border border-violet-500/30">
              <BarChart3 className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Panel de Administración</h1>
              <p className="text-xs text-blue-200/50">Cambiazo · Mundial 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-52 flex-shrink-0">
            <nav className="space-y-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      activeTab === tab.id
                        ? "bg-brand-blue/20 text-white border border-brand-blue/30"
                        : "text-blue-200/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
}

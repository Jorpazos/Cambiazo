"use client";

import { useState } from "react";
import {
  Users, Package, Image as ImageIcon, Plus,
  BarChart3, ShoppingBag, MessageSquare, Upload,
  ShoppingCart, CheckCircle, Truck, XCircle, Inbox,
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";

type AdminTab = "dashboard" | "ventas" | "players" | "listings" | "products" | "messages" | "users";
type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface MockOrder {
  id: number;
  status: OrderStatus;
  total: number;
  createdAt: string;
  user: { name: string; email: string; province: string };
  product: string;
}

const TABS: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard",     icon: BarChart3 },
  { id: "ventas",    label: "Ventas",        icon: ShoppingCart },
  { id: "players",   label: "Jugadores",     icon: ImageIcon },
  { id: "listings",  label: "Publicaciones", icon: Package },
  { id: "products",  label: "Tienda",        icon: ShoppingBag },
  { id: "messages",  label: "Mensajes",      icon: MessageSquare },
  { id: "users",     label: "Usuarios",      icon: Users },
];

const STATS = [
  { label: "Usuarios totales",      value: "0", change: "Sin datos",  color: "text-blue-400"   },
  { label: "Publicaciones activas", value: "0", change: "Sin datos",  color: "text-green-400"  },
  { label: "Mensajes recibidos",    value: "0", change: "Sin datos",  color: "text-amber-400"  },
  { label: "Ventas del mes",        value: "$0",change: "Sin datos",  color: "text-violet-400" },
];

const INITIAL_ORDERS: MockOrder[] = [];

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING:   "Pendiente",
  CONFIRMED: "Confirmado",
  SHIPPED:   "En camino",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING:   "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  CONFIRMED: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  SHIPPED:   "bg-violet-500/15 text-violet-400 border border-violet-500/25",
  DELIVERED: "bg-green-500/15 text-green-400 border border-green-500/25",
  CANCELLED: "bg-red-500/15 text-red-400 border border-red-500/25",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("es-AR", {
    day: "2-digit", month: "2-digit", year: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

type StatusFilter = OrderStatus | "ALL";

function VentasTab() {
  const [orders, setOrders] = useState<MockOrder[]>(INITIAL_ORDERS);
  const [filter, setFilter]  = useState<StatusFilter>("ALL");
  const [busy,   setBusy]    = useState<number | null>(null);

  const filtered  = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);
  const pending   = orders.filter((o) => o.status === "PENDING").length;
  const delivered = orders.filter((o) => o.status === "DELIVERED").length;
  const revenue   = orders.filter((o) => o.status !== "CANCELLED").reduce((s, o) => s + o.total, 0);

  function advance(id: number, next: OrderStatus) {
    setBusy(id);
    // In production: fetch(`/api/admin/orders?id=${id}`, { method: "PATCH", body: JSON.stringify({ status: next }) })
    setTimeout(() => {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: next } : o)));
      setBusy(null);
    }, 400);
  }

  const FILTERS: { label: string; value: StatusFilter }[] = [
    { label: "Todos",       value: "ALL"       },
    { label: "Pendientes",  value: "PENDING"   },
    { label: "Confirmados", value: "CONFIRMED" },
    { label: "En camino",   value: "SHIPPED"   },
    { label: "Entregados",  value: "DELIVERED" },
    { label: "Cancelados",  value: "CANCELLED" },
  ];

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-blue-200/50 mb-1">Pendientes de atención</p>
          <p className="text-3xl font-black text-amber-400">{pending}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-blue-200/50 mb-1">Ingresos totales</p>
          <p className="text-2xl font-black text-green-400">{formatPrice(revenue)}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-blue-200/50 mb-1">Órdenes entregadas</p>
          <p className="text-3xl font-black text-white">{delivered}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
              filter === f.value
                ? "bg-brand-blue/30 text-white border-brand-blue/50"
                : "bg-white/5 text-blue-200/60 border-white/10 hover:bg-white/10"
            )}
          >
            {f.label}
            {f.value !== "ALL" && (
              <span className="ml-1.5 opacity-50">
                ({orders.filter((o) => o.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["#Orden", "Cliente", "Producto", "Total", "Fecha", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-blue-200/50 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-blue-200/30">
                    No hay órdenes con este estado
                  </td>
                </tr>
              )}
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className={cn(
                    "border-b border-white/5 transition-all duration-300",
                    busy === order.id ? "opacity-40 pointer-events-none" : "hover:bg-white/[0.02]"
                  )}
                >
                  <td className="px-4 py-3 font-mono text-xs font-bold text-brand-gold">#{order.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-white text-xs">{order.user.name}</p>
                    <p className="text-[11px] text-blue-200/40">{order.user.email}</p>
                    <p className="text-[11px] text-blue-200/40">{order.user.province}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-blue-200/70 max-w-[140px]">{order.product}</td>
                  <td className="px-4 py-3 font-black text-white text-sm whitespace-nowrap">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3 text-[11px] text-blue-200/40 whitespace-nowrap">{fmtDate(order.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-bold px-2 py-1 rounded-full", STATUS_COLORS[order.status])}>
                      {STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {order.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => advance(order.id, "CONFIRMED")}
                            title="Confirmar orden"
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => advance(order.id, "CANCELLED")}
                            title="Cancelar"
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                      {order.status === "CONFIRMED" && (
                        <>
                          <button
                            onClick={() => advance(order.id, "SHIPPED")}
                            title="Marcar como enviado"
                            className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors"
                          >
                            <Truck className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => advance(order.id, "CANCELLED")}
                            title="Cancelar"
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                      {order.status === "SHIPPED" && (
                        <button
                          onClick={() => advance(order.id, "DELIVERED")}
                          title="Marcar como entregado"
                          className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {(order.status === "DELIVERED" || order.status === "CANCELLED") && (
                        <span className="text-xs text-blue-200/20">—</span>
                      )}
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

function DashboardTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <p className="text-xs text-blue-200/50 mb-1">{s.label}</p>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className={`text-xs mt-1 ${s.color}`}>{s.change}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <h3 className="font-bold text-white mb-4">Últimas publicaciones</h3>
        <div className="py-8 text-center text-blue-200/40 text-sm">
          <Inbox className="h-8 w-8 mx-auto mb-2 opacity-30" />
          Sin publicaciones todavía
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
              { key: "name",     label: "Nombre completo", placeholder: "ej. Lionel Messi" },
              { key: "country",  label: "País / Selección", placeholder: "ej. Argentina" },
              { key: "number",   label: "Nro. figurita",    placeholder: "ej. 42" },
              { key: "position", label: "Posición",         placeholder: "ej. Delantero" },
              { key: "section",  label: "Código sección",   placeholder: "ej. ARG" },
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

      <div className="glass-card p-12 text-center text-blue-200/40">
        <ImageIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
        <p className="text-white/80 font-semibold mb-1">Sin jugadores cargados</p>
        <p className="text-sm">Agregá el primero con el botón de arriba.</p>
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

      <div className="glass-card p-12 text-center text-blue-200/40">
        <ShoppingBag className="h-10 w-10 mx-auto mb-3 opacity-30" />
        <p className="text-white/80 font-semibold mb-1">Sin productos cargados</p>
        <p className="text-sm">Agregá el primer producto a la tienda.</p>
      </div>
    </div>
  );
}

function MessagesTab() {
  return (
    <div className="glass-card p-12 text-center text-blue-200/40">
      <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
      <p className="text-white/80 font-semibold mb-1">Sin mensajes</p>
      <p className="text-sm">Los mensajes del formulario de contacto aparecerán acá.</p>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="glass-card p-12 text-center text-blue-200/40">
      <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
      <p className="text-white/80 font-semibold mb-1">Sin usuarios registrados</p>
      <p className="text-sm">Acá vas a ver el listado de usuarios cuando se conecten al sistema.</p>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const tabContent: Record<AdminTab, React.ReactNode> = {
    dashboard: <DashboardTab />,
    ventas:    <VentasTab />,
    players:   <PlayersTab />,
    listings: (
      <div className="glass-card p-8 text-center text-blue-200/40">
        <Package className="h-10 w-10 mx-auto mb-3 opacity-30" />
        <p>Gestión de publicaciones en desarrollo</p>
      </div>
    ),
    products:  <ProductsTab />,
    messages:  <MessagesTab />,
    users:     <UsersTab />,
  };

  return (
    <div className="min-h-screen bg-brand-dark">
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
                    {tab.id === "ventas" && (
                      <span className="ml-auto text-[10px] font-bold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">
                        {INITIAL_ORDERS.filter((o) => o.status === "PENDING").length}
                      </span>
                    )}
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

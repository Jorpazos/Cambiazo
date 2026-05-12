import Link from "next/link";
import { ShoppingBag, Package, BookOpen, Star, ArrowRight, Truck } from "lucide-react";
import type { StoreProduct } from "@/types";
import { formatPrice } from "@/lib/utils";

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  SOBRE: Package,
  PACK: ShoppingBag,
  ALBUM: BookOpen,
};

const TYPE_COLORS: Record<string, string> = {
  SOBRE: "from-blue-600 to-blue-400",
  PACK: "from-violet-600 to-purple-400",
  ALBUM: "from-amber-500 to-yellow-400",
};

const TYPE_BORDER: Record<string, string> = {
  SOBRE: "border-blue-500/30",
  PACK: "border-violet-500/30",
  ALBUM: "border-amber-400/30",
};

export default function StoreSection({ products }: { products: StoreProduct[] }) {
  return (
    <section id="tienda" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-brand-navy/20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
              Directo de Cambiazo
            </p>
            <h2 className="section-title">Tienda oficial</h2>
            <p className="section-subtitle">
              Comprá sobres, packs y el álbum directamente. Envío a todo el país.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 flex-shrink-0">
            <Truck className="h-3.5 w-3.5" />
            <span className="font-semibold">Envío gratis +$8.000</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Package className="h-10 w-10 mx-auto mb-3 text-blue-200/30" />
            <p className="text-white/80 font-semibold mb-1">Tienda próximamente</p>
            <p className="text-sm text-blue-200/50">Estamos preparando sobres, packs y álbumes para vos.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {products.map((product) => {
            const Icon = TYPE_ICONS[product.type] ?? Package;
            const gradient = TYPE_COLORS[product.type] ?? "from-blue-600 to-blue-400";
            const borderColor = TYPE_BORDER[product.type] ?? "border-blue-500/30";

            return (
              <div
                key={product.id}
                className={`glass-card overflow-hidden hover:${borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col`}
              >
                {/* Card top */}
                <div className={`relative bg-gradient-to-br ${gradient} p-6 flex items-center justify-center`}>
                  <Icon className="h-12 w-12 text-white/80" />
                  {product.stock <= 10 && product.stock > 0 && (
                    <span className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      ¡Últimos!
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute top-2 right-2 rounded-full bg-gray-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      Agotado
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-sm mb-1">{product.name}</h3>
                  {product.description && (
                    <p className="text-xs text-blue-200/50 leading-relaxed flex-1">{product.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-black text-white">{formatPrice(product.price)}</span>
                  </div>
                  <Link
                    href={product.stock > 0 ? "/register" : "#"}
                    className={`mt-3 w-full text-center py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                      product.stock > 0
                        ? `bg-gradient-to-r ${gradient} text-white hover:opacity-90 hover:scale-[1.02]`
                        : "bg-white/5 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    {product.stock > 0 ? "Comprar ahora" : "Agotado"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Trust badges */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "🔒", label: "Pago seguro", sub: "Mercado Pago / Transferencia" },
            { icon: "📦", label: "Envío rápido", sub: "Correo Argentino / OCA" },
            { icon: "✅", label: "Stock real", sub: "Figuritas verificadas" },
            { icon: "💬", label: "Soporte", sub: "Respuesta en 24hs" },
          ].map((badge) => (
            <div key={badge.label} className="glass-card p-3 flex items-center gap-3">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="text-xs font-semibold text-white">{badge.label}</p>
                <p className="text-xs text-blue-200/40">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

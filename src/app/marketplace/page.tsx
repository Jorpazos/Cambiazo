"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Repeat2, ShoppingBag, BookOpen, ArrowRight } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import type { Listing, ListingType } from "@/types";

const ALL_LISTINGS: Listing[] = [];

const TYPE_ICONS = { CAMBIO: Repeat2, VENDO: ShoppingBag, BUSCO: BookOpen };
const TYPE_LABEL = { CAMBIO: "Cambio", VENDO: "Vendo", BUSCO: "Busco" };
const TYPE_CLASS = {
  CAMBIO: "badge-cambio",
  VENDO: "badge-vendo",
  BUSCO: "badge-busco",
};

const COUNTRY_COLORS: Record<string, string> = {
  Argentina: "from-sky-800 to-sky-600",
  Francia: "from-blue-900 to-red-800",
  Noruega: "from-red-800 to-red-600",
  Brasil: "from-green-800 to-green-600",
  España: "from-red-800 to-red-600",
};

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | ListingType>("ALL");

  const filtered = ALL_LISTINGS.filter((l) => {
    const matchSearch =
      !search ||
      l.player.name.toLowerCase().includes(search.toLowerCase()) ||
      l.player.country.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "ALL" || l.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-hero-gradient border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-black text-white">
            Tablero de <span className="text-brand-gold">Intercambios</span>
          </h1>
          <p className="mt-2 text-sm text-blue-200/60">
            {ALL_LISTINGS.length} publicaciones activas de toda Argentina
          </p>

          {/* Search + filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar jugador, país..."
                className="input-field pl-10 h-11"
              />
            </div>
            <div className="flex gap-2">
              {(["ALL", "CAMBIO", "VENDO", "BUSCO"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200",
                    typeFilter === t
                      ? "bg-brand-blue border-brand-blue text-white"
                      : "bg-white/5 border-white/10 text-blue-200/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {t === "ALL" ? "Todos" : TYPE_LABEL[t]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Listings grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-blue-200/40">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold text-white/40">Sin resultados</p>
            <p className="text-sm">Probá con otro nombre o filtro</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((listing) => {
              const TypeIcon = TYPE_ICONS[listing.type];
              const gradient = COUNTRY_COLORS[listing.player.country] ?? "from-blue-900 to-blue-700";
              return (
                <div
                  key={listing.id}
                  className="glass-card overflow-hidden hover:border-brand-blue/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 group flex flex-col"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-14 w-14 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${gradient} ring-2 ring-white/10`}>
                        {listing.player.image ? (
                          <Image src={listing.player.image} alt={listing.player.name} width={56} height={56} className="h-full w-full object-cover" unoptimized />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xl font-black text-white/50">
                            #{listing.player.number}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-blue-200/40 uppercase tracking-wider">{listing.player.country}</p>
                        <p className="font-bold text-white text-sm truncate">{listing.player.name}</p>
                        <p className="text-xs text-blue-200/40">#{listing.player.number}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className={TYPE_CLASS[listing.type]}>
                        <TypeIcon className="h-3 w-3" />
                        {TYPE_LABEL[listing.type]}
                      </span>
                      {listing.price && listing.type === "VENDO" && (
                        <span className="text-sm font-bold text-green-400">{formatPrice(listing.price)}</span>
                      )}
                    </div>

                    {listing.description && (
                      <p className="text-xs text-blue-200/50 line-clamp-2 leading-relaxed flex-1">
                        {listing.description}
                      </p>
                    )}

                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-full bg-brand-blue flex items-center justify-center text-[10px] font-bold text-white">
                          {listing.user.name.charAt(0)}
                        </div>
                        <span className="text-xs text-blue-200/50">{listing.user.name}</span>
                      </div>
                      {listing.user.city && (
                        <span className="text-xs text-blue-200/40 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {listing.user.city}
                        </span>
                      )}
                    </div>

                    <Link
                      href="/login"
                      className="mt-3 w-full py-2 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/40 border border-brand-blue/20 text-xs font-semibold text-blue-300 text-center transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      Contactar
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

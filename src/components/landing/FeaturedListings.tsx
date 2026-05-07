"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Repeat2, ShoppingBag, Search } from "lucide-react";
import type { Listing } from "@/types";
import { formatPrice } from "@/lib/utils";

const TYPE_CONFIG = {
  CAMBIO: {
    label: "Cambio",
    icon: Repeat2,
    className: "badge-cambio",
    dot: "bg-blue-400",
  },
  VENDO: {
    label: "Vendo",
    icon: ShoppingBag,
    className: "badge-vendo",
    dot: "bg-green-400",
  },
  BUSCO: {
    label: "Busco",
    icon: Search,
    className: "badge-busco",
    dot: "bg-amber-400",
  },
};

const COUNTRY_COLORS: Record<string, string> = {
  Argentina: "from-sky-800 to-sky-600",
  Francia: "from-blue-900 to-red-800",
  Noruega: "from-red-800 to-red-600",
  Brasil: "from-green-800 to-green-600",
  España: "from-red-800 to-red-600",
};

function StickerCard({ listing }: { listing: Listing }) {
  const config = TYPE_CONFIG[listing.type];
  const Icon = config.icon;
  const gradient = COUNTRY_COLORS[listing.player.country] ?? "from-blue-900 to-blue-700";

  return (
    <div className="group relative glass-card overflow-hidden hover:border-brand-blue/30 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1">
      {/* Top gradient band */}
      <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-5">
        {/* Player photo and info */}
        <div className="flex items-start gap-4">
          {/* Sticker-style photo */}
          <div className="relative flex-shrink-0">
            <div className={`h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br ${gradient} ring-2 ring-white/10 group-hover:ring-brand-blue/40 transition-all duration-300`}>
              {listing.player.image ? (
                <Image
                  src={listing.player.image}
                  alt={listing.player.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-black text-white/50">
                  #{listing.player.number}
                </div>
              )}
            </div>
            {/* Sticker number badge */}
            <div className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark border border-white/10 text-xs font-bold text-brand-gold">
              {listing.player.number}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-200/50 mb-0.5">
              {listing.player.country}
            </p>
            <h3 className="font-bold text-white text-sm leading-tight truncate group-hover:text-blue-200 transition-colors">
              {listing.player.name}
            </h3>
            {listing.player.position && (
              <p className="text-xs text-blue-200/40 mt-0.5">{listing.player.position}</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-3.5 border-t border-white/5" />

        {/* Type badge and price */}
        <div className="flex items-center justify-between">
          <span className={config.className}>
            <Icon className="h-3 w-3" />
            {config.label}
          </span>
          {listing.price && listing.type === "VENDO" && (
            <span className="text-sm font-bold text-green-400">{formatPrice(listing.price)}</span>
          )}
        </div>

        {/* Description */}
        {listing.description && (
          <p className="mt-2.5 text-xs text-blue-200/50 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        )}

        {/* User info */}
        <div className="mt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-brand-blue to-blue-400 flex items-center justify-center text-[10px] font-bold text-white">
              {listing.user.name.charAt(0)}
            </div>
            <span className="text-xs text-blue-200/60 font-medium">{listing.user.name}</span>
          </div>
          {(listing.user.city || listing.user.province) && (
            <span className="flex items-center gap-1 text-xs text-blue-200/40">
              <MapPin className="h-3 w-3" />
              {listing.user.city ?? listing.user.province}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedListings({ listings }: { listings: Listing[] }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-dark to-brand-navy/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
              Publicaciones destacadas
            </p>
            <h2 className="section-title">Intercambios del momento</h2>
            <p className="section-subtitle">
              Las figuritas más buscadas y ofrecidas por la comunidad ahora mismo.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="btn-outline flex-shrink-0 text-sm"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <StickerCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}

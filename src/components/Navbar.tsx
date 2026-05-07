"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoMark from "@/components/LogoMark";

const NAV_LINKS = [
  { href: "/#como-funciona", label: "Cómo Funciona" },
  { href: "/marketplace", label: "Intercambios" },
  { href: "/#tienda", label: "Tienda" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark className="h-9 w-9 drop-shadow-lg group-hover:scale-105 transition-transform duration-200" />
            <span className="text-xl font-black tracking-tight text-white">
              Cambia<span className="text-brand-gold">zo</span>
            </span>
            <span className="hidden sm:inline-block rounded-md bg-brand-gold/15 px-2 py-0.5 text-xs font-bold text-brand-gold border border-brand-gold/25">
              Mundial 2026
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-blue-200/70 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login" className="btn-outline text-sm py-2 px-4">
              <LogIn className="h-4 w-4" />
              Ingresar
            </Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-4">
              <UserPlus className="h-4 w-4" />
              Registrarse
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t border-white/5 bg-[#07091a]/95 backdrop-blur-xl overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200/70 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
            <Link href="/login" className="btn-outline text-sm py-2.5 w-full" onClick={() => setOpen(false)}>
              <LogIn className="h-4 w-4" />
              Ingresar
            </Link>
            <Link href="/register" className="btn-primary text-sm py-2.5 w-full" onClick={() => setOpen(false)}>
              <UserPlus className="h-4 w-4" />
              Registrarse Gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

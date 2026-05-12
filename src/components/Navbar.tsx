"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, X, LogIn, UserPlus, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoMark from "@/components/LogoMark";

const NAV_LINKS = [
  { href: "/#como-funciona", label: "Cómo Funciona" },
  { href: "/marketplace", label: "Intercambios" },
  { href: "/#tienda", label: "Tienda" },
  { href: "/#faq", label: "FAQ" },
];

type MeUser = {
  id: number;
  email: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  isAdmin: boolean;
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<MeUser | null>(null);
  const [loaded, setLoaded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!cancelled) setUser(data.user);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    setOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    try {
      await signOut({ redirect: false });
    } catch {
      // ignore — no NextAuth session for email users
    }
    setUser(null);
    router.replace("/");
    router.refresh();
  };

  const isLoggedIn = loaded && !!user;
  const displayName = user?.firstName || user?.name?.split(" ")[0] || user?.email || "Usuario";
  const userInitial = (user?.firstName || user?.name || user?.email || "U").charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark className="h-9 w-9 drop-shadow-lg group-hover:scale-105 transition-transform duration-200" />
            <span className="text-xl font-black tracking-tight text-white">
              Cambia<span className="text-brand-gold">zo</span>
            </span>
            <span className="hidden sm:inline-block rounded-md bg-brand-gold/15 px-2 py-0.5 text-xs font-bold text-brand-gold border border-brand-gold/25">
              Mundial 2026
            </span>
          </Link>

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

          <div className="hidden md:flex items-center gap-2">
            {!loaded ? (
              <div className="h-8 w-24 rounded-lg bg-white/5 animate-pulse" />
            ) : isLoggedIn ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 pl-1 pr-3 py-1 hover:bg-white/10 transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-lg object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-lg bg-brand-blue flex items-center justify-center text-xs font-bold text-white">
                      {userInitial}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-white max-w-[120px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-blue-200/60 transition-transform", menuOpen && "rotate-180")} />
                </button>

                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-brand-card/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-semibold text-white truncate">{user?.name ?? "Usuario"}</p>
                      <p className="text-xs text-blue-200/50 truncate">{user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-200/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Mi panel
                    </Link>
                    <Link
                      href="/perfil"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-200/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Mi perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors border-t border-white/5"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-outline text-sm py-2 px-4">
                  <LogIn className="h-4 w-4" />
                  Ingresar
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-4">
                  <UserPlus className="h-4 w-4" />
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden border-t border-white/5 bg-[#07091a]/95 backdrop-blur-xl overflow-hidden transition-all duration-300",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {isLoggedIn && (
            <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg bg-white/5 border border-white/10">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-lg object-cover"
                  unoptimized
                />
              ) : (
                <div className="h-9 w-9 rounded-lg bg-brand-blue flex items-center justify-center text-sm font-bold text-white">
                  {userInitial}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name ?? "Usuario"}</p>
                <p className="text-xs text-blue-200/50 truncate">{user?.email}</p>
              </div>
            </div>
          )}

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
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Mi panel
                </Link>
                <Link
                  href="/perfil"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Mi perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-outline text-sm py-2.5 w-full" onClick={() => setOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  Ingresar
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2.5 w-full" onClick={() => setOpen(false)}>
                  <UserPlus className="h-4 w-4" />
                  Registrarse Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

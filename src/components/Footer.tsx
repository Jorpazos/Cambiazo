import Link from "next/link";
import { Trophy, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-blue-400">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black text-white">
                Cambia<span className="text-brand-gold">zo</span>
              </span>
            </Link>
            <p className="text-sm text-blue-200/50 leading-relaxed">
              La plataforma argentina para completar tu álbum del Mundial 2026. ¡Juntos lo completamos!
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-blue-200/40 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200/40 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200/40 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:info@cambiazo.ar" className="text-blue-200/40 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Plataforma</h3>
            <ul className="space-y-2">
              {[
                { href: "/marketplace", label: "Ver Intercambios" },
                { href: "/#tienda", label: "Tienda" },
                { href: "/register", label: "Registrarse" },
                { href: "/login", label: "Ingresar" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-blue-200/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Información</h3>
            <ul className="space-y-2">
              {[
                { href: "/#como-funciona", label: "Cómo Funciona" },
                { href: "/#faq", label: "Preguntas Frecuentes" },
                { href: "/#contacto", label: "Contacto" },
                { href: "/terminos", label: "Términos de Uso" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-blue-200/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-blue-200/50">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@cambiazo.ar" className="hover:text-white transition-colors">
                  info@cambiazo.ar
                </a>
              </li>
              <li>📍 Derqui, Pilar — Buenos Aires, Argentina</li>
              <li>⏰ Lun-Vie 10hs - 20hs</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-200/30">
            © 2026 Cambiazo. Hecho con ❤️ en Argentina. Todos los derechos reservados.
          </p>
          <p className="text-xs text-blue-200/30">
            Las figuritas Panini y el álbum del Mundial 2026 son marcas registradas de sus respectivos dueños.
          </p>
        </div>
      </div>
    </footer>
  );
}

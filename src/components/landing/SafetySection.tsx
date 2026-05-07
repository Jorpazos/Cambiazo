import { Shield, Lock, UserCheck, Star, MapPin, Bell } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Usuarios verificados",
    description:
      "Todos los usuarios confirman su email al registrarse. Sistema de reputación basado en intercambios completados.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Lock,
    title: "Datos protegidos",
    description:
      "Tu información de contacto no se muestra hasta que ambos usuarios aceptan el intercambio. Privacidad garantizada.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: UserCheck,
    title: "Sistema de reputación",
    description:
      "Calificá a quien intercambiaste. Los usuarios con mal historial son suspendidos automáticamente.",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: Star,
    title: "Comunidad activa",
    description:
      "Más de 12.000 coleccionistas verificados de todas las provincias de Argentina listos para intercambiar.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: MapPin,
    title: "Encuentros seguros",
    description:
      "Te recomendamos puntos de encuentro públicos en tu zona. También podés hacer el intercambio por correo asegurado.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: Bell,
    title: "Soporte activo",
    description:
      "¿Algo salió mal? Nuestro equipo revisa reportes en menos de 48hs y toma acción contra usuarios problemáticos.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
];

export default function SafetySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
              Tu seguridad primero
            </p>
            <h2 className="section-title">Intercambiá con confianza</h2>
            <p className="mt-4 text-base text-blue-200/60 leading-relaxed">
              Sabemos que intercambiar con desconocidos puede dar miedo. Por eso construimos un sistema completo
              de verificación, reputación y protección para que te sientas seguro en cada intercambio.
            </p>

            <div className="mt-8 p-5 glass-card border-brand-gold/20">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
                  <Shield className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Garantía Cambiazo</p>
                  <p className="text-sm text-blue-200/60 mt-1">
                    Si un usuario verificado no cumple con el intercambio acordado, te ayudamos a resolver
                    el problema o te compensamos con crédito en nuestra tienda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="glass-card p-4 hover:border-white/15 transition-colors duration-300 group"
                >
                  <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${feat.bg} mb-3`}>
                    <Icon className={`h-4.5 w-4.5 ${feat.color}`} />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{feat.title}</h3>
                  <p className="text-xs text-blue-200/50 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

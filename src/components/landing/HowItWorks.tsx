import { UserPlus, ListPlus, Repeat2, Package, CheckCircle } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Creá tu cuenta gratis",
    description:
      "Registrate con tu correo y contraseña en menos de un minuto. Sin datos de tarjeta, sin cargos ocultos.",
    color: "from-blue-600 to-blue-400",
    glow: "shadow-blue-600/30",
  },
  {
    step: "02",
    icon: ListPlus,
    title: "Publicá tus figuritas",
    description:
      "Cargá las figuritas que tenés dobles para intercambiar o vender, y las que te faltan. Con foto y número de la figurita.",
    color: "from-violet-600 to-violet-400",
    glow: "shadow-violet-600/30",
  },
  {
    step: "03",
    icon: Repeat2,
    title: "Encontrá tu match",
    description:
      "El sistema te muestra automáticamente usuarios que tienen lo que buscás y buscan lo que vos tenés. ¡Match perfecto!",
    color: "from-amber-500 to-yellow-400",
    glow: "shadow-amber-600/30",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Coordiná e intercambiá",
    description:
      "Hablá con el otro coleccionista, acordá el lugar de encuentro o el envío y completá tu álbum.",
    color: "from-green-600 to-green-400",
    glow: "shadow-green-600/30",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-navy/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
            Simple y rápido
          </p>
          <h2 className="section-title">¿Cómo funciona Cambiazo?</h2>
          <p className="section-subtitle mx-auto text-center">
            En 4 pasos simples empezás a intercambiar con miles de coleccionistas de todo el país.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-600 via-violet-500 via-amber-400 to-green-500 opacity-30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="glass-card p-6 text-center hover:border-white/15 transition-colors duration-300 group">
                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div
                      className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-xl ${step.glow} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark border border-white/10 text-xs font-black text-white">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-blue-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-blue-200/50 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

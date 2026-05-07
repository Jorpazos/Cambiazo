"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "glass-card overflow-hidden transition-all duration-300",
        open ? "border-brand-blue/30" : "hover:border-white/15"
      )}
    >
      <button
        className="flex w-full items-center justify-between p-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-white text-sm leading-snug">{item.question}</span>
        <span className={cn(
          "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
          open ? "bg-brand-blue/30 text-brand-gold" : "bg-white/5 text-blue-200/60"
        )}>
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="px-5 pb-5 text-sm text-blue-200/60 leading-relaxed border-t border-white/5 pt-4">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-navy/10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
            Preguntas frecuentes
          </p>
          <h2 className="section-title">¿Tenés dudas?</h2>
          <p className="section-subtitle mx-auto text-center">
            Respondemos las preguntas más comunes de la comunidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-3">
            {left.map((item, i) => (
              <FAQAccordion key={i} item={item} defaultOpen={i === 0} />
            ))}
          </div>
          <div className="space-y-3">
            {right.map((item, i) => (
              <FAQAccordion key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

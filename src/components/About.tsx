import { motion } from "framer-motion";
import { BRAND } from "../lib/data";
import { FOUNDER_PHOTO } from "../lib/founder";

export default function About() {
  return (
    <section id="sobre" className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:grid-cols-2 md:px-10 lg:px-16">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto w-full max-w-md"
        >
          <span className="absolute inset-x-4 bottom-8 top-12 -z-10 rounded-[3rem] accent-gradient opacity-30 blur-3xl" />
          <img
            src={FOUNDER_PHOTO}
            alt={BRAND.founder}
            className="relative z-10 mx-auto w-full max-w-sm object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Quem está por trás
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display text-text-primary">
            {BRAND.founder.split(" ")[0]}{" "}
            <span className="italic accent-text">
              {BRAND.founder.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">
            Especialista em Gestão Financeira para Empresas
          </p>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            Eu transformo negócios desorganizados em empresas lucrativas. À frente
            da {BRAND.full}, ajudo donos de empresa a enxergar com clareza os
            números, organizar o financeiro e tomar decisões que aumentam o lucro —
            com terceirização financeira (BPO), consultoria e treinamentos.
          </p>

          <ul className="mt-8 grid gap-3 text-sm text-text-primary/90">
            {[
              "Visão completa do seu fluxo de caixa",
              "Processos financeiros organizados de ponta a ponta",
              "Decisões guiadas por dados, não por achismo",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full accent-gradient text-[11px] text-bg">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-10 inline-flex rounded-full text-sm"
          >
            <span className="absolute inset-[-1px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-text-primary">
              Acompanhe no Instagram <span aria-hidden>↗</span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { SERVICES, BRAND } from "../lib/data";

export default function Services() {
  return (
    <section id="servicos" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                O que fazemos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-text-primary">
              Nossos <span className="italic accent-text">serviços</span>
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted">
              Soluções financeiras sob medida para tirar a sua empresa da
              desorganização e colocá-la no rumo do lucro.
            </p>
          </div>

          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden md:inline-flex rounded-full text-sm"
          >
            <span className="absolute inset-[-1px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-text-primary">
              Solicitar proposta <span aria-hidden>→</span>
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface ${s.span} ${s.ratio}`}
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500 group-hover:opacity-0">
                <span className="text-xs uppercase tracking-[0.2em] accent-text">
                  {s.subtitle}
                </span>
                <h3 className="mt-1 text-2xl font-display text-text-primary">
                  {s.title}
                </h3>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end bg-bg/70 p-6 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-[0.2em] accent-text">
                  {s.subtitle}
                </span>
                <h3 className="mt-1 text-2xl font-display italic text-text-primary">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm text-muted">{s.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

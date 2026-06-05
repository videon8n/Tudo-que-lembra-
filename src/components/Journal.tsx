import { motion } from "framer-motion";
import { POSTS, BRAND } from "../lib/data";

export default function Journal() {
  return (
    <section id="conteudos" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1000px] px-6 md:px-10 lg:px-16">
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
                Aprenda com a gente
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-text-primary">
              Dicas <span className="italic accent-text">financeiras</span>
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted">
              Conteúdos práticos para você entender melhor o financeiro do seu
              negócio.
            </p>
          </div>

          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden md:inline-flex rounded-full text-sm"
          >
            <span className="absolute inset-[-1px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-text-primary">
              Ver tudo <span aria-hidden>→</span>
            </span>
          </a>
        </motion.div>

        <div className="flex flex-col gap-4">
          {POSTS.map((p, i) => (
            <motion.a
              key={p.title}
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true, margin: "-60px" }}
              className="group flex items-center gap-5 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors hover:bg-surface sm:gap-6 sm:rounded-full"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-medium text-text-primary sm:text-lg">
                  {p.title}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                  <span>{p.read} de leitura</span>
                  <span className="h-1 w-1 rounded-full bg-stroke" />
                  <span>{p.date}</span>
                </div>
              </div>
              <span className="hidden shrink-0 pr-4 text-muted transition-transform group-hover:translate-x-1 sm:block">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

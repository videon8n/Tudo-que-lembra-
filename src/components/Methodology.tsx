import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { METHOD, BRAND } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Methodology() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pinRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinRef.current,
          pinSpacing: false,
        });
      }
      gsap.utils.toArray<HTMLElement>(".parallax-col").forEach((col) => {
        const speed = Number(col.dataset.speed ?? 0);
        gsap.to(col, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const left = METHOD.filter((_, i) => i % 2 === 0);
  const right = METHOD.filter((_, i) => i % 2 === 1);

  return (
    <section ref={sectionRef} id="metodologia" className="relative min-h-[300vh] bg-bg">
      {/* Colunas com parallax (ficam ATRÁS do título) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex justify-center">
        <div className="grid w-full max-w-[1400px] grid-cols-2 gap-16 px-6 md:gap-56">
          <div className="parallax-col mt-[42vh] flex flex-col gap-28" data-speed="-120">
            {left.map((m) => (
              <Card key={m.step} {...m} />
            ))}
          </div>
          <div className="parallax-col mt-[72vh] flex flex-col gap-28" data-speed="120">
            {right.map((m) => (
              <Card key={m.step} {...m} />
            ))}
          </div>
        </div>
      </div>

      {/* Título fixo — sempre na frente e legível */}
      <div
        ref={pinRef}
        className="pointer-events-none z-30 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="pointer-events-auto relative">
          <span className="absolute -inset-x-16 -inset-y-10 -z-10 rounded-[50%] bg-bg/70 blur-2xl" />
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Como funciona</span>
            <span className="h-px w-8 bg-stroke" />
          </div>
          <h2 className="font-display text-5xl text-text-primary md:text-7xl">
            Nossa <span className="italic accent-text">metodologia</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Um caminho claro do diagnóstico ao crescimento — você sempre sabe em
            qual etapa o seu financeiro está.
          </p>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-8 inline-flex rounded-full text-sm"
          >
            <span className="absolute inset-[-1px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-text-primary">
              Começar pelo diagnóstico <span aria-hidden>↗</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Card({ step, title, image }: { step: string; title: string; image: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="pointer-events-auto mx-auto w-full max-w-[300px]"
    >
      <div className="group relative aspect-square overflow-hidden rounded-3xl border border-stroke bg-surface">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        <span className="absolute left-4 top-3 font-display text-3xl italic accent-text">{step}</span>
      </div>
      <figcaption className="mt-3 text-center font-display text-xl text-text-primary">
        {title}
      </figcaption>
    </motion.figure>
  );
}

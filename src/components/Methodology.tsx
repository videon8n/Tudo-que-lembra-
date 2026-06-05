import { useEffect, useRef } from "react";
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
      <div
        ref={pinRef}
        className="z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Como funciona
          </span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="text-5xl md:text-7xl font-display text-text-primary">
          Nossa <span className="italic accent-text">metodologia</span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted">
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

      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center">
        <div className="grid w-full max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40">
          <div className="parallax-col mt-[40vh] flex flex-col gap-24" data-speed="-120">
            {left.map((m) => (
              <Card key={m.step} {...m} />
            ))}
          </div>
          <div className="parallax-col mt-[70vh] flex flex-col gap-24" data-speed="120">
            {right.map((m) => (
              <Card key={m.step} {...m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  step,
  title,
  image,
}: {
  step: string;
  title: string;
  image: string;
}) {
  return (
    <figure className="pointer-events-auto mx-auto w-full max-w-[320px]">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-stroke bg-surface">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
        <span className="absolute left-4 top-4 font-display text-3xl italic accent-text">
          {step}
        </span>
      </div>
      <figcaption className="mt-3 text-center font-display text-xl text-text-primary">
        {title}
      </figcaption>
    </figure>
  );
}

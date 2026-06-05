import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { BRAND } from "../lib/data";
import { LOGO_DARK } from "../lib/logo";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const NAV = [
  { label: "Início", href: "#hero" },
  { label: "Serviços", href: "#servicos" },
  { label: "Ferramentas", href: "#ferramentas" },
  { label: "Sobre", href: "#sobre" },
];

const WORDS = ["caos", "planilhas", "incertezas", "desordem"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Início");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".name-reveal", { opacity: 0, y: 50, duration: 1.2, delay: 0.1 });
      tl.from(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20, duration: 1, stagger: 0.1 },
        0.3
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string, label: string) => {
    setActive(label);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
      />
      <div className="absolute inset-0 bg-bg/55" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div
          className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-shadow ${
            scrolled ? "shadow-md shadow-black/30" : ""
          }`}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero", "Início");
            }}
            className="group relative grid h-9 w-9 place-items-center rounded-full transition-transform hover:scale-110"
          >
            <span className="absolute inset-0 rounded-full accent-gradient" />
            <span className="absolute inset-[2px] grid place-items-center rounded-full bg-bg">
              <span className="font-display italic text-[13px] accent-text">LF</span>
            </span>
          </a>

          <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href, item.label);
              }}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                active === item.label
                  ? "text-text-primary bg-stroke/50"
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
              }`}
            >
              {item.label}
            </a>
          ))}

          <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-xs sm:text-sm rounded-full"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-1 rounded-full bg-surface backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary">
              Fale comigo <span aria-hidden>↗</span>
            </span>
          </a>
        </div>
      </nav>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          {BRAND.tagline}
        </span>

        <img
          src={LOGO_DARK}
          alt={`${BRAND.full} — ${BRAND.tagline}`}
          className="name-reveal hero-logo mb-8"
        />

        <p className="blur-in text-lg md:text-2xl text-text-primary/90 mb-6">
          Transformamos{" "}
          <span
            key={wordIndex}
            className="font-display italic accent-text animate-role-fade-in inline-block"
          >
            {WORDS[wordIndex]}
          </span>{" "}
          em lucro.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Terceirização financeira (BPO), consultoria e treinamentos para
          transformar negócios desorganizados em empresas lucrativas.
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <a
            href="#servicos"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#servicos", "Serviços");
            }}
            className="group relative rounded-full text-sm px-7 py-3.5 transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-text-primary transition-opacity group-hover:opacity-0" />
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-[2px] rounded-full bg-bg opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative text-bg transition-colors group-hover:text-text-primary">
              Ver serviços
            </span>
          </a>

          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-full text-sm px-7 py-3.5 transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full border-2 border-stroke transition-opacity group-hover:opacity-0" />
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-[2px] rounded-full bg-bg" />
            <span className="relative text-text-primary">Diagnóstico gratuito</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Role</span>
        <span className="relative block w-px h-10 bg-stroke overflow-hidden">
          <span className="absolute inset-0 accent-gradient animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}

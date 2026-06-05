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
  const [menuOpen, setMenuOpen] = useState(false);
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
      tl.from(".name-reveal", { opacity: 0, y: 40, duration: 1, delay: 0.1 });
      tl.from(".blur-in", { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.25);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const go = (href: string, label: string) => {
    setActive(label);
    setMenuOpen(false);
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

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:pt-6">
        <div className="mx-auto w-full max-w-[860px] md:w-auto md:max-w-none md:flex md:justify-center">
          <div
            className={`flex items-center justify-between gap-2 rounded-full border border-white/10 bg-surface/85 px-2 py-2 backdrop-blur-md transition-shadow md:inline-flex md:justify-start ${
              scrolled ? "shadow-md shadow-black/30" : ""
            }`}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                go("#hero", "Início");
              }}
              className="group relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform hover:scale-110"
              aria-label="Início"
            >
              <span className="absolute inset-0 rounded-full accent-gradient" />
              <span className="absolute inset-[2px] grid place-items-center rounded-full bg-bg">
                <span className="font-display italic text-[13px] accent-text">LF</span>
              </span>
            </a>

            <div className="hidden items-center md:flex">
              <span className="mx-1 h-5 w-px bg-stroke" />
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href, item.label);
                  }}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.label
                      ? "bg-stroke/50 text-text-primary"
                      : "text-muted hover:bg-stroke/50 hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <span className="mx-1 h-5 w-px bg-stroke" />
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative whitespace-nowrap rounded-full text-sm"
              >
                <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center gap-1 rounded-full bg-surface px-4 py-2 text-text-primary">
                  Fale comigo <span aria-hidden>↗</span>
                </span>
              </a>
            </div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-text-primary md:hidden"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 block h-[2px] w-5 bg-current transition-all ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 block h-[2px] w-5 bg-current transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 block h-[2px] w-5 bg-current transition-all ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>

          {menuOpen && (
            <div className="mt-2 grid gap-1 rounded-2xl border border-white/10 bg-surface/95 p-2 backdrop-blur-md md:hidden">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href, item.label);
                  }}
                  className="rounded-xl px-4 py-3 text-sm text-text-primary hover:bg-stroke/50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 rounded-xl accent-gradient px-4 py-3 text-center text-sm font-semibold text-bg"
              >
                Fale comigo no WhatsApp ↗
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-16 text-center">
        <span className="blur-in mb-6 text-xs uppercase tracking-[0.3em] text-muted">
          {BRAND.tagline}
        </span>

        <img
          src={LOGO_DARK}
          alt={`${BRAND.full} — ${BRAND.tagline}`}
          className="name-reveal hero-logo mb-7"
        />

        <p className="blur-in mb-6 text-lg text-text-primary/90 md:text-2xl">
          Transformamos{" "}
          <span
            key={wordIndex}
            className="animate-role-fade-in inline-block font-display italic accent-text"
          >
            {WORDS[wordIndex]}
          </span>{" "}
          em lucro.
        </p>

        <p className="blur-in mb-10 max-w-md text-sm text-muted md:text-base">
          Terceirização financeira (BPO), consultoria e treinamentos para
          transformar negócios desorganizados em empresas lucrativas.
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <a
            href="#servicos"
            onClick={(e) => {
              e.preventDefault();
              go("#servicos", "Serviços");
            }}
            className="group relative rounded-full px-7 py-3.5 text-sm transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-text-primary transition-opacity group-hover:opacity-0" />
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-[2px] rounded-full bg-bg opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative text-bg transition-colors group-hover:text-text-primary">Ver serviços</span>
          </a>

          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-full px-7 py-3.5 text-sm transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full border-2 border-stroke transition-opacity group-hover:opacity-0" />
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-[2px] rounded-full bg-bg" />
            <span className="relative text-text-primary">Diagnóstico gratuito</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-3 [@media(max-height:780px)]:hidden">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Role</span>
        <span className="relative block h-10 w-px overflow-hidden bg-stroke">
          <span className="absolute inset-0 accent-gradient animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}

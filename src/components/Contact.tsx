import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { BRAND } from "../lib/data";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const SOCIAL = [
  { label: "Instagram", href: BRAND.instagram },
  { label: "WhatsApp", href: BRAND.whatsapp },
  { label: "E-mail", href: `mailto:${BRAND.email}` },
];

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contato"
      className="relative overflow-hidden bg-bg pt-16 pb-8 md:pt-20 md:pb-12"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-bg/40" />

      <div className="relative z-10">
        <div ref={marqueeRef} className="overflow-hidden py-8">
          <div className="marquee-track flex whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="px-6 font-display text-4xl italic text-text-primary/70 md:text-6xl"
              >
                ORGANIZE • LUCRE • CRESÇA •
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Vamos conversar
          </p>
          <h2 className="mt-4 text-4xl font-display text-text-primary md:text-6xl">
            Pronto para deixar sua empresa{" "}
            <span className="italic accent-text">lucrativa?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Agende um diagnóstico gratuito e descubra onde está o lucro que sua
            empresa ainda não está enxergando.
          </p>

          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-10 inline-flex rounded-full text-base"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full bg-text-primary px-8 py-4 text-bg transition-colors group-hover:bg-surface group-hover:text-text-primary">
              Falar no WhatsApp <span aria-hidden>↗</span>
            </span>
          </a>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1200px] flex-col items-center gap-6 border-t border-stroke px-6 pt-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 text-sm text-text-primary">
            <span className="font-display italic accent-text">LF</span>
            <span className="text-muted">© {new Date().getFullYear()} {BRAND.full}</span>
          </div>

          <div className="flex items-center gap-5">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Disponível para novos clientes
          </div>
        </div>
      </div>
    </footer>
  );
}

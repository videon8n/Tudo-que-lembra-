import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AI } from "../lib/ai";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME =
  "Oi! Eu sou a tawAi 👋 a assistente virtual inteligente da Lucravie. Posso ajudar com dúvidas sobre BPO financeiro, fluxo de caixa, precificação, pró-labore e como organizar o financeiro da sua empresa. O que você quer saber?";

const OFFLINE =
  "Estou quase pronta para conversar! 💛 Por enquanto, fale direto com a equipe da Lucravie no WhatsApp que respondemos rapidinho.";

const MORPH = [
  "48% 52% 55% 45% / 50% 45% 55% 50%",
  "55% 45% 48% 52% / 45% 55% 50% 50%",
  "45% 55% 52% 48% / 55% 50% 45% 55%",
  "48% 52% 55% 45% / 50% 45% 55% 50%",
];

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");

    if (!AI.endpoint) {
      setTimeout(() => setMessages((m) => [...m, { role: "assistant", content: OFFLINE }]), 400);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(AI.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m, i) => !(i === 0 && m.role === "assistant")) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || OFFLINE }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: OFFLINE }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
        {!open && (
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full accent-gradient"
            animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label="tawAi — assistente virtual inteligente"
          title="tawAi — assistente virtual inteligente"
          className="relative grid h-16 w-16 place-items-center accent-gradient text-bg shadow-lg shadow-black/40"
          animate={
            open
              ? { borderRadius: "9999px", scale: 1 }
              : { borderRadius: MORPH, scale: [1, 1.06, 1] }
          }
          transition={
            open
              ? { duration: 0.3 }
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
          whileHover={{ scale: 1.1 }}
        >
          {open ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <span className="flex flex-col items-center leading-none">
              <span aria-hidden className="text-base">✦</span>
              <span className="mt-0.5 font-display text-[13px] font-semibold italic">tawAi</span>
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-3 border-b border-stroke px-5 py-4">
              <motion.span
                className="grid h-9 w-9 place-items-center rounded-full accent-gradient text-bg"
                animate={{ borderRadius: MORPH }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <span aria-hidden className="text-sm">✦</span>
              </motion.span>
              <div>
                <p className="font-display text-base italic text-text-primary">tawAi</p>
                <p className="text-[11px] text-muted">Assistente virtual inteligente</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-stroke/70 px-4 py-2.5 text-sm text-text-primary"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm border border-stroke bg-bg px-4 py-2.5 text-sm text-text-primary/90"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-stroke bg-bg px-4 py-3">
                    <span className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-stroke p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Escreva sua dúvida..."
                className="flex-1 rounded-full border border-stroke bg-bg px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-muted focus:border-[#b0784f]"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Enviar"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full accent-gradient text-bg transition-opacity disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

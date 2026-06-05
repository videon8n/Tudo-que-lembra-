import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "../lib/data";

type TabId = "equilibrio" | "preco" | "prolabore";

const TABS: { id: TabId; label: string; tag: string }[] = [
  { id: "equilibrio", label: "Ponto de Equilíbrio", tag: "Quanto vender p/ não ter prejuízo" },
  { id: "preco", label: "Precificação", tag: "Preço de venda ideal" },
  { id: "prolabore", label: "Pró-labore", tag: "Quanto o sócio pode retirar" },
];

const brl = (n: number) =>
  isFinite(n)
    ? n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "—";
const num = (v: string) => Number(String(v).replace(/[^\d.,-]/g, "").replace(".", "").replace(",", ".")) || 0;

function Field({
  label,
  value,
  onChange,
  prefix = "R$",
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-muted">{label}</span>
      <span className="flex items-center gap-2 rounded-xl border border-stroke bg-bg px-3 py-2.5 focus-within:border-accent">
        {prefix && <span className="text-sm text-muted">{prefix}</span>}
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-text-primary outline-none placeholder:text-muted/50"
          placeholder="0"
        />
        {suffix && <span className="text-sm text-muted">{suffix}</span>}
      </span>
    </label>
  );
}

function Result({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`relative rounded-xl border p-4 ${highlight ? "border-transparent" : "border-stroke bg-bg"}`}>
      {highlight && <span className="absolute inset-0 -z-10 rounded-xl accent-gradient opacity-20 blur-md" />}
      <div className="relative">
        <div className="text-xs uppercase tracking-[0.15em] text-muted">{label}</div>
        <div className={`mt-1 font-display text-2xl md:text-3xl ${highlight ? "accent-text" : "text-text-primary"}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

function Equilibrio() {
  const [cf, setCf] = useState("20000");
  const [preco, setPreco] = useState("100");
  const [cv, setCv] = useState("40");
  const mc = num(preco) - num(cv);
  const unid = mc > 0 ? num(cf) / mc : NaN;
  const receita = unid * num(preco);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <Field label="Custos fixos mensais" value={cf} onChange={setCf} />
        <Field label="Preço médio de venda (por unidade)" value={preco} onChange={setPreco} />
        <Field label="Custo variável por unidade" value={cv} onChange={setCv} />
      </div>
      <div className="grid content-start gap-3">
        <Result label="Margem de contribuição" value={brl(mc)} />
        <Result label="Unidades p/ equilíbrio (mês)" value={isFinite(unid) ? Math.ceil(unid).toLocaleString("pt-BR") : "—"} />
        <Result label="Faturamento de equilíbrio" value={brl(receita)} highlight />
        {mc <= 0 && <p className="text-xs text-amber-400/80">Atenção: o preço precisa ser maior que o custo variável.</p>}
      </div>
    </div>
  );
}

function Preco() {
  const [custo, setCusto] = useState("50");
  const [variaveis, setVariaveis] = useState("18");
  const [lucro, setLucro] = useState("20");
  const div = 1 - (num(variaveis) + num(lucro)) / 100;
  const preco = div > 0 ? num(custo) / div : NaN;
  const markup = div > 0 ? preco / num(custo) : NaN;
  const lucroRs = isFinite(preco) ? preco * (num(lucro) / 100) : NaN;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <Field label="Custo do produto/serviço" value={custo} onChange={setCusto} />
        <Field label="Custos variáveis (impostos, taxas, comissão)" value={variaveis} onChange={setVariaveis} prefix="" suffix="%" />
        <Field label="Margem de lucro desejada" value={lucro} onChange={setLucro} prefix="" suffix="%" />
      </div>
      <div className="grid content-start gap-3">
        <Result label="Preço de venda sugerido" value={brl(preco)} highlight />
        <Result label="Markup (multiplicador)" value={isFinite(markup) ? markup.toFixed(2) + "x" : "—"} />
        <Result label="Lucro por venda" value={brl(lucroRs)} />
        {div <= 0 && <p className="text-xs text-amber-400/80">Custos + lucro não podem somar 100% ou mais.</p>}
      </div>
    </div>
  );
}

function ProLabore() {
  const [fat, setFat] = useState("50000");
  const [desp, setDesp] = useState("35000");
  const [reserva, setReserva] = useState("30");
  const lucro = num(fat) - num(desp);
  const retirada = lucro > 0 ? lucro * (1 - num(reserva) / 100) : 0;
  const guardar = lucro > 0 ? lucro * (num(reserva) / 100) : 0;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4">
        <Field label="Faturamento médio mensal" value={fat} onChange={setFat} />
        <Field label="Custos + despesas totais (mês)" value={desp} onChange={setDesp} />
        <Field label="% do lucro para reserva/reinvestir" value={reserva} onChange={setReserva} prefix="" suffix="%" />
      </div>
      <div className="grid content-start gap-3">
        <Result label="Lucro do mês" value={brl(lucro)} />
        <Result label="Pró-labore sugerido (retirada)" value={brl(retirada)} highlight />
        <Result label="Guardar / reinvestir" value={brl(guardar)} />
        {lucro <= 0 && <p className="text-xs text-amber-400/80">Sem lucro no mês — vamos organizar isso juntas?</p>}
      </div>
    </div>
  );
}

export default function Calculators() {
  const [tab, setTab] = useState<TabId>("equilibrio");
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <section id="ferramentas" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Ferramentas grátis</span>
            <span className="h-px w-8 bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-text-primary">
            Calculadoras <span className="italic accent-text">financeiras</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Descubra agora os números que decidem o lucro da sua empresa. Sem cadastro.
          </p>
        </motion.div>

        <div className="rounded-3xl border border-stroke bg-surface p-5 md:p-8">
          <div className="mb-6 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  tab === t.id ? "bg-text-primary text-bg" : "border border-stroke text-muted hover:text-text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <p className="mb-6 text-sm text-muted">{active.tag}</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "equilibrio" && <Equilibrio />}
              {tab === "preco" && <Preco />}
              {tab === "prolabore" && <ProLabore />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col items-center gap-3 border-t border-stroke pt-6 text-center">
            <p className="text-sm text-muted">Quer uma análise completa desses números no seu negócio?</p>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex rounded-full text-sm"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 rounded-full bg-text-primary px-7 py-3.5 text-bg transition-colors group-hover:bg-surface group-hover:text-text-primary">
                Falar com a Tawana no WhatsApp <span aria-hidden>↗</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

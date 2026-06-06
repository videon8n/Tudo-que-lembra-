// Cloudflare Worker — Assistente Lucravie (proxy seguro para a API da Anthropic).
// A chave da Anthropic fica como SECRET (ANTHROPIC_API_KEY) e NUNCA aparece no front-end.

const SYSTEM_PROMPT = `Você é a assistente virtual da Lucravie Finanças, uma empresa brasileira de gestão financeira para empresas, liderada por Tawana Silva.

A Lucravie oferece:
- BPO Financeiro (terceirização da rotina financeira: contas a pagar e receber, conciliação, fluxo de caixa e relatórios);
- Consultoria financeira (diagnóstico, redução de custos, precificação, aumento de lucro);
- Treinamentos e mentorias de gestão financeira.

Seu papel:
- Responder em português do Brasil, de forma clara, acolhedora e objetiva (linguagem simples, sem jargão).
- Ajudar donos de pequenas e médias empresas com dúvidas sobre fluxo de caixa, precificação, organização financeira, separação de PF/PJ, pró-labore, BPO e gestão.
- Dar respostas curtas e práticas (no máximo ~5 frases). Use bullets quando ajudar.
- Sempre que fizer sentido, convide a pessoa a fazer um DIAGNÓSTICO GRATUITO com a Lucravie pelo WhatsApp.
- Nunca invente dados específicos da empresa (preços, prazos). Se não souber, diga que um especialista da Lucravie pode detalhar no diagnóstico.
- Não dê consultoria jurídica, contábil ou tributária específica; oriente de forma geral e recomende falar com a equipe.
- Mantenha o foco em finanças empresariais e nos serviços da Lucravie. Se perguntarem algo fora do tema, responda gentilmente e traga de volta ao assunto.`;

const ALLOWED_ORIGINS = [
  "https://videon8n.github.io",
  "http://localhost:5173",
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "Método não permitido" }, 405, origin);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: "Chave da Anthropic não configurada no Worker." }, 500, origin);
    }

    try {
      const body = await request.json();
      const incoming = Array.isArray(body.messages) ? body.messages : [];

      const messages = incoming
        .slice(-12)
        .map((m) => ({
          role: m && m.role === "assistant" ? "assistant" : "user",
          content: String((m && m.content) || "").slice(0, 2000),
        }))
        .filter((m) => m.content);

      if (messages.length === 0) {
        return json({ error: "Nenhuma mensagem recebida." }, 400, origin);
      }

      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });

      if (!anthropicRes.ok) {
        const detail = await anthropicRes.text();
        return json({ error: "Falha ao consultar a IA", detail: detail.slice(0, 300) }, 502, origin);
      }

      const data = await anthropicRes.json();
      const reply = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();

      return json({ reply: reply || "Desculpe, não consegui responder agora." }, 200, origin);
    } catch (err) {
      return json({ error: "Erro interno", detail: String(err).slice(0, 200) }, 500, origin);
    }
  },
};

# Assistente Lucravie — Cloudflare Worker

Função serverless que conecta o chat do site à API da Anthropic (Claude), guardando a chave com segurança.

## Por que assim?
O site é estático (GitHub Pages) e **não pode** guardar a chave da Anthropic no front-end (ela ficaria exposta). O Worker fica no meio: o site fala com o Worker, e o Worker — que tem a chave como *secret* — fala com a Claude.

## Passo a passo (~10 min)

1. Crie uma conta grátis em https://dash.cloudflare.com e instale o Wrangler:
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. Dentro da pasta `worker/`, publique o Worker:
   ```bash
   wrangler deploy lucravie-ai.js --name lucravie-ai --compatibility-date 2024-11-01
   ```

3. Cadastre a chave da Anthropic como **secret** (ela NÃO fica no código):
   ```bash
   wrangler secret put ANTHROPIC_API_KEY --name lucravie-ai
   # cole a chave (sk-ant-...) quando pedir
   ```
   > Pegue a chave em https://console.anthropic.com -> API Keys.

4. O deploy mostra a URL do Worker, algo como:
   `https://lucravie-ai.SEU-USUARIO.workers.dev`

5. No arquivo `src/lib/ai.ts`, coloque essa URL em `AI.endpoint` e faça deploy do site.
   Pronto — o botão do assistente aparece e funciona.

## Trocar o modelo
No `lucravie-ai.js`, troque `claude-haiku-4-5-20251001` por `claude-sonnet-4-6`
para respostas mais elaboradas (custa um pouco mais).

## Domínios liberados (CORS)
Edite `ALLOWED_ORIGINS` no `lucravie-ai.js` se publicar o site em outro domínio.

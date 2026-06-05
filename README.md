# Lucravie Finanças — Landing Page

Landing page single-page (tema escuro) para a **Lucravie Finanças — Gestão Financeira para Empresas** (fundadora: Tawana Silva).

Adaptada de um template de portfólio dark para o nicho de **gestão financeira empresarial**, mantendo toda a estrutura original (loading screen, hero com vídeo, grid de serviços, seção de conteúdos, metodologia com parallax, indicadores e rodapé) e adicionando uma seção **Sobre** com a foto da fundadora.

**No ar em:** https://videon8n.github.io/tudo-que-lembra-/

## Stack
React + Vite + TypeScript + Tailwind CSS + GSAP (ScrollTrigger) + Framer Motion + hls.js.

## Rodar localmente
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
npm run preview  # serve o build
```

## Deploy (GitHub Pages)
O workflow `.github/workflows/deploy-pages.yml` builda e publica automaticamente a cada push nesta branch.

## Identidade visual
- **Paleta:** azul-marinho profundo + **cobre / rosé-gold** (o "L" metálico do logo). Tokens em `src/index.css`.
- **Gradiente de marca:** `.accent-gradient` / `.accent-text`.
- **Fontes:** Inter (corpo) + Instrument Serif itálico (display).

## Onde editar o conteúdo
Quase tudo está em **`src/lib/data.ts`**: `BRAND` (nome, fundadora, WhatsApp, Instagram, e-mail), `SERVICES`, `POSTS`, `METHOD`, `STATS`.

## Pendências / a confirmar
- [ ] Número real do **WhatsApp** (`BRAND.whatsapp`).
- [ ] **E-mail** oficial (`BRAND.email`).
- [ ] Vídeo de fundo (hero/rodapé) usa um stream HLS de exemplo — substituir pelo institucional.
- [ ] Foto da fundadora está embutida em versão leve (`src/lib/founder.ts`); para alta qualidade, suba `public/founder.jpg` e troque em `src/components/About.tsx`.
- [ ] Números da seção de indicadores (`STATS`).

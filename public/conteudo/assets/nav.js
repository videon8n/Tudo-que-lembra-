/* Menu compartilhado das páginas de conteúdo da Lucravie (responsivo, com hambúrguer). */
(function () {
  var parts = location.pathname.split("/").filter(Boolean);
  var ci = parts.indexOf("conteudo");
  var depthAfter = ci >= 0 ? parts.length - ci - 1 : 0; // 0 = hub, 1 = artigo
  var home = depthAfter >= 1 ? "../../" : "../";
  var hub = depthAfter >= 1 ? "../" : "./";
  var WA = "https://wa.me/5500000000000";

  var links = [
    ["Início", home],
    ["Serviços", home + "#servicos"],
    ["Ferramentas", home + "#ferramentas"],
    ["Sobre", home + "#sobre"],
    ["Conteúdo", hub],
  ];

  var css = document.createElement("style");
  css.textContent =
    "header.top .wrap{position:relative}" +
    "header.top .lf-links{display:flex;align-items:center;gap:2px}" +
    "header.top .lf-links a{color:var(--muted,#9aa7b5);text-decoration:none;font-size:14px;padding:8px 12px;border-radius:999px;white-space:nowrap}" +
    "header.top .lf-links a:hover{color:var(--text,#f1e8d9)}" +
    "header.top .lf-right{display:flex;align-items:center;gap:8px}" +
    "header.top .lf-burger{display:none;background:none;border:0;cursor:pointer;padding:8px}" +
    "header.top .lf-burger span{display:block;width:20px;height:2px;background:var(--text,#f1e8d9);margin:4px 0}" +
    "header.top .lf-cta-m{display:none}" +
    "@media(max-width:820px){" +
      "header.top .lf-links{position:absolute;top:62px;left:0;right:0;flex-direction:column;align-items:stretch;gap:2px;background:var(--surface,#101f2e);border-bottom:1px solid var(--stroke,#1d2c3b);padding:10px 22px 16px;display:none}" +
      "header.top .lf-links.open{display:flex}" +
      "header.top .lf-links a{padding:12px 6px;border-radius:10px}" +
      "header.top .lf-burger{display:block}" +
      "header.top .lf-cta{display:none}" +
      "header.top .lf-cta-m{display:block;margin-top:6px;text-align:center;color:#0a1320;background:linear-gradient(90deg,#b0784f,#e9c39c);font-weight:600;padding:11px;border-radius:999px;text-decoration:none}" +
    "}";
  document.head.appendChild(css);

  function build() {
    var header = document.querySelector("header.top");
    if (!header) return;
    var wrap = header.querySelector(".wrap") || header;
    var linksHtml = links
      .map(function (l) { return '<a href="' + l[1] + '">' + l[0] + "</a>"; })
      .join("");
    wrap.innerHTML =
      '<a class="brand" href="' + home + '">Lucravie</a>' +
      '<nav class="lf-links" id="lfLinks">' + linksHtml +
        '<a class="lf-cta-m" href="' + WA + '" target="_blank" rel="noopener">Diagnóstico gratuito</a>' +
      "</nav>" +
      '<div class="lf-right">' +
        '<a class="btn lf-cta" href="' + WA + '" target="_blank" rel="noopener">Diagnóstico gratuito</a>' +
        '<button class="lf-burger" aria-label="Menu" id="lfBurger"><span></span><span></span><span></span></button>' +
      "</div>";
    var b = document.getElementById("lfBurger");
    if (b) b.addEventListener("click", function () {
      document.getElementById("lfLinks").classList.toggle("open");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();

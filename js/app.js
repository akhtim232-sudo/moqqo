/* ============================================================
   ОБЩАЯ ЛОГИКА САЙТА: язык RU/KZ, корзина (хранилище),
   параллакс, шапка, футер, регистрация service worker.
   Редактировать этот файл при смене блюд/цен НЕ нужно —
   все данные лежат в js/data/*.js
   ============================================================ */

/* ---------- Язык ---------- */
const Lang = {
  get() { return localStorage.getItem("moqqo_lang") || "ru"; },
  set(l) {
    localStorage.setItem("moqqo_lang", l);
    document.documentElement.lang = l === "kz" ? "kk" : "ru";
    applyI18n();
    applySiteText();
    document.dispatchEvent(new CustomEvent("langchange"));
  },
};

function t(key) {
  return (I18N[Lang.get()] && I18N[Lang.get()][key]) || I18N.ru[key] || key;
}

/* Выбор поля данных по языку: pick(obj, "title") → title или titleKz */
function pick(obj, field) {
  if (Lang.get() === "kz") {
    const kz = obj[field + "Kz"];
    if (kz !== undefined && kz !== "" && !(Array.isArray(kz) && !kz.length)) return kz;
  }
  return obj[field];
}

/* Проставить переводы всем элементам с data-i18n */
function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("on", b.dataset.lang === Lang.get());
  });
}

/* Тексты из site-data.js: элементы с data-site="slogan", "letnik.text" и т. п. */
function applySiteText() {
  document.querySelectorAll("[data-site]").forEach((el) => {
    const parts = el.dataset.site.split(".");
    const field = parts.pop();
    let obj = SITE;
    for (const p of parts) obj = obj[p];
    if (obj && obj[field] !== undefined) el.textContent = pick(obj, field);
  });
}

/* ---------- Корзина (хранилище в localStorage) ---------- */
const Cart = {
  read() {
    try { return JSON.parse(localStorage.getItem("moqqo_cart")) || {}; }
    catch (e) { return {}; }
  },
  write(c) {
    localStorage.setItem("moqqo_cart", JSON.stringify(c));
    updateCartBadge();
  },
  add(id, delta) {
    const c = this.read();
    c[id] = (c[id] || 0) + delta;
    if (c[id] <= 0) delete c[id];
    this.write(c);
  },
  clear() { this.write({}); },
  count() {
    const c = this.read();
    return Object.values(c).reduce((s, n) => s + n, 0);
  },
};

/* Найти блюдо по id во всех категориях */
function findDish(id) {
  for (const cat of MENU_DATA.categories) {
    const d = cat.items.find((i) => i.id === id);
    if (d) return d;
  }
  return null;
}

/* Первая цифра из строки цены: "1 500 / 15 000 ₸" → 1500 */
function priceValue(priceStr) {
  const m = priceStr.match(/[\d\s ]+/);
  return m ? parseInt(m[0].replace(/[\s ]/g, ""), 10) : 0;
}

function formatTenge(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}

/* Плавающая кнопка корзины со счётчиком */
function updateCartBadge() {
  const fab = document.getElementById("cartFab");
  if (!fab) return;
  const n = Cart.count();
  fab.querySelector(".fab-count").textContent = n;
  fab.classList.toggle("show", n > 0 || document.body.dataset.page === "menu");
}

/* ---------- Ссылки WhatsApp ---------- */
function waLink(text) {
  return "https://wa.me/" + SITE.phoneWa + "?text=" + encodeURIComponent(text);
}

/* ---------- Параллакс (transform + requestAnimationFrame) ----------
   • data-plx="0.3"      — декор: движется от прокрутки со своей скоростью
   • data-plx-img="0.12" — фото/заглушка внутри секции: плывёт, пока секция на экране
   background-attachment: fixed не используется — на iPhone он не работает. */
function initParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;

  function update() {
    const y = window.scrollY;
    const vh = window.innerHeight;

    document.querySelectorAll("[data-plx]").forEach((el) => {
      const speed = parseFloat(el.dataset.plx) || 0.2;
      el.style.transform = "translate3d(0," + (-y * speed).toFixed(1) + "px,0)";
    });

    document.querySelectorAll("[data-plx-img]").forEach((el) => {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) return; // вне экрана — не трогаем
      const center = box.top + box.height / 2 - vh / 2;
      const speed = parseFloat(el.dataset.plxImg) || 0.12;
      el.style.transform = "translate3d(0," + (-center * speed).toFixed(1) + "px,0) scale(1.18)";
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

/* ---------- Галерея: фото или аккуратные заглушки ---------- */
function galleryHtml(photos, placeholders) {
  const cells = photos && photos.length
    ? photos.map((src) => `<div class="photo-box"><div class="ph-in" data-plx-img="0.1"><img src="${src}" alt=""></div></div>`)
    : Array.from({ length: placeholders }, () =>
        `<div class="photo-box"><div class="ph-in" data-plx-img="0.1"><span class="ph-ring"></span><span data-i18n="misc.photoSoon">${t("misc.photoSoon")}</span></div></div>`);
  return `<div class="gallery">${cells.join("")}</div>`;
}

/* Одиночный фото-блок (обложка VIP-зоны, превью на главной) */
function photoBoxHtml(src, extraClass) {
  const inner = src
    ? `<div class="ph-in" data-plx-img="0.08"><img src="${src}" alt=""></div>`
    : `<div class="ph-in" data-plx-img="0.08"><span class="ph-ring"></span><span data-i18n="misc.photoSoon">${t("misc.photoSoon")}</span></div>`;
  return `<div class="photo-box ${extraClass || ""}">${inner}</div>`;
}

/* ---------- Фото в hero на главной ----------
   Пока в site-data.js поле heroPhoto пустое — рисуется встроенная
   SVG-сцена (горы на закате). Впишите путь к фото — подставится оно. */
function applyHeroPhoto() {
  const bg = document.getElementById("heroBg");
  if (bg && SITE.heroPhoto) {
    bg.innerHTML = `<img src="${SITE.heroPhoto}" alt="">`;
  }
}

/* ---------- Акции (Главная и Меню) ---------- */
function renderPromos() {
  const box = document.getElementById("promoGrid");
  if (!box) return;
  box.innerHTML = PROMOS.map(
    (p) => `
    <div class="promo-card">
      <div class="promo-icon">${p.icon}</div>
      <h3>${pick(p, "title")}</h3>
      <p>${pick(p, "text")}</p>
    </div>`
  ).join("");
}

/* ---------- Превью VIP-зон на главной ---------- */
function renderVipPreview() {
  const box = document.getElementById("vipPreview");
  if (!box) return;
  box.innerHTML = VIP_ZONES.map(
    (z) => `
    <a class="vip-mini" href="vip.html#${z.id}">
      ${photoBoxHtml(z.photos[0])}
      <h3>${z.name}</h3>
      <p class="gold">${pick(z, "badge")}</p>
      <p class="dim">${pick(z, "priceLines")[0]}</p>
    </a>`
  ).join("");
}

/* ---------- Полные карточки VIP-зон (страница vip.html) ---------- */
function renderVipPage() {
  const box = document.getElementById("vipCards");
  if (!box) return;
  box.innerHTML = VIP_ZONES.map(
    (z) => `
    <article class="vip-card" id="${z.id}">
      ${photoBoxHtml(z.photos[0], "vip-cover")}
      <div class="vip-card-in">
        <div class="vip-title">
          <h2>${z.name}</h2>
          <span class="vip-badge">${pick(z, "badge")}</span>
        </div>
        <div class="vip-prices">${pick(z, "priceLines").map((l) => `<p>${l}</p>`).join("")}</div>
        <ul class="vip-feats">${pick(z, "features").map((f) => `<li>${f}</li>`).join("")}</ul>
        ${galleryHtml(z.photos.slice(1), 3)}
      </div>
    </article>`
  ).join("");
}

/* ---------- Галереи зала и летника (hall.html, index.html) ---------- */
function renderGalleries() {
  document.querySelectorAll("[data-gallery]").forEach((el) => {
    const key = el.dataset.gallery; // "hall" или "letnik"
    const src = SITE[key];
    if (src) el.innerHTML = galleryHtml(src.photos, parseInt(el.dataset.count || "3", 10));
  });
}

/* ---------- Цифры летника ---------- */
function renderLetnikStats() {
  document.querySelectorAll("[data-letnik-stats]").forEach((el) => {
    el.innerHTML = SITE.letnik.stats
      .map((s) => `<div class="stat"><b>${s.num}</b><span>${pick(s, "label")}</span></div>`)
      .join("");
  });
}

/* ---------- Вакансии ---------- */
function renderRoles() {
  const box = document.getElementById("rolesBox");
  if (!box) return;
  box.innerHTML = pick(SITE.jobs, "roles").map((r) => `<div class="role">${r}</div>`).join("");
  const wa = document.getElementById("jobsWa");
  if (wa) wa.href = waLink(pick(SITE.jobs, "waText"));
}

/* ---------- Контакты (футер и секции контактов) ---------- */
function renderFooter() {
  document.querySelectorAll("[data-contacts]").forEach((box) => {
    box.innerHTML = `
    <div class="contact-card"><strong data-i18n="c.address"></strong><p>${pick(SITE, "address")}</p>
      <p><a class="gold-link" href="${SITE.gisUrl}" target="_blank" rel="noopener" data-i18n="btn.map"></a></p></div>
    <div class="contact-card"><strong data-i18n="c.phone"></strong><p><a class="gold-link" href="${waLink(pick(SITE, "bookText"))}" target="_blank" rel="noopener">${SITE.phoneDisplay}</a></p></div>
    <div class="contact-card"><strong data-i18n="c.insta"></strong><p><a class="gold-link" href="https://instagram.com/${SITE.instagram}" target="_blank" rel="noopener">@${SITE.instagram}</a></p></div>
    <div class="contact-card"><strong data-i18n="c.delivery"></strong><p>${pick(SITE, "delivery")}</p></div>
    <div class="contact-card"><strong data-i18n="c.hours"></strong><p>${pick(SITE, "hours")}<br>${pick(SITE, "karaoke")}</p></div>`;
  });
  applyI18n();
}

/* ---------- Инициализация ---------- */
function renderAll() {
  renderPromos();
  renderVipPreview();
  renderVipPage();
  renderGalleries();
  renderLetnikStats();
  renderRoles();
  renderFooter();
  document.querySelectorAll("[data-book-wa]").forEach((a) => {
    a.href = waLink(pick(SITE, "bookText"));
  });
  applyHeroPhoto();
  applySiteText();
  applyI18n();
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.lang = Lang.get() === "kz" ? "kk" : "ru";

  // переключатель RU/KZ
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.addEventListener("click", () => Lang.set(b.dataset.lang));
  });

  // бургер-меню
  const burger = document.getElementById("burger");
  const nav = document.getElementById("mainNav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("open");
      burger.classList.toggle("open");
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") { nav.classList.remove("open"); burger.classList.remove("open"); }
    });
  }

  renderAll();
  updateCartBadge();
  initParallax();

  document.addEventListener("langchange", renderAll);
});

/* ---------- PWA: service worker ---------- */
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

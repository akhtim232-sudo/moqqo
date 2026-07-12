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

/* ---------- Медиа в hero ----------
   Порядок: видео img/hero.mp4 → фото img/hero.jpg → заглушка.
   Заглушка уже стоит в HTML; видео/фото подменяют её, когда файл есть. */
function initHeroMedia() {
  const box = document.getElementById("heroMedia");
  if (!box) return;
  const v = document.createElement("video");
  v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
  v.setAttribute("playsinline", ""); v.setAttribute("muted", "");
  v.addEventListener("canplay", () => {
    box.innerHTML = ""; box.appendChild(v);
    v.play().catch(() => {});
    // если вкладка была в фоне — запустить при возврате
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && v.paused) v.play().catch(() => {});
    });
  }, { once: true });
  v.addEventListener("error", () => {
    const img = new Image();
    img.alt = "";
    img.onload = () => { box.innerHTML = ""; box.appendChild(img); };
    img.src = SITE.heroPhoto; // если и фото нет — остаётся заглушка
  }, { once: true });
  v.src = SITE.heroVideo;
}

/* ---------- Бегущие строки ---------- */
function renderMarquees() {
  document.querySelectorAll("[data-marquee]").forEach((track) => {
    const items = pick(SITE, track.dataset.marquee) || [];
    // половина трека повторяется трижды, чтобы быть шире любого экрана,
    // затем дублируется целиком — цикл бесшовный на всех ширинах
    const half = (items.map((x) => `<span>${x}</span>`).join("")).repeat(3);
    track.innerHTML = half + half;
  });
}

/* ---------- Тёмные карточки на главной ---------- */
function renderHomeCards() {
  const box = document.getElementById("homeCards");
  if (!box) return;
  const c = SITE.homeCards;
  box.innerHTML = `
    <div class="card-wide">
      <h3>${pick(SITE.letnik, "title")}</h3>
      ${photoBoxHtml(SITE.letnik.photos[0])}
      <p>${pick(SITE.letnik, "text")}</p>
    </div>
    <div class="card-dark">
      <span class="gold-dot">✦</span>
      <div><h3>${pick(c.dark1, "title")}</h3><p style="margin-top:8px">${pick(c.dark1, "text")}</p></div>
    </div>
    <div class="card-dark">
      <span class="gold-dot">✦</span>
      <div><h3>${pick(c.dark2, "title")}</h3><p style="margin-top:8px">${pick(c.dark2, "text")}</p></div>
    </div>`;
}

/* ---------- FAQ-аккордеон ---------- */
function renderFaq() {
  const box = document.getElementById("faqList");
  if (!box) return;
  box.innerHTML = SITE.faq.map(
    (f) => `
    <details class="faq-item">
      <summary>${pick(f, "q")}<span class="faq-x">+</span></summary>
      <div class="faq-a">${pick(f, "a")}</div>
    </details>`
  ).join("");
}

/* ---------- Появление при скролле ---------- */
let revealIO = null;
function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!revealIO) {
    revealIO = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
  }
  document.querySelectorAll(
    ".sec-head, .promo-card, .vip-big, .feature-card, .card-wide, .card-dark, .faq-item, .about-split > *, .role"
  ).forEach((el) => {
    if (el.classList.contains("in")) return;
    el.classList.add("rv");
    revealIO.observe(el);
  });
}

/* ---------- Акции (Главная и Меню) ---------- */
function renderPromos() {
  document.querySelectorAll("[data-promos]").forEach((box) => {
    box.innerHTML = PROMOS.map(
      (p) => `
      <div class="promo-card">
        <div class="promo-num">${p.num}</div>
        <p>${pick(p, "text")}</p>
      </div>`
    ).join("");
  });
}

/* ---------- Превью VIP-зон на главной ---------- */
function renderVipPreview() {
  const box = document.getElementById("vipPreview");
  if (!box) return;
  box.innerHTML = VIP_ZONES.map(
    (z) => `
    <a class="vip-big" href="vip.html#${z.id}">
      ${photoBoxHtml(z.photos[0], "dark")}
      <div class="vip-big-overlay">
        <h3>${z.name}</h3>
        <p class="vip-line">${pick(z, "badge")} · ${pick(z, "features")[0]}</p>
        <p class="vip-price">${pick(z, "priceLines")[0]}</p>
        <span class="btn"><span data-i18n="btn.more">${t("btn.more")}</span><span class="arr">→</span></span>
      </div>
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
        ${z.photos.length > 1 ? galleryHtml(z.photos.slice(1), 0) : ""}
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
  renderHomeCards();
  renderMarquees();
  renderFaq();
  renderFooter();
  document.querySelectorAll("[data-book-wa]").forEach((a) => {
    a.href = waLink(pick(SITE, "bookText"));
  });
  applySiteText();
  applyI18n();
  initReveal();
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
  initHeroMedia();

  // шапка: прозрачная поверх hero, при прокрутке — с блюром
  const hdr = document.querySelector(".site-header");
  if (hdr) {
    const onS = () => hdr.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onS, { passive: true });
    onS();
  }

  document.addEventListener("langchange", renderAll);
});

/* ---------- PWA: service worker ---------- */
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

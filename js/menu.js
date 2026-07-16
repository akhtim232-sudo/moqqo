/* ============================================================
   СТРАНИЦА «МЕНЮ»: вкладки категорий со строгой фильтрацией —
   на экране всегда только одна выбранная категория.
   Порядок вкладок: Хиты → Акции → все категории из menu-data.js.
   По умолчанию открыты «Хиты».
   Данные лежат в js/data/*.js — этот файл менять не нужно.
   ============================================================ */

/* Активная вкладка: "hits" | "promos" | id категории */
let activeCat = "hits";

/* Карточка блюда. Фото-блок есть у каждого блюда:
   если поле img заполнено — показывается фото,
   если пустое — аккуратная заглушка с кольцом логотипа. */
function dishCard(item) {
  const photo = item.img
    ? `<div class="photo-box"><div class="ph-in"><img src="${item.img}" alt="${item.name}" loading="lazy" decoding="async" width="900" height="563"></div></div>`
    : `<div class="photo-box"><div class="ph-in"><span class="ph-ring"></span><span data-i18n="misc.photoSoon">${t("misc.photoSoon")}</span></div></div>`;
  const tag = item.tag ? `<span class="chef-tag">${item.tag}</span>` : "";
  const note = item.note ? `<span class="dish-note">${item.note}</span>` : "";
  const desc = item.desc ? `<p class="dish-desc">${item.desc}</p>` : "";
  return `
  <article class="dish">
    ${photo}
    <div class="dish-body">
      <div class="dish-head">
        <h4 class="dish-name">${item.name}${tag}${note}</h4>
        <span class="dish-dots"></span>
        <span class="dish-price">${item.price}</span>
      </div>
      ${desc}
      <button class="add-btn" data-add="${item.id}" data-i18n="btn.add">${t("btn.add")}</button>
    </div>
  </article>`;
}

/* «Хиты сезона» */
function renderHits() {
  const box = document.getElementById("hitsGrid");
  if (!box) return;
  box.innerHTML = HITS.map((id) => {
    const d = findDish(id);
    return d ? dishCard(d) : "";
  }).join("");
}

/* Вкладки: Хиты, Акции, затем категории */
function renderCatNav() {
  const box = document.getElementById("catNav");
  if (!box) return;
  const chips = [
    `<button class="chip" data-cat="hits">${t("chip.hits")}</button>`,
    `<button class="chip" data-cat="promos">${t("chip.promos")}</button>`,
    ...MENU_DATA.categories.map(
      (c) => `<button class="chip" data-cat="${c.id}">${pick(c, "title")}</button>`
    ),
  ];
  box.innerHTML = chips.join("");
}

/* Все категории (изначально скрыты — покажет setCat) */
function renderCategories() {
  const box = document.getElementById("menuSections");
  if (!box) return;
  box.innerHTML = MENU_DATA.categories
    .map((cat) => {
      let lastGroup = "";
      const rows = cat.items
        .map((item) => {
          let sub = "";
          const g = item.group || "";
          if (g && g !== lastGroup) {
            sub = `<h3 class="subhead">${pick(item, "group")}</h3>`;
          }
          lastGroup = g;
          return sub + dishCard(item);
        })
        .join("");
      return `
      <section class="menu-cat menu-panel" id="cat-${cat.id}" style="display:none">
        <div class="sec-head">
          <p class="eyebrow">${pick(cat, "subtitle")}</p>
          <h2>${pick(cat, "title")}</h2>
        </div>
        <div class="dish-grid">${rows}</div>
      </section>`;
    })
    .join("");
}

/* Показать одну вкладку, остальные полностью скрыть */
function setCat(id) {
  activeCat = id;

  // активная кнопка
  document.querySelectorAll("#catNav .chip").forEach((c) => {
    c.classList.toggle("on", c.dataset.cat === id);
  });

  // панели
  const hits = document.getElementById("hitsPanel");
  const promos = document.getElementById("promoPanel");
  if (hits) hits.style.display = id === "hits" ? "" : "none";
  if (promos) promos.style.display = id === "promos" ? "" : "none";
  document.querySelectorAll(".menu-cat").forEach((s) => {
    s.style.display = s.id === "cat-" + id ? "" : "none";
  });

  // плавное появление выбранной панели
  const panel =
    id === "hits" ? hits : id === "promos" ? promos : document.getElementById("cat-" + id);
  if (panel) {
    panel.classList.remove("fadein");
    void panel.offsetWidth; // перезапуск анимации
    panel.classList.add("fadein");
  }

  // активную кнопку — в зону видимости строки вкладок
  const btn = document.querySelector('#catNav .chip[data-cat="' + id + '"]');
  if (btn) btn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
}

function renderMenuPage() {
  if (!document.getElementById("catNav")) return; // на главной — только хиты
  renderCatNav();
  renderCategories();
  setCat(activeCat); // текущая вкладка сохраняется при смене языка
}

document.addEventListener("DOMContentLoaded", () => {
  renderHits();
  renderMenuPage();
  applyI18n();

  document.addEventListener("langchange", () => {
    renderHits();
    renderMenuPage();
    applyI18n();
  });

  // переключение вкладок
  document.addEventListener("click", (e) => {
    const chip = e.target.closest("#catNav .chip");
    if (chip) setCat(chip.dataset.cat);
  });

  // «+ в заказ» (делегирование — работает после перерисовок)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    Cart.add(btn.dataset.add, 1);
    btn.classList.add("added");
    btn.textContent = t("btn.added");
    setTimeout(() => {
      btn.classList.remove("added");
      btn.textContent = t("btn.add");
    }, 900);
  });
});

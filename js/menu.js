/* ============================================================
   СТРАНИЦА «МЕНЮ»: рендер хитов, категорий и кнопок «+ в заказ».
   Данные лежат в js/data/menu-data.js и js/data/hits-data.js —
   этот файл менять не нужно.
   ============================================================ */

/* Карточка блюда */
function dishCard(item) {
  const img = item.img
    ? `<div class="dish-img"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>`
    : "";
  const tag = item.tag ? `<span class="chef-tag">${item.tag}</span>` : "";
  const note = item.note ? `<span class="dish-note">${item.note}</span>` : "";
  const desc = item.desc ? `<p class="dish-desc">${item.desc}</p>` : "";
  return `
  <article class="dish ${item.img ? "has-img" : ""}">
    ${img}
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

/* Навигация по категориям (чипсы) */
function renderCatNav() {
  const box = document.getElementById("catNav");
  if (!box) return;
  box.innerHTML = MENU_DATA.categories
    .map((c) => `<a class="chip" href="#cat-${c.id}">${pick(c, "title")}</a>`)
    .join("");
}

/* Все категории */
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
      <section class="menu-cat" id="cat-${cat.id}">
        <div class="sec-head">
          <p class="eyebrow">${pick(cat, "subtitle")}</p>
          <h2>${pick(cat, "title")}</h2>
          <div class="divider"><span></span><i></i><span></span></div>
        </div>
        <div class="dish-grid">${rows}</div>
      </section>`;
    })
    .join("");
}

function renderMenuPage() {
  renderHits();
  renderCatNav();
  renderCategories();
  applyI18n();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenuPage();
  document.addEventListener("langchange", renderMenuPage);

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

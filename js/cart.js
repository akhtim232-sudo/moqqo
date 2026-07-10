/* ============================================================
   СТРАНИЦА «КОРЗИНА»: список выбранного, сумма и три действия —
   «Показать официанту», «Отправить в WhatsApp», «Поделиться».
   Оплаты нет — корзина только формирует заказ.
   ============================================================ */

/* Позиции корзины: [{dish, qty, sum}] */
function cartItems() {
  const c = Cart.read();
  const list = [];
  for (const id of Object.keys(c)) {
    const dish = findDish(id);
    if (!dish) continue;
    const qty = c[id];
    list.push({ dish, qty, sum: priceValue(dish.price) * qty });
  }
  return list;
}

function cartTotal(list) {
  return list.reduce((s, i) => s + i.sum, 0);
}

/* Текст заказа для WhatsApp и «Поделиться» */
function orderText() {
  const list = cartItems();
  const lines = [t("cart.orderPrefix"), ""];
  list.forEach((i, n) => {
    lines.push(`${n + 1}. ${i.dish.name} ×${i.qty} — ${formatTenge(i.sum)}`);
  });
  lines.push("", `${t("cart.total")}: ${formatTenge(cartTotal(list))}`);
  return lines.join("\n");
}

function renderCart() {
  const box = document.getElementById("cartList");
  const totalBox = document.getElementById("cartTotal");
  const actions = document.getElementById("cartActions");
  const empty = document.getElementById("cartEmpty");
  if (!box) return;

  const list = cartItems();
  const has = list.length > 0;
  empty.style.display = has ? "none" : "";
  actions.style.display = has ? "" : "none";
  totalBox.style.display = has ? "" : "none";

  box.innerHTML = list
    .map(
      (i) => `
    <div class="cart-row">
      <div class="cart-info">
        <span class="cart-name">${i.dish.name}</span>
        <span class="cart-price-one">${i.dish.price}</span>
      </div>
      <div class="qty">
        <button class="qty-btn" data-dec="${i.dish.id}" aria-label="−">−</button>
        <span class="qty-num">${i.qty}</span>
        <button class="qty-btn" data-inc="${i.dish.id}" aria-label="+">+</button>
      </div>
      <span class="cart-sum">${formatTenge(i.sum)}</span>
    </div>`
    )
    .join("");

  if (has) {
    totalBox.innerHTML = `<span data-i18n="cart.total">${t("cart.total")}</span><strong>${formatTenge(cartTotal(list))}</strong>`;
    document.getElementById("waSend").href = waLink(orderText());
  }
  applyI18n();
}

/* Полноэкранный режим «Показать официанту» */
function showWaiter() {
  const list = cartItems();
  const ov = document.getElementById("waiterOverlay");
  document.getElementById("waiterList").innerHTML =
    list
      .map(
        (i) => `
    <div class="waiter-row">
      <span>${i.dish.name} <b>×${i.qty}</b></span>
      <span>${formatTenge(i.sum)}</span>
    </div>`
      )
      .join("") +
    `<div class="waiter-row waiter-total"><span>${t("cart.total")}</span><span>${formatTenge(cartTotal(list))}</span></div>`;
  ov.classList.add("show");
  document.body.style.overflow = "hidden";
}

function hideWaiter() {
  document.getElementById("waiterOverlay").classList.remove("show");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  document.addEventListener("langchange", renderCart);

  document.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    if (inc) { Cart.add(inc.dataset.inc, 1); renderCart(); }
    if (dec) { Cart.add(dec.dataset.dec, -1); renderCart(); }
  });

  document.getElementById("showWaiter").addEventListener("click", showWaiter);
  document.getElementById("waiterClose").addEventListener("click", hideWaiter);

  document.getElementById("clearCart").addEventListener("click", () => {
    Cart.clear();
    renderCart();
  });

  // «Поделиться»: системное окно, если поддерживается, иначе — копирование
  document.getElementById("shareBtn").addEventListener("click", async () => {
    const text = orderText();
    if (navigator.share) {
      try { await navigator.share({ title: t("cart.shareTitle"), text }); } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert(t("cart.copied"));
      } catch (e) {}
    }
  });
});

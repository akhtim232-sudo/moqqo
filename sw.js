/* ============================================================
   SERVICE WORKER — офлайн-кеш, чтобы сайт устанавливался
   на телефон как приложение и открывался без интернета.

   ВАЖНО: после ЛЮБОГО изменения файлов сайта (меню, цены, стили)
   увеличьте номер версии ниже (v1 → v2 → v3 ...), иначе телефоны
   могут показывать старую закешированную версию.
   ============================================================ */

const CACHE = "moqqo-v12";

/* Что кешируем при установке */
const ASSETS = [
  "./",
  "./index.html",
  "./menu.html",
  "./cart.html",
  "./vip.html",
  "./hall.html",
  "./about.html",
  "./jobs.html",
  "./css/style.css",
  "./js/app.js",
  "./js/menu.js",
  "./js/cart.js",
  "./js/i18n.js",
  "./js/data/menu-data.js",
  "./js/data/hits-data.js",
  "./js/data/promos-data.js",
  "./js/data/vip-data.js",
  "./js/data/site-data.js",
  "./img/icon-192.png",
  "./img/icon-512.png",
  "./manifest.webmanifest",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Стратегия: сеть → при неудаче кеш (свежие данные, офлайн-запас).
   Для шрифтов и картинок: кеш → сеть. */
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isStatic = url.origin !== location.origin || /\.(png|jpg|jpeg|webp|svg|woff2?)$/.test(url.pathname);

  if (isStatic) {
    // кеш → сеть (картинки, шрифты)
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
            return res;
          })
      )
    );
  } else {
    // сеть → кеш (страницы и скрипты)
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
    );
  }
});

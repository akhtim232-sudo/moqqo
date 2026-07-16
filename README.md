# Moqqo Restobar — сайт

Статический сайт (HTML/CSS/JS, без сборщиков) для публикации на GitHub Pages:
**https://akhtim232-sudo.github.io/moqqo**

## Какие файлы редактировать

| Что поменять | Файл |
|---|---|
| Блюда, цены, составы, фото блюд | `js/data/menu-data.js` |
| Хиты сезона (какие 6 блюд наверху меню) | `js/data/hits-data.js` |
| Акции | `js/data/promos-data.js` |
| VIP-зоны: цены, условия, фото | `js/data/vip-data.js` |
| Контакты, часы, слоган, тексты «О нас», зал/летник, вакансии | `js/data/site-data.js` |
| Переводы кнопок и надписей (RU/KZ) | `js/i18n.js` |

Во всех файлах данных есть подробные комментарии на русском.

**После любого изменения** увеличьте версию кеша в `sw.js`
(строка `const CACHE = "moqqo-v1"` → `"moqqo-v2"` и т. д.) — иначе телефоны
с установленным приложением будут показывать старую версию.

## Фото

Кладите фото в `img/photos/` и прописывайте пути:
- у блюда — поле `img: "img/dishes/категория-блюдо.jpg"` в `menu-data.js` (фото блюд лежат в `img/dishes/`);
- у VIP-зоны / зала / летника — массив `photos: [...]` в `vip-data.js` / `site-data.js`.

Пока путь пустой — показывается аккуратная заглушка.

## Публикация на GitHub Pages

1. Создайте репозиторий `moqqo` в аккаунте `akhtim232-sudo`.
2. Загрузите туда всё содержимое этой папки (ветка `main`).
3. В настройках репозитория: Settings → Pages → Source: **Deploy from a branch**,
   Branch: **main**, папка **/ (root)** → Save.
4. Через пару минут сайт откроется по адресу `https://akhtim232-sudo.github.io/moqqo/`.

Команды для терминала (из этой папки):

```bash
git init
git add .
git commit -m "Moqqo Restobar site"
git branch -M main
git remote add origin https://github.com/akhtim232-sudo/moqqo.git
git push -u origin main
```

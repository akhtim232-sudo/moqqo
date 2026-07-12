/* ============================================================
   ПЕРЕВОДЫ ИНТЕРФЕЙСА (русский / казахский).
   Тексты страниц и данных лежат в js/data/*.js —
   здесь только кнопки, меню навигации, подписи и т. п.
   ============================================================ */

const I18N = {
  ru: {
    // Навигация
    "nav.home": "Главная",
    "nav.menu": "Меню",
    "nav.vip": "VIP-зоны",
    "nav.hall": "Зал и летник",
    "nav.about": "О нас",
    "nav.jobs": "Работа у нас",
    "nav.cart": "Корзина",

    // Кнопки
    "btn.menu": "Меню",
    "btn.book": "Забронировать в WhatsApp",
    "btn.add": "+ в заказ",
    "btn.added": "✓ добавлено",
    "btn.map": "Открыть в 2GIS",
    "btn.waiter": "Показать официанту",
    "btn.sendWa": "Отправить в WhatsApp",
    "btn.share": "Поделиться",
    "btn.toMenu": "Перейти в меню",
    "btn.writeWa": "Написать в WhatsApp",
    "btn.close": "Закрыть",
    "btn.clear": "Очистить корзину",
    "btn.allVip": "Все VIP-зоны",

    // Заголовки блоков
    "sec.promos": "Акции",
    "sec.promosSub": "Выгодно сегодня",
    "sec.hits": "Хиты сезона",
    "sec.hitsSub": "Выбор гостей",
    "sec.vip": "VIP-зоны",
    "sec.vipSub": "Три формата отдыха",
    "sec.hall": "Зал и летник",
    "sec.contacts": "Контакты",
    "sec.gallery": "Фото скоро появятся",

    // Корзина
    "cart.title": "Ваш заказ",
    "cart.empty": "Корзина пока пуста",
    "cart.emptyHint": "Добавьте блюда из меню — кнопкой «+ в заказ»",
    "cart.total": "Итого",
    "cart.waiterTitle": "Мой заказ",
    "cart.orderPrefix": "Здравствуйте! Хочу заказать в Moqqo Restobar:",
    "cart.shareTitle": "Мой заказ в Moqqo Restobar",
    "cart.copied": "Заказ скопирован",

    // Контакты / подписи
    "c.address": "Адрес",
    "c.phone": "WhatsApp",
    "c.insta": "Instagram",
    "c.delivery": "Доставка",
    "c.hours": "Часы работы",

    // Вкладки меню
    "chip.hits": "Хиты",
    "chip.promos": "Акции",

    // Главная (новые блоки)
    "sec.about": "Знакомьтесь, Moqqo.",
    "btn.viewMenu": "Смотреть меню",
    "btn.more": "Подробнее",
    "btn.bookShort": "Забронировать",
    "sec.faq": "Частые вопросы",

    // Прочее
    "misc.photoSoon": "Фото скоро",
    "misc.karaoke": "Караоке",
    "misc.jobsLead": "Ищем в команду:",
    "misc.installHint": "Сайт можно установить на телефон как приложение",
  },

  kz: {
    // Навигация
    "nav.home": "Басты бет",
    "nav.menu": "Мәзір",
    "nav.vip": "VIP аймақтар",
    "nav.hall": "Зал және жазғы алаң",
    "nav.about": "Біз туралы",
    "nav.jobs": "Бізде жұмыс",
    "nav.cart": "Себет",

    // Кнопки
    "btn.menu": "Мәзір",
    "btn.book": "WhatsApp арқылы брондау",
    "btn.add": "+ тапсырысқа",
    "btn.added": "✓ қосылды",
    "btn.map": "2GIS-те ашу",
    "btn.waiter": "Даяшыға көрсету",
    "btn.sendWa": "WhatsApp-қа жіберу",
    "btn.share": "Бөлісу",
    "btn.toMenu": "Мәзірге өту",
    "btn.writeWa": "WhatsApp-қа жазу",
    "btn.close": "Жабу",
    "btn.clear": "Себетті тазалау",
    "btn.allVip": "Барлық VIP аймақтар",

    // Заголовки блоков
    "sec.promos": "Акциялар",
    "sec.promosSub": "Бүгін тиімді",
    "sec.hits": "Маусым хиттері",
    "sec.hitsSub": "Қонақтар таңдауы",
    "sec.vip": "VIP аймақтар",
    "sec.vipSub": "Демалыстың үш форматы",
    "sec.hall": "Зал және жазғы алаң",
    "sec.contacts": "Байланыс",
    "sec.gallery": "Фотолар жақында қосылады",

    // Корзина
    "cart.title": "Сіздің тапсырысыңыз",
    "cart.empty": "Себет әзірге бос",
    "cart.emptyHint": "«+ тапсырысқа» батырмасымен мәзірден тағам қосыңыз",
    "cart.total": "Барлығы",
    "cart.waiterTitle": "Менің тапсырысым",
    "cart.orderPrefix": "Сәлеметсіз бе! Moqqo Restobar-дан тапсырыс бергім келеді:",
    "cart.shareTitle": "Moqqo Restobar-дағы тапсырысым",
    "cart.copied": "Тапсырыс көшірілді",

    // Контакты / подписи
    "c.address": "Мекенжай",
    "c.phone": "WhatsApp",
    "c.insta": "Instagram",
    "c.delivery": "Жеткізу",
    "c.hours": "Жұмыс уақыты",

    // Вкладки меню
    "chip.hits": "Хиттер",
    "chip.promos": "Акциялар",

    // Главная (новые блоки)
    "sec.about": "Танысыңыз, Moqqo.",
    "btn.viewMenu": "Мәзірді қарау",
    "btn.more": "Толығырақ",
    "btn.bookShort": "Брондау",
    "sec.faq": "Жиі қойылатын сұрақтар",

    // Прочее
    "misc.photoSoon": "Фото жақында",
    "misc.karaoke": "Караоке",
    "misc.jobsLead": "Командаға іздейміз:",
    "misc.installHint": "Сайтты телефонға қосымша ретінде орнатуға болады",
  },
};

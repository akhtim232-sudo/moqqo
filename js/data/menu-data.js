/* ============================================================
   МЕНЮ MOQQO RESTOBAR — все категории, блюда и цены.
   Этот файл — единственное место, где хранятся блюда.

   КАК РЕДАКТИРОВАТЬ:
   • Название блюда  → поле  name   (показывается как есть на обоих языках)
   • Цена            → поле  price  (строка, как в меню: "5 100 ₸";
                        для бара бывает двойная: "1 500 / 15 000 ₸" —
                        в корзину при этом идёт ПЕРВАЯ цифра)
   • Состав          → поле  desc   (пустая строка "" — состав не указан,
                        строка на карточке просто не показывается)
   • Фото            → поле  img    (путь к файлу, например "img/photos/plov.jpg";
                        пустая строка "" — аккуратная карточка без фото)
   • Метка           → поле  tag    (например "Шеф" или "Комбо", можно "")
   • Подпись объёма  → поле  note   (например "0,5 л", можно "")
   • Подгруппа       → поле  group  (только в Баре и Напитках: блюда с одинаковым
                        group собираются под общим подзаголовком)

   ВАЖНО: поле id трогать не нужно — по нему работает корзина и «Хиты сезона».
   Чтобы добавить блюдо — скопируйте любую строку { ... } и поменяйте id
   на новый уникальный (например "zakuski-20").
   ============================================================ */

const MENU_DATA = {
  categories: [

    /* ────────── ЗАКУСКИ ────────── */
    {
      id: "zakuski",
      title: "Закуски",          // название категории (рус)
      titleKz: "Закускалар",               // название категории (каз)
      subtitle: "Холодные и горячие",          // подзаголовок (рус)
      subtitleKz: "Суық және ыстық",            // подзаголовок (каз)
      items: [
        { id: "zakuski-1", name: "Мясная нарезка", price: "5 000 ₸", desc: "Говяжий язык, копчёное мясо, жая, казы, кур филе, соус", img: "" },
        { id: "zakuski-2", name: "Сырная тарелка", price: "6 000 ₸", desc: "Дорблю, голландский, пармезан, маасдам, груша, мёд, грецкий орех", img: "" },
        { id: "zakuski-3", name: "Рыбная нарезка", price: "6 000 ₸", desc: "Эсколар, сёмга", img: "" },
        { id: "zakuski-4", name: "Овощная нарезка", price: "3 500 ₸", desc: "Помидоры, огурцы, болгарский перец, дайкон, брынза, зелень", img: "" },
        { id: "zakuski-5", name: "Рулетики из баклажан", price: "2 300 ₸", desc: "", img: "" },
        { id: "zakuski-6", name: "Гренки чесночные", price: "890 ₸", desc: "", img: "" },
        { id: "zakuski-7", name: "Сельдь по-русски", price: "2 900 ₸", desc: "", img: "" },
        { id: "zakuski-8", name: "Домашние соленья", price: "3 300 ₸", desc: "Грибы, томаты черри, огурец, кукуруза, квашеная капуста", img: "" },
        { id: "zakuski-9", name: "Сырные палочки", price: "2 000 ₸", desc: "", img: "" },
        { id: "zakuski-10", name: "Картофель фри", price: "1 090 ₸", desc: "", img: "" },
        { id: "zakuski-11", name: "Картофельные дольки", price: "1 190 ₸", desc: "", img: "" },
        { id: "zakuski-12", name: "Крылышки BBQ", price: "2 490 ₸", desc: "", img: "" },
        { id: "zakuski-13", name: "Крылышки Свитчили", price: "2 490 ₸", desc: "", img: "" },
        { id: "zakuski-14", name: "Пивные креветки", price: "3 400 ₸", desc: "", img: "" },
        { id: "zakuski-15", name: "Креветки в соусе Том Ям", price: "4 100 ₸", desc: "", img: "" },
        { id: "zakuski-16", name: "Наггетсы куриные", price: "1 890 ₸", desc: "", img: "" },
        { id: "zakuski-17", name: "Жареный чечил", price: "1 890 ₸", desc: "", img: "" },
        { id: "zakuski-18", name: "Чебуречки", price: "2 000 ₸", desc: "", img: "" },
        { id: "zakuski-19", name: "Сахарные косточки", price: "4 900 ₸", desc: "Сахарная кость, соус сальса, лепёшка", img: "" },
      ]
    },

    /* ────────── САЛАТЫ ────────── */
    {
      id: "salaty",
      title: "Салаты",          // название категории (рус)
      titleKz: "Салаттар",               // название категории (каз)
      subtitle: "Свежие и тёплые",          // подзаголовок (рус)
      subtitleKz: "Балғын және жылы",            // подзаголовок (каз)
      items: [
        { id: "salaty-1", name: "Цезарь с креветками", price: "3 180 ₸", desc: "Айсберг, соус цезарь, черри, креветки, пармезан, крутоны, перепелиное яйцо", img: "img/dishes/salaty-tsezar-s-krevetkami.jpg" },
        { id: "salaty-2", name: "Цезарь с сёмгой", price: "3 280 ₸", desc: "Айсберг, соус цезарь, черри, лосось с/с, пармезан, крутоны", img: "img/dishes/salaty-tsezar-s-semgoy.jpg" },
        { id: "salaty-3", name: "Цезарь с курицей", price: "2 590 ₸", desc: "Айсберг, соус цезарь, черри, куриное филе, пармезан, крутоны", img: "" },
        { id: "salaty-4", name: "Хрустящие баклажаны", price: "3 200 ₸", desc: "Баклажаны, помидоры, микс салата, творожный сыр, кедровые орехи", img: "img/dishes/salaty-hrustyaschie-baklazhany.jpg" },
        { id: "salaty-5", name: "Греческий", price: "2 390 ₸", desc: "Помидоры, огурцы, перец, оливки, маслины, фета, лимонный дрессинг", img: "img/dishes/salaty-grecheskiy.jpg" },
        { id: "salaty-6", name: "Тёплый с телятиной", price: "3 290 ₸", desc: "Микс салата, телятина, баклажаны, черри, кедровые орехи, бальзамик", img: "img/dishes/salaty-teplyy-s-telyatinoy.jpg", tag: "Шеф" },
        { id: "salaty-7", name: "Тёплый с курицей", price: "2 990 ₸", desc: "Рукола, черри, куриное филе, баклажаны, соус кимчи и терияки", img: "img/dishes/salaty-teplyy-s-kuritsey.jpg" },
        { id: "salaty-8", name: "Шейх", price: "3 800 ₸", desc: "Телятина, шампиньоны, черри, корнишоны, зелень, соевый соус", img: "img/dishes/salaty-sheyh.jpg" },
        { id: "salaty-9", name: "GUZEL", price: "3 800 ₸", desc: "Говяжий язык, шампиньоны, черри, корнишоны, зелень, соевый соус", img: "" },
        { id: "salaty-10", name: "Балканский", price: "3 900 ₸", desc: "Говядина, шампиньоны, корнишоны, перец, черри, кунжутное масло", img: "img/dishes/salaty-balkanskiy.jpg" },
        { id: "salaty-11", name: "Восточный", price: "3 300 ₸", desc: "Говядина, шампиньоны, цветная капуста, черри, сыр гольбани, руккола", img: "img/dishes/salaty-vostochnyy.jpg" },
        { id: "salaty-12", name: "Восхитительный", price: "3 300 ₸", desc: "Баклажаны, перец, телятина, помидоры, фасоль, майонез с чесноком", img: "" },
        { id: "salaty-13", name: "Ачучук", price: "1 500 ₸", desc: "", img: "img/dishes/salaty-achuchuk.jpg" },
      ]
    },

    /* ────────── СУПЫ ────────── */
    {
      id: "supy",
      title: "Супы",          // название категории (рус)
      titleKz: "Сорпалар",               // название категории (каз)
      subtitle: "Согревающие",          // подзаголовок (рус)
      subtitleKz: "Жылытатын",            // подзаголовок (каз)
      items: [
        { id: "supy-1", name: "Том Ям с морепродуктами", price: "3 990 ₸", desc: "", img: "img/dishes/supy-tom-yam-s-moreproduktami.jpg" },
        { id: "supy-2", name: "Уха по-царски", price: "3 200 ₸", desc: "", img: "img/dishes/supy-uha-po-tsarski.jpg" },
        { id: "supy-3", name: "Шорпа из баранины", price: "3 600 ₸", desc: "", img: "img/dishes/supy-shorpa-iz-baraniny.jpg" },
        { id: "supy-4", name: "Грибной крем-суп", price: "2 300 ₸", desc: "", img: "img/dishes/supy-gribnoy-krem-sup.jpg" },
        { id: "supy-5", name: "Рамен с говядиной", price: "2 790 ₸", desc: "", img: "img/dishes/supy-ramen-s-govyadinoy.jpg" },
        { id: "supy-6", name: "Рамен с курицей", price: "2 690 ₸", desc: "", img: "img/dishes/supy-ramen-s-kuritsey.jpg" },
        { id: "supy-7", name: "Чечевичный суп", price: "2 200 ₸", desc: "", img: "img/dishes/supy-chechevichnyy-sup.jpg" },
        { id: "supy-8", name: "Пельмени по-домашнему", price: "2 400 ₸", desc: "", img: "img/dishes/supy-pelmeni-po-domashnemu.jpg" },
        { id: "supy-9", name: "Кеспе из курицы", price: "1 900 ₸", desc: "", img: "img/dishes/supy-kespe-iz-kuritsy.jpg" },
        { id: "supy-10", name: "Окрошка (сезонная)", price: "1 800 ₸", desc: "", img: "img/dishes/supy-okroshka-sezonnaya.jpg" },
      ]
    },

    /* ────────── ГОРЯЧИЕ БЛЮДА ────────── */
    {
      id: "goryachee",
      title: "Горячие блюда",          // название категории (рус)
      titleKz: "Ыстық тағамдар",               // название категории (каз)
      subtitle: "Стейки, рыба, гриль",          // подзаголовок (рус)
      subtitleKz: "Стейктер, балық, гриль",            // подзаголовок (каз)
      items: [
        { id: "goryachee-1", name: "Комбо: Плов + морс", price: "2 000 ₸", desc: "Узбекский плов с домашним морсом на выбор — выгодный обед", img: "img/dishes/goryachee-kombo-plov-mors.jpg", tag: "Комбо" },
        { id: "goryachee-2", name: "Стейк из сёмги в сливочном соусе", price: "8 000 ₸", desc: "Подаётся с рисом и красной икрой", img: "img/dishes/goryachee-steyk-iz-semgi-v-slivochnom-souse.jpg", tag: "Шеф" },
        { id: "goryachee-3", name: "Стейк Тибон", price: "9 800 ₸", desc: "", img: "img/dishes/goryachee-steyk-tibon.jpg" },
        { id: "goryachee-4", name: "Стейк Рибай", price: "9 800 ₸", desc: "", img: "img/dishes/goryachee-steyk-ribay.jpg" },
        { id: "goryachee-5", name: "Утиная грудка в ягодном соусе", price: "3 790 ₸", desc: "Тающая во рту, медово-горчичный маринад", img: "img/dishes/goryachee-utinaya-grudka-v-yagodnom-souse.jpg" },
        { id: "goryachee-6", name: "Говядина по-строгановски", price: "3 290 ₸", desc: "Говяжья вырезка с грибами в сливочном соусе, картофельное пюре", img: "img/dishes/goryachee-govyadina-po-stroganovski.jpg" },
        { id: "goryachee-7", name: "Филе миньон в перечном соусе", price: "3 790 ₸", desc: "", img: "img/dishes/goryachee-file-minon-v-perechnom-souse.jpg" },
        { id: "goryachee-8", name: "Судак на жаровне", price: "3 190 ₸", desc: "Белая речная рыба с миксом овощей", img: "img/dishes/goryachee-sudak-na-zharovne.jpg" },
        { id: "goryachee-9", name: "Сибас", price: "6 000 ₸", desc: "", img: "img/dishes/goryachee-sibas.jpg" },
        { id: "goryachee-10", name: "Телятина с овощами", price: "3 190 ₸", desc: "Вырезка, обжаренная с овощами и паназиатским соусом", img: "img/dishes/goryachee-telyatina-s-ovoschami.jpg" },
        { id: "goryachee-11", name: "Куриное филе с соусом карри", price: "3 190 ₸", desc: "Соус на кокосовом молоке, подаётся с рисом", img: "img/dishes/goryachee-kurinoe-file-s-sousom-karri.jpg" },
        { id: "goryachee-12", name: "Курица с овощами", price: "3 000 ₸", desc: "", img: "img/dishes/goryachee-kuritsa-s-ovoschami.jpg" },
        { id: "goryachee-13", name: "Куырдак говядина", price: "3 200 ₸", desc: "", img: "img/dishes/goryachee-kuyrdak-govyadina.jpg" },
        { id: "goryachee-14", name: "Сокоро", price: "3 800 ₸", desc: "Говядина, лук, рис", img: "img/dishes/goryachee-sokoro.jpg" },
        { id: "goryachee-15", name: "Манты на пару", price: "2 700 ₸", desc: "", img: "img/dishes/goryachee-manty-na-paru.jpg" },
        { id: "goryachee-16", name: "Манты жареные", price: "3 100 ₸", desc: "", img: "img/dishes/goryachee-manty-zharenye.jpg" },
        { id: "goryachee-17", name: "Жареные карасі", price: "2 600 ₸", desc: "", img: "img/dishes/goryachee-zharenye-karasi.jpg" },
        { id: "goryachee-18", name: "Лагман Цомян", price: "3 200 ₸", desc: "", img: "img/dishes/goryachee-lagman-tsomyan.jpg" },
        { id: "goryachee-19", name: "Лагман Гуйру", price: "3 200 ₸", desc: "", img: "img/dishes/goryachee-lagman-guyru.jpg" },
        { id: "goryachee-20", name: "Казан кебаб (баранина)", price: "3 200 ₸", desc: "", img: "img/dishes/goryachee-kazan-kebab-baranina.jpg" },
        { id: "goryachee-21", name: "Казан кебаб (курица)", price: "3 200 ₸", desc: "", img: "img/dishes/goryachee-kazan-kebab-kuritsa.jpg" },
      ]
    },

    /* ────────── ШАШЛЫКИ ────────── */
    {
      id: "shashlyk",
      title: "Шашлыки",          // название категории (рус)
      titleKz: "Шашлықтар",               // название категории (каз)
      subtitle: "На живом огне",          // подзаголовок (рус)
      subtitleKz: "Ашық отта",            // подзаголовок (каз)
      items: [
        { id: "shashlyk-1", name: "Шашлык Баранина", price: "5 100 ₸", desc: "", img: "img/dishes/shashlyk-baranina.jpg" },
        { id: "shashlyk-2", name: "Шашлык Утка", price: "3 500 ₸", desc: "", img: "img/dishes/shashlyk-utka.jpg" },
        { id: "shashlyk-3", name: "Шашлык телятина с курдюком", price: "3 800 ₸", desc: "", img: "img/dishes/shashlyk-telyatina-s-kurdyukom.jpg" },
        { id: "shashlyk-4", name: "Шашлык Люля кебаб", price: "3 300 ₸", desc: "", img: "img/dishes/shashlyk-lyulya-kebab.jpg" },
        { id: "shashlyk-5", name: "Шашлык из куриного филе", price: "3 200 ₸", desc: "", img: "img/dishes/shashlyk-iz-kurinogo-file.jpg" },
        { id: "shashlyk-6", name: "Шашлык из куриного крыла", price: "3 100 ₸", desc: "", img: "img/dishes/shashlyk-iz-kurinogo-kryla.jpg" },
        { id: "shashlyk-7", name: "Шашлык из куриного бедра", price: "3 100 ₸", desc: "", img: "img/dishes/shashlyk-iz-kurinogo-bedra.jpg" },
        { id: "shashlyk-8", name: "Печень с курдюком на мангале", price: "2 900 ₸", desc: "", img: "img/dishes/shashlyk-pechen-s-kurdyukom-na-mangale.jpg" },
      ]
    },

    /* ────────── КОЛБАСКИ ────────── */
    {
      id: "kolbaski",
      title: "Колбаски",          // название категории (рус)
      titleKz: "Шұжықтар",               // название категории (каз)
      subtitle: "С мангала",          // подзаголовок (рус)
      subtitleKz: "Мангалдан",            // подзаголовок (каз)
      items: [
        { id: "kolbaski-1", name: "Ассорти из колбасок", price: "9 690 ₸", desc: "", img: "img/dishes/kolbaski-assorti-iz-kolbasok.jpg" },
        { id: "kolbaski-2", name: "Колбаски из говядины", price: "3 990 ₸", desc: "", img: "img/dishes/kolbaski-iz-govyadiny.jpg" },
        { id: "kolbaski-3", name: "Колбаски из баранины", price: "3 890 ₸", desc: "", img: "img/dishes/kolbaski-iz-baraniny.jpg" },
        { id: "kolbaski-4", name: "Колбаски из курицы", price: "3 690 ₸", desc: "", img: "img/dishes/kolbaski-iz-kuritsy.jpg" },
      ]
    },

    /* ────────── ПИЦЦА И ПАСТА ────────── */
    {
      id: "pizza-pasta",
      title: "Пицца и Паста",          // название категории (рус)
      titleKz: "Пицца және Паста",               // название категории (каз)
      subtitle: "Из печи",          // подзаголовок (рус)
      subtitleKz: "Пештен",            // подзаголовок (каз)
      items: [
        { id: "pizza-pasta-1", name: "Пицца MOQQO", price: "3 890 ₸", desc: "", img: "" },
        { id: "pizza-pasta-2", name: "Пицца 4 Сыра", price: "3 490 ₸", desc: "", img: "" },
        { id: "pizza-pasta-3", name: "Пицца Альфредо", price: "3 200 ₸", desc: "", img: "" },
        { id: "pizza-pasta-4", name: "Пицца Пепперони", price: "3 190 ₸", desc: "", img: "" },
        { id: "pizza-pasta-5", name: "Пицца Болоньезе", price: "3 500 ₸", desc: "", img: "" },
        { id: "pizza-pasta-6", name: "Пицца Маргарита", price: "3 000 ₸", desc: "", img: "" },
        { id: "pizza-pasta-7", name: "Хачапури по-аджарски", price: "3 400 ₸", desc: "", img: "" },
        { id: "pizza-pasta-8", name: "Хачапури по-мергельски", price: "3 400 ₸", desc: "", img: "" },
        { id: "pizza-pasta-9", name: "Паста с морепродуктами", price: "4 000 ₸", desc: "", img: "" },
        { id: "pizza-pasta-10", name: "Паста Альфредо", price: "3 300 ₸", desc: "", img: "" },
        { id: "pizza-pasta-11", name: "Паста Болоньезе", price: "3 500 ₸", desc: "", img: "" },
        { id: "pizza-pasta-12", name: "Хлебная корзина", price: "1 090 ₸", desc: "", img: "" },
        { id: "pizza-pasta-13", name: "Лепёшки домашние", price: "690 ₸", desc: "", img: "" },
      ]
    },

    /* ────────── НА КОМПАНИЮ ────────── */
    {
      id: "kompaniya",
      title: "На компанию",          // название категории (рус)
      titleKz: "Компанияға",               // название категории (каз)
      subtitle: "Большой стол",          // подзаголовок (рус)
      subtitleKz: "Үлкен дастархан",            // подзаголовок (каз)
      items: [
        { id: "kompaniya-1", name: "Сэт Казахстан", price: "99 999 ₸", desc: "Баранья ножка 2шт, шея, рёбра, шашлык баранина 2шт, люля 2шт, печень 2шт, колбаски, овощи и шампиньоны гриль, дольки, долма, соусы, лаваш", img: "", tag: "Шеф" },
        { id: "kompaniya-2", name: "Ведро Дары Морей", price: "29 500 ₸", desc: "Креветки, лангустины, гребешок, осьминог, мидии, клешни краба, мойва, кальмар, кукуруза", img: "" },
        { id: "kompaniya-3", name: "Сэт на компанию", price: "70 000 ₸", desc: "Бараньи ножки 2шт, ассорти колбасок, шашлык баранина, утка, бедро, крыло, телятина, овощи гриль, дольки", img: "" },
        { id: "kompaniya-4", name: "Дымляма баранина", price: "50 000 ₸", desc: "Рёбра баранины, морковь, картофель, перец, баклажан, кукуруза, капуста, зелень", img: "" },
        { id: "kompaniya-5", name: "Дымляма говядина", price: "45 000 ₸", desc: "На 10–15 персон. Говяжьи рёбра и овощи, томлёные в казане", img: "" },
        { id: "kompaniya-6", name: "Сэт на компанию Mini", price: "40 000 ₸", desc: "Баранья ножка, колбаски, шашлык бедро, крыло, филе, овощи гриль, дольки", img: "" },
        { id: "kompaniya-7", name: "Мужская прихоть", price: "32 500 ₸", desc: "Микс стейков: тибон, рибай, утка, куриное филе, колбаски, баранина, курица", img: "" },
        { id: "kompaniya-8", name: "Плов Ташкентский", price: "32 000 ₸", desc: "", img: "" },
        { id: "kompaniya-9", name: "Рыбный сэт", price: "32 000 ₸", desc: "Сёмга, сибас, судак, карась, овощи гриль, лимон", img: "" },
        { id: "kompaniya-10", name: "Казан кебаб баранина", price: "32 000 ₸", desc: "Рёбра баранины, картофель печёный, огурцы, помидоры, красный лук", img: "" },
        { id: "kompaniya-11", name: "Казан кебаб говядина", price: "30 000 ₸", desc: "Рёбра говядины, картофель печёный, огурцы, помидоры, красный лук", img: "" },
        { id: "kompaniya-12", name: "Сэт шашлыков", price: "22 000 ₸", desc: "Баранина люля, печень, куриное филе, утка, крылышки, дольки", img: "" },
        { id: "kompaniya-13", name: "Малое ведро Дары Морей", price: "18 500 ₸", desc: "", img: "" },
        { id: "kompaniya-14", name: "Ведро жареных креветок", price: "15 000 ₸", desc: "", img: "" },
        { id: "kompaniya-15", name: "Пивной сэт №1", price: "9 500 ₸", desc: "Гренки, сырные палочки, наггетсы, крылья, луковые кольца, 2 соуса", img: "" },
        { id: "kompaniya-16", name: "Пивной сэт №2", price: "7 990 ₸", desc: "Рипус, полоски щуки, плавники, фисташки, арахис, сухарики, чипсы, чечил", img: "" },
        { id: "kompaniya-17", name: "Пивной сэт №3", price: "7 300 ₸", desc: "Гренки, дольки, охотничьи колбаски, крылышки, курт, 2 соуса", img: "" },
        { id: "kompaniya-18", name: "Пивной сэт №4", price: "5 000 ₸", desc: "Наггетсы, чечил, гренки, фри, 2 соуса", img: "" },
      ]
    },

    /* ────────── ГАРНИРЫ ────────── */
    {
      id: "garniry",
      title: "Гарниры",          // название категории (рус)
      titleKz: "Гарнирлер",               // название категории (каз)
      subtitle: "К основным блюдам",          // подзаголовок (рус)
      subtitleKz: "Негізгі тағамдарға",            // подзаголовок (каз)
      items: [
        { id: "garniry-1", name: "Овощи гриль", price: "2 290 ₸", desc: "", img: "" },
        { id: "garniry-2", name: "Цветная капуста в кляре", price: "1 500 ₸", desc: "", img: "" },
        { id: "garniry-3", name: "Шампиньоны на мангале", price: "1 390 ₸", desc: "", img: "" },
        { id: "garniry-4", name: "Картофельное пюре", price: "1 090 ₸", desc: "", img: "" },
        { id: "garniry-5", name: "Рис припущенный", price: "1 090 ₸", desc: "", img: "" },
        { id: "garniry-6", name: "Рис с овощами", price: "1 090 ₸", desc: "", img: "" },
      ]
    },

    /* ────────── ДЕСЕРТЫ ────────── */
    {
      id: "deserty",
      title: "Десерты",          // название категории (рус)
      titleKz: "Десерттер",               // название категории (каз)
      subtitle: "Сладкий финал",          // подзаголовок (рус)
      subtitleKz: "Тәтті финал",            // подзаголовок (каз)
      items: [
        { id: "deserty-1", name: "Фруктовая нарезка", price: "4 500 ₸", desc: "Апельсин, яблоко, виноград, киви, груша", img: "" },
        { id: "deserty-2", name: "Пахлава", price: "1 900 ₸", desc: "", img: "" },
        { id: "deserty-3", name: "Чизкейк Нью-Йорк", price: "1 800 ₸", desc: "", img: "" },
        { id: "deserty-4", name: "Яблочный штрудель", price: "1 600 ₸", desc: "", img: "" },
        { id: "deserty-5", name: "Мороженое", price: "2 600 ₸", desc: "3 шарика", img: "" },
      ]
    },

    /* ────────── БАР ────────── */
    {
      id: "bar",
      title: "Бар",          // название категории (рус)
      titleKz: "Бар",               // название категории (каз)
      subtitle: "Крепкое, вино, коктейли",          // подзаголовок (рус)
      subtitleKz: "Күшті сусындар, шарап, коктейльдер",            // подзаголовок (каз)
      items: [
        { id: "bar-1", name: "Carlsberg", price: "1 500 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво бутылочное", groupKz: "Бөтелкедегі сыра" },
        { id: "bar-2", name: "Holsten", price: "1 500 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво бутылочное", groupKz: "Бөтелкедегі сыра" },
        { id: "bar-3", name: "Somersby", price: "1 500 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво бутылочное", groupKz: "Бөтелкедегі сыра" },
        { id: "bar-4", name: "Blanc 1664", price: "1 700 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво бутылочное", groupKz: "Бөтелкедегі сыра" },
        { id: "bar-5", name: "Hoegarden", price: "1 700 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво бутылочное", groupKz: "Бөтелкедегі сыра" },
        { id: "bar-6", name: "Heineken", price: "2 000 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво бутылочное", groupKz: "Бөтелкедегі сыра" },
        { id: "bar-7", name: "Corona EXTRA", price: "1 700 ₸", desc: "", img: "", note: "0,3 л", group: "Пиво бутылочное", groupKz: "Бөтелкедегі сыра" },
        { id: "bar-8", name: "Holsten", price: "1 300 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво разливное", groupKz: "Құйма сыра" },
        { id: "bar-9", name: "Carlsberg", price: "1 300 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво разливное", groupKz: "Құйма сыра" },
        { id: "bar-10", name: "Blanc 1664", price: "1 300 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво разливное", groupKz: "Құйма сыра" },
        { id: "bar-11", name: "Фирменное Moqqo", price: "1 100 ₸", desc: "", img: "", note: "0,5 л", group: "Пиво разливное", groupKz: "Құйма сыра" },
        { id: "bar-12", name: "Jim Beam Original", price: "1 500 / 15 000 ₸", desc: "", img: "", group: "Бурбон · 50 мл / 0,5 л", groupKz: "Бурбон · 50 мл / 0,5 л" },
        { id: "bar-13", name: "Jim Beam Double Oak", price: "1 900 / 19 000 ₸", desc: "", img: "", group: "Бурбон · 50 мл / 0,5 л", groupKz: "Бурбон · 50 мл / 0,5 л" },
        { id: "bar-14", name: "Jim Beam Red Stag", price: "1 800 / 18 000 ₸", desc: "", img: "", group: "Бурбон · 50 мл / 0,5 л", groupKz: "Бурбон · 50 мл / 0,5 л" },
        { id: "bar-15", name: "Jim Beam Apple", price: "1 800 / 25 200 ₸", desc: "", img: "", note: "бутылка 0,7 л", group: "Бурбон · 50 мл / 0,5 л", groupKz: "Бурбон · 50 мл / 0,5 л" },
        { id: "bar-16", name: "Jim Beam Honney", price: "1 800 / 25 200 ₸", desc: "", img: "", note: "бутылка 0,7 л", group: "Бурбон · 50 мл / 0,5 л", groupKz: "Бурбон · 50 мл / 0,5 л" },
        { id: "bar-17", name: "Jameson Original", price: "2 000 / 20 000 ₸", desc: "", img: "", group: "Виски · 50 мл / 0,5 л", groupKz: "Виски · 50 мл / 0,5 л" },
        { id: "bar-18", name: "Ballantines", price: "1 800 / 18 000 ₸", desc: "", img: "", group: "Виски · 50 мл / 0,5 л", groupKz: "Виски · 50 мл / 0,5 л" },
        { id: "bar-19", name: "Johnnie Walker Red Label", price: "2 200 / 22 000 ₸", desc: "", img: "", group: "Виски · 50 мл / 0,5 л", groupKz: "Виски · 50 мл / 0,5 л" },
        { id: "bar-20", name: "Johnnie Walker Black Label", price: "2 800 / 28 000 ₸", desc: "", img: "", group: "Виски · 50 мл / 0,5 л", groupKz: "Виски · 50 мл / 0,5 л" },
        { id: "bar-21", name: "Propeller Whiskey", price: "1 100 / 16 500 ₸", desc: "", img: "", group: "Виски · 50 мл / 0,5 л", groupKz: "Виски · 50 мл / 0,5 л" },
        { id: "bar-22", name: "Lambrusco Bianco", price: "12 000 ₸", desc: "", img: "", note: "белое п/сл 0,75", group: "Вино игристое", groupKz: "Ойнақы шарап" },
        { id: "bar-23", name: "Lambrusco Rosato", price: "12 000 ₸", desc: "", img: "", note: "розовое п/сл 0,75", group: "Вино игристое", groupKz: "Ойнақы шарап" },
        { id: "bar-24", name: "Lambrusco Rosso", price: "12 000 ₸", desc: "", img: "", note: "красное п/сл 0,75", group: "Вино игристое", groupKz: "Ойнақы шарап" },
        { id: "bar-25", name: "Prosecco DOC", price: "15 000 ₸", desc: "", img: "", note: "белое сухое 0,75", group: "Вино игристое", groupKz: "Ойнақы шарап" },
        { id: "bar-26", name: "Martini Asti", price: "15 000 ₸", desc: "", img: "", group: "Вино игристое", groupKz: "Ойнақы шарап" },
        { id: "bar-27", name: "SAKURA", price: "10 000 ₸", desc: "", img: "", group: "Вино игристое", groupKz: "Ойнақы шарап" },
        { id: "bar-28", name: "Carlo Rossi White", price: "8 000 ₸", desc: "", img: "", group: "Вино", groupKz: "Шарап" },
        { id: "bar-29", name: "Carlo Rossi Red", price: "8 000 ₸", desc: "", img: "", group: "Вино", groupKz: "Шарап" },
        { id: "bar-30", name: "Niko Pirosmani Алазанская б/пс", price: "9 000 ₸", desc: "", img: "", note: "0,75", group: "Вино", groupKz: "Шарап" },
        { id: "bar-31", name: "Niko Pirosmani Алазанская к/пс", price: "9 000 ₸", desc: "", img: "", note: "0,75", group: "Вино", groupKz: "Шарап" },
        { id: "bar-32", name: "Niko Pirosmani Саперави", price: "9 500 ₸", desc: "", img: "", note: "красное сухое 0,75", group: "Вино", groupKz: "Шарап" },
        { id: "bar-33", name: "Niko Pirosmani Цинандали", price: "9 500 ₸", desc: "", img: "", note: "белое сухое 0,75", group: "Вино", groupKz: "Шарап" },
        { id: "bar-34", name: "Aperol Spritz", price: "3 200 ₸", desc: "", img: "", group: "Коктейли", groupKz: "Коктейльдер" },
        { id: "bar-35", name: "Black Currant Spritz", price: "3 200 ₸", desc: "", img: "", group: "Коктейли", groupKz: "Коктейльдер" },
        { id: "bar-36", name: "Long Island Ice Tea", price: "3 000 ₸", desc: "", img: "", group: "Коктейли", groupKz: "Коктейльдер" },
        { id: "bar-37", name: "Pineapple Salt Caramel", price: "2 800 ₸", desc: "", img: "", group: "Коктейли", groupKz: "Коктейльдер" },
        { id: "bar-38", name: "Whiskey Sour · Gin Sour", price: "2 500 ₸", desc: "", img: "", group: "Коктейли", groupKz: "Коктейльдер" },
        { id: "bar-39", name: "Manhattan", price: "2 300 ₸", desc: "", img: "", group: "Коктейли", groupKz: "Коктейльдер" },
        { id: "bar-40", name: "Bloody Mary · Apple Tini", price: "2 300 ₸", desc: "", img: "", group: "Коктейли", groupKz: "Коктейльдер" },
        { id: "bar-41", name: "Smoked Negroni", price: "2 000 ₸", desc: "", img: "", group: "Коктейли", groupKz: "Коктейльдер" },
      ]
    },

    /* ────────── НАПИТКИ ────────── */
    {
      id: "napitki",
      title: "Напитки",          // название категории (рус)
      titleKz: "Сусындар",               // название категории (каз)
      subtitle: "Безалкогольное",          // подзаголовок (рус)
      subtitleKz: "Алкогольсіз",            // подзаголовок (каз)
      items: [
        { id: "napitki-1", name: "Вода TURAN 0,5", price: "700 ₸", desc: "", img: "", note: "газ/негаз, стекло", group: "Вода и напитки", groupKz: "Су және сусындар" },
        { id: "napitki-2", name: "Вода TURAN 1,0", price: "1 100 ₸", desc: "", img: "", note: "газ/негаз", group: "Вода и напитки", groupKz: "Су және сусындар" },
        { id: "napitki-3", name: "Вода Burabay 0,5", price: "1 800 ₸", desc: "", img: "", note: "лечебно-столовая", group: "Вода и напитки", groupKz: "Су және сусындар" },
        { id: "napitki-4", name: "Натуральный сок", price: "1 800 ₸", desc: "", img: "", group: "Вода и напитки", groupKz: "Су және сусындар" },
        { id: "napitki-5", name: "Pepsi 0,5", price: "900 ₸", desc: "", img: "", group: "Вода и напитки", groupKz: "Су және сусындар" },
        { id: "napitki-6", name: "Red Bull 0,25", price: "1 600 ₸", desc: "", img: "", group: "Вода и напитки", groupKz: "Су және сусындар" },
        { id: "napitki-7", name: "Морс клюквенный", price: "650 ₸", desc: "", img: "", group: "Морс домашний · 0,5 л", groupKz: "Үй морсы · 0,5 л" },
        { id: "napitki-8", name: "Морс чёрная смородина", price: "650 ₸", desc: "", img: "", group: "Морс домашний · 0,5 л", groupKz: "Үй морсы · 0,5 л" },
        { id: "napitki-9", name: "Острая Клубника", price: "2 300 ₸", desc: "", img: "", group: "Лимонады", groupKz: "Лимонадтар" },
        { id: "napitki-10", name: "Манго-Маракуйя", price: "2 400 ₸", desc: "", img: "", group: "Лимонады", groupKz: "Лимонадтар" },
        { id: "napitki-11", name: "Ежевично-Черничный", price: "2 400 ₸", desc: "", img: "", group: "Лимонады", groupKz: "Лимонадтар" },
        { id: "napitki-12", name: "Вишня с Гранатом", price: "2 400 ₸", desc: "", img: "", group: "Лимонады", groupKz: "Лимонадтар" },
        { id: "napitki-13", name: "Тропический", price: "2 500 ₸", desc: "", img: "", group: "Лимонады", groupKz: "Лимонадтар" },
        { id: "napitki-14", name: "Марокканский", price: "2 400 ₸", desc: "", img: "", group: "Авторский чай", groupKz: "Авторлық шай" },
        { id: "napitki-15", name: "Облепиха с базиликом", price: "2 500 ₸", desc: "", img: "", group: "Авторский чай", groupKz: "Авторлық шай" },
        { id: "napitki-16", name: "Малина с розмарином", price: "2 500 ₸", desc: "", img: "", group: "Авторский чай", groupKz: "Авторлық шай" },
        { id: "napitki-17", name: "Киота чай", price: "2 500 ₸", desc: "", img: "", group: "Авторский чай", groupKz: "Авторлық шай" },
        { id: "napitki-18", name: "Ташкентский", price: "2 400 ₸", desc: "", img: "", group: "Авторский чай", groupKz: "Авторлық шай" },
        { id: "napitki-19", name: "Каркаде", price: "2 400 ₸", desc: "", img: "", group: "Авторский чай", groupKz: "Авторлық шай" },
        { id: "napitki-20", name: "Пина Коллада", price: "2 000 ₸", desc: "", img: "", group: "Безалкогольные коктейли", groupKz: "Алкогольсіз коктейльдер" },
        { id: "napitki-21", name: "Мохито", price: "2 000 ₸", desc: "", img: "", group: "Безалкогольные коктейли", groupKz: "Алкогольсіз коктейльдер" },
        { id: "napitki-22", name: "Май Тай", price: "2 000 ₸", desc: "", img: "", group: "Безалкогольные коктейли", groupKz: "Алкогольсіз коктейльдер" },
        { id: "napitki-23", name: "Санрайз", price: "2 000 ₸", desc: "", img: "", group: "Безалкогольные коктейли", groupKz: "Алкогольсіз коктейльдер" },
        { id: "napitki-24", name: "Клюквейн", price: "2 000 ₸", desc: "", img: "", group: "Безалкогольные коктейли", groupKz: "Алкогольсіз коктейльдер" },
        { id: "napitki-25", name: "Классический", price: "1 800 ₸", desc: "", img: "", group: "Милк-шейки", groupKz: "Милкшейктер" },
        { id: "napitki-26", name: "Клубничный", price: "1 800 ₸", desc: "", img: "", group: "Милк-шейки", groupKz: "Милкшейктер" },
        { id: "napitki-27", name: "Шоколадный", price: "1 800 ₸", desc: "", img: "", group: "Милк-шейки", groupKz: "Милкшейктер" },
        { id: "napitki-28", name: "Банановый", price: "1 800 ₸", desc: "", img: "", group: "Милк-шейки", groupKz: "Милкшейктер" },
      ]
    },
  ]
};

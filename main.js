const quize_pages = [
    {
        name: "object",
        title: "Выберите тип объекта",
        progressTitle: 'Тип объекта',
        options: [
            {
                type: "radio",
                selected: false,
                name: "Квартира",
            },
            {
                type: "radio",
                selected: false,
                name: "Дом",
            },
            {
                type: "radio",
                selected: false,
                name: "Офис",
            },
            {
                type: "radio",
                selected: false,
                name: "Ресторан",
            },
            {
                type: "radio",
                selected: false,
                name: "Отель",
            },
            {
                type: "radio",
                selected: false,
                name: "Другое",
            },
        ],
    },
    {
        name: "room",
        title: "Выберите тип помещения",
        progressTitle: 'Тип помещения',
        options: [
            {
                type: "radio",
                selected: false,
                name: "Гостиная/Зал",
            },
            {
                type: "radio",
                selected: false,
                name: "Кухня",
            },
            {
                type: "radio",
                selected: false,
                name: "Спальня",
            },
            {
                type: "radio",
                selected: false,
                name: "Кабинет",
            },
            {
                type: "radio",
                selected: false,
                name: "Детская",
            },
            {
                type: "radio",
                selected: false,
                name: "Другое",
            },
        ],
    },
    {
        name: "curtain",
        title: "Выберите тип штор",
        progressTitle: 'Тип штор',
        options: [
            {
                type: "radio",
                selected: false,
                name: "Классические",
            },
            {
                type: "radio",
                selected: false,
                name: "Римские",
            },
            {
                type: "radio",
                selected: false,
                name: "С ламбрекеном",
            },
            {
                type: "radio",
                selected: false,
                name: "Австрийские",
            },
            {
                type: "radio",
                selected: false,
                name: "Французские",
            },
            {
                type: "radio",
                selected: false,
                name: "Нужна консультация",
            },
        ],
    },
    {
        name: "carnize",
        title: "Выберите тип карниза",
        progressTitle: 'Тип карниза',
        options: [
            {
                type: "radio",
                selected: false,
                name: "Декоративный",
            },
            {
                type: "radio",
                selected: false,
                name: "Электрический",
            },
            {
                type: "radio",
                selected: false,
                name: "Алюминиевый",
            },
            {
                type: "radio",
                selected: false,
                name: "Багетный",
            },
            {
                type: "radio",
                selected: false,
                name: "Уже купили",
            },
            {
                type: "radio",
                selected: false,
                name: "Нужна консультация",
            },
        ],
    },
    {
        name: "windows",
        title: "Количество окон, <br>чтобы рассчитать скидку",
        progressTitle: 'Количество окон',
        options: [
            {
                type: "radio",
                selected: false,
                name: "1",
            },
            {
                type: "radio",
                selected: false,
                name: "2",
            },
            {
                type: "radio",
                selected: false,
                name: "3",
            },
            {
                type: "radio",
                selected: false,
                name: "4",
            },
            {
                type: "radio",
                selected: false,
                name: "5+",
            },
        ],
    },
    {
        name: "contact",
        title: "Ваши контактные данные",
        progressTitle: 'Контакты',
        options: [
            {
                name: "quiz-name",
                type: "text",
                selected: false,
                value: "Имя",
            },
            {
                type: "phone",
                selected: false,
                name: "quiz-phone",
                value: "Телефон",
            },
        ],
    },
]

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.quiz-start')) {
            e.preventDefault();
            window.quiz = null;
            window.quiz = new Quiz(quize_pages);
        }
    })
})
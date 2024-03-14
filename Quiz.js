class Quiz {
    constructor(quize_pages) {
        this.quize_pages = quize_pages;
        this.page = 0;
        this.pageType = ''; // text or radio
        this.content = (index) => this.quize_pages[index];
        this.root = document.querySelector(".quiz-root");
        this.renderTemplate();
        this.start = document.querySelector(".quiz-start");
        this.error = document.querySelector(".quiz-page__error");
        this.state = {};
        this.init();
    }
    sendData() {
        const quizBody = document.querySelector(".quiz-body");
        quizBody.innerHTML = '<div class="quiz-page__loader"><span>Подождите, идет отправка...</span></div>';

        quizBody.innerHTML = '<div class="quiz-page__thankyou">Спасибо! Мы расчитаем стоимость по Вашим требованиям и сообщим результаты</div><div class="quiz-thankyou-close">Закрыть</div>';
    }
    back() {
        this.page--;
        this.render();
    }
    next() {
        if (this.pageType == 'radio') {
            const checked = document.querySelector('.quiz-page__option input:checked');
            
            if (checked !== null) {
                this.state[this.content(this.page).name] = checked.value;
                this.page++;
                this.render();
            } else {
                this.error.innerHTML = "Выберите что нибудь...";
            }
            return;
        }

        if (this.pageType == 'text' || this.pageType == 'phone') {
            const inputs = document.querySelectorAll('.quiz-page__option-input-text');
            let valid = true;
            inputs.forEach(input => {
                if (!valid) return;
                if (input.value == '') {
                    this.error.innerHTML = 'Заполните поле ' + input.placeholder;
                    valid = false;
                    return;
                } else {
                    this.state[input.name] = input.value;
                }
            });
            if (!valid) {
                return;
            }
            this.sendData();
        }
    }
    init() {
        this.root.classList.add('quiz-root__opened');
        this.opened = true;
        this.events();
        this.render();
    }
    events() {
        document.addEventListener('click', this.eventClose);
        document.addEventListener('click', this.eventBack);
        document.addEventListener('click', this.eventNext);
        document.addEventListener('keydown', this.eventNext);

    }
    removeEvents() {
        document.removeEventListener('click', this.eventClose);
        document.removeEventListener('click', this.eventBack);
        document.removeEventListener('click', this.eventNext);
        document.removeEventListener('keydown', this.eventNext);
    }
    eventNext(e) {
        if (e.target.closest('.quiz-next')) {
            e.preventDefault();
            window.quiz.next();
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            window.quiz.next();
        }
    }
    eventBack(e) {
        if (e.target.closest('.quiz-back')) {
            e.preventDefault();
            window.quiz.back();
        }
    }
    eventClose(e) {
        const selectorsToClose = ['.quiz-close', '.quiz-thankyou-close'];

        for (const selector of selectorsToClose) {
            if (e.target.closest(selector)) {
                e.preventDefault();
                window.quiz.close();
                return;
            }
        }
    }

    renderTemplate() {
        // Получаем содержимое шаблона
        const templateContent = document.getElementById('quiz-template').content;
        // Клонируем содержимое шаблона и добавляем его внутрь .quiz-root
        const clonedContent = templateContent.cloneNode(true);
        this.root.innerHTML = '';
        this.root.appendChild(clonedContent);
    }
    renderPoints() {
        const pointsWrapper = document.querySelector('.quiz-progress-points');
        const points = {};
        points.template = ``;
        points.template = `<div class="quiz-progress-points">`;
        this.quize_pages.forEach((item, index) => {
            if (item.options[0].type == 'text') return;

            points.template += `<div class="quiz-progress-point">`;
            points.template += `<span class="quiz-progress-point__number">${index + 1} шаг</span>`;
            points.template += `<span class="quiz-progress-point__caption">${item.progressTitle}</span>`;
            if (this.page > index) {
                points.template += `<div class="quiz-progress-point__dot active"></div>`;
            } else {
                points.template += `<div class="quiz-progress-point__dot"></div>`;
            }

            points.template += `</div>`;
        });
        points.template += `</div>`;
        pointsWrapper.innerHTML = '';
        pointsWrapper.insertAdjacentHTML('beforeend', points.template);
    }
    renderProgressLine() {
        const line = document.querySelector('.quiz-progress-line');
        const pageItemWidth = 100 / this.quize_pages.length;
        const lineWidth = pageItemWidth * (this.page + 1);

        line.style.width = lineWidth + '%';
    }
    renderPage() {
        if (this.page < 0) this.page = 0;
        const content = this.content(this.page);

        const pageTitle = document.querySelector('.quiz-page__title');
        pageTitle.innerHTML = content.title;

        const pageError = document.querySelector('.quiz-page__error');
        pageError.innerHTML = '';

        const pageOptions = document.querySelector('.quiz-page__options');
        let template = ``;
        content.options.forEach((item, index) => {
            if (item.type === 'radio') {
                template += `<div class="quiz-page__option">
        
                    <input id="${item.name}" type="${item.type}" name="${content.name}" value="${item.name}" >
                    <label for="${item.name}" class="quiz-page__option__name">
                        ${item.name}
                    </label>
                        
                </div>`;

            } else {
                template += `<input class="quiz-page__option-input-text" id="${item.name}" type="${item.type}" name="${item.name}" placeholder="${item.value}" >`;
            }
        });
        this.pageType = content.options[0].type;
        pageOptions.innerHTML = template;
    }
    render() {
        this.renderPoints();
        this.renderProgressLine();
        this.renderPage();
    }
    close() {
        this.removeEvents();
        this.root.classList.remove('quiz-root__opened');
    }
}

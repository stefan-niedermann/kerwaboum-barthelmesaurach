export class KerwaCountdownComponent extends HTMLTimeElement {

    #endDate;
    #interval;
    #kerwaStart;
    #dayOfKerwa;

    static get observedAttributes() {
        return ['datetime'];
    }

    get kerwaStart() {
        return this.#kerwaStart;
    }

    get dayOfKerwa() {
        return this.#dayOfKerwa;
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('id', 'timer');
        this.#startCountdown();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'datetime': {
                this.#startCountdown();
                break;
            }
        }
    }

    #startCountdown() {
        const now = new Date();
        this.#kerwaStart = new Date(Date.parse(this.getAttribute('datetime')))
        this.#endDate = this.#kerwaStart.getTime();

        if (this.#interval !== undefined) {
            clearInterval(this.#interval);
        }

        this.#interval = setInterval(this.#calculate, 1_000);
        this.#calculate();

        if (this.#kerwaStart.getMonth() === now.getMonth() &&
            now.getDate() >= this.#kerwaStart.getDate() &&
            now.getDate() <= this.#kerwaStart.getDate() + 5) {

            const weekdayKerwaday = new Map([[6, 2], [7, 3], [1, 4]]);
            this.#dayOfKerwa = weekdayKerwaday.get(now.getDay());

        } else {
            this.#dayOfKerwa = undefined;
        }

    }

    disconnectedCallback() {
        clearInterval(this.#interval);
    }

    // #getKerwaStart() {
    //     const currentYear = new Date().getFullYear();
    //     const date = new Date(currentYear, 8, 1, 12);
    //     let weekday = date.getDay();
    //     let dayDiff = weekday === 0 ? 7 : weekday;
    //     let lastSunday = date.setDate(date.getDate() - dayDiff - 7 - 2);
    //     return date;
    // }

    #calculate() {
        const now = new Date();
        let timeRemaining = parseInt((this.#endDate - now.getTime()) / 1_000);
        if (timeRemaining >= 0) {
            const days = parseInt(timeRemaining / 86_400);
            timeRemaining = (timeRemaining % 86_400);
            const hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining % 3_600);
            const minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);
            const seconds = parseInt(timeRemaining);

            let newText;
            if (days > 30) {
                newText = `Noch ${days} Tage`;
            } else if (days > 14) {
                newText = `Noch ${days} Tage, ${hours} Stunden`;
            } else if (days > 7) {
                newText = `Noch ${days} Tage, ${hours} Stunden, ${minutes} Minuten`;
            } else {
                newText = `Noch ${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;
            }


            this.#setText(now, newText);
        } else {
            // this.remove();
            this.#setText(now, '');
            clearInterval(this.#interval);
            return;
        }
    };

    #setText(now, newText) {
        if (this.textContent !== newText) {
            this.textContent = newText;
        }
        this.dataset.close = now.getMonth() === this.#kerwaStart.getMonth();
    }
}

customElements.define('kerwa-countdown', KerwaCountdownComponent, { extends: 'time' });
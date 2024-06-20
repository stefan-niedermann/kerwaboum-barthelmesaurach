export class KerwaCountdownComponent extends HTMLTimeElement {

    #endDate;
    #interval;
    #kerwaStart;

    constructor() {
        super();
        console.log('========================= CONSTRUCTOR ==========================');
    }

    connectedCallback() {
        console.log('========================= CONNECTED ==========================');

        // this.attachShadow({ mode: 'open' });
        // this.shadowRoot.appendChild(this.shadowRoot.content.cloneNode(true));

        this.setAttribute('id', 'timer');

        this.#kerwaStart = new Date(Date.parse(this.getAttribute('datetime')))

        this.#endDate = this.#kerwaStart.getTime();
        this.#interval = setInterval(this.#calculate, 1_000);

        this.#calculate();
    }

    disconnectedCallback() {
        console.log('========================= DISCONNECTED ==========================');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('========================= ATTRIBUTE CHANGED ==========================')
        console.log(name, oldValue, newValue);
    }

    #setText(now, newText) {
        if (this.shadowRoot.textContent !== newText) {
            this.shadowRoot.textContent = newText;
        }
        this.dataset.close = now.getMonth() === this.#kerwaStart.getMonth();
    }

    #getKerwaStart() {
        const currentYear = new Date().getFullYear();
        const date = new Date(currentYear, 8, 1, 12);
        let weekday = date.getDay();
        let dayDiff = weekday === 0 ? 7 : weekday;
        let lastSunday = date.setDate(date.getDate() - dayDiff - 7 - 2);
        return date;
    }

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
            this.remove();
            clearInterval(this.#interval);
            return;
        }
    };
}

customElements.define('kerwa-countdown', KerwaCountdownComponent, { extends: 'time' });
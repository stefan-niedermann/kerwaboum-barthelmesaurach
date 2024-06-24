export class KerwaCountdownComponent extends HTMLTimeElement {

    static get observedAttributes() {
        return ['datetime'];
    }

    #input = {
        end: undefined,
        remaining: undefined
    };

    #subscription;

    constructor() {
        super();
    }

    connectedCallback() {
        this.style.display = 'none';
        this.#setEnd(this.getAttribute('datetime'));
        this.#subscription = setInterval(this.#render.bind(this), 1_000);
    }

    attributeChangedCallback(name, _, newValue) {
        switch (name) {
            case 'datetime': {
                this.#setEnd(newValue);
                break;
            }
        }
    }

    disconnectedCallback() {
        clearInterval(this.#subscription);
    }

    #setEnd(newValue) {
        let end = undefined;
        let remaining = undefined;

        if (typeof newValue === 'string') {
            const newValueTimestamp = Date.parse(newValue);
            if (Number.isInteger(newValueTimestamp)) {
                end = newValueTimestamp;

                if (Number.isInteger(end)) {
                    const newRemainingSeconds = parseInt((end - new Date().getTime()) / 1_000);
                    if (Number.isInteger(newRemainingSeconds)) {
                        remaining = newRemainingSeconds;
                    }
                }
            }
        }

        this.#input = { ...this.#input, end, remaining }
    }

    #render() {
        let timeRemaining = this.#input.remaining;

        if (timeRemaining !== undefined && timeRemaining >= 0) {
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

            if (this.textContent !== newText) {
                this.textContent = newText;
            }

            this.style.display = 'unset';
        } else {
            this.style.display = 'none';
        }

        const endDate = Number.isInteger(this.#input.end) ? new Date(this.#input.end) : undefined;
        const now = new Date();
        const newClose = now.getMonth() === endDate.getMonth();
        if (this.dataset.close !== newClose) {
            this.dataset.close = newClose;
        }

        if (endDate.getMonth() === now.getMonth() &&
            now.getDate() >= endDate.getDate() &&
            now.getDate() <= endDate.getDate() + 5) {

            const weekdayKerwaday = new Map([[6, 2], [7, 3], [1, 4]]);
            this.dataset.currentDay = weekdayKerwaday.get(now.getDay());
        }
    }
}

customElements.define('kerwa-countdown', KerwaCountdownComponent, { extends: 'time' });
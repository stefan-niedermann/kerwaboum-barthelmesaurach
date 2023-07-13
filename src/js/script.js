try {
    document.addEventListener('DOMContentLoaded', () => {
        const timer = document.createElement('div');
        timer.setAttribute('id', 'timer');
        document.querySelector('header').appendChild(timer);

        const getKerwaStart = () => {
            const currentYear = new Date().getFullYear();
            const date = new Date(currentYear, 8, 1, 12);
            let weekday = date.getDay();
            let dayDiff = weekday === 0 ? 7 : weekday;
            let lastSunday = date.setDate(date.getDate() - dayDiff - 7 - 2);
            return date;
        }


        const kerwaStart = getKerwaStart();
        const now = new Date();

        if (kerwaStart.getMonth() === now.getMonth() &&
            now.getDate() >= kerwaStart.getDate() &&
            now.getDate() <= kerwaStart.getDate() + 5) {

            const weekdayKerwaday = new Map([[6, 2], [7, 3], [1, 4]]);
            const targetDayElementNumber = weekdayKerwaday.get(now.getDay());

            if (targetDayElementNumber !== undefined) {
                const targetDayElement = document.querySelector(`#timetable article:nth-child(${targetDayElementNumber})`);
                document.querySelector(`#timetable div`).scrollLeft = targetDayElement.offsetLeft;
            }
        }

        const endDate = kerwaStart.getTime();
        const interval = setInterval(calculate, 1_000);
        function calculate() {
            const now = new Date();
            let timeRemaining = parseInt((endDate - now.getTime()) / 1000);
            if (timeRemaining >= 0) {
                const days = parseInt(timeRemaining / 86_400);
                timeRemaining = (timeRemaining % 86_400);
                const hours = parseInt(timeRemaining / 3600);
                timeRemaining = (timeRemaining % 3_600);
                const minutes = parseInt(timeRemaining / 60);
                timeRemaining = (timeRemaining % 60);
                const seconds = parseInt(timeRemaining);
                if (days > 30) {
                    timer.innerText = `Noch ${days} Tage`;
                } else if (days > 14) {
                    timer.innerText = `Noch ${days} Tage, ${hours} Stunden`;
                } else if (days > 7) {
                    timer.innerText = `Noch ${days} Tage, ${hours} Stunden, ${minutes} Minuten`;
                } else {
                    timer.innerText = `Noch ${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;
                }
                timer.dataset.close = now.getMonth() === kerwaStart.getMonth();
            } else {
                timer.remove();
                clearInterval(interval);
                return;
            }
        };
        calculate();
    });
} catch (e) {
    console.error(e);
}

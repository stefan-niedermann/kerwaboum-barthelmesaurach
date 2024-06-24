'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const date = new Date(new Date().getFullYear(), 8, 1, 12);
    const weekday = date.getDay();
    const dayDiff = weekday === 0 ? 7 : weekday;
    date.setDate(date.getDate() - dayDiff - 7 - 2);

    const kerwaCountdown = document.querySelector('time');
    kerwaCountdown.setAttribute('datetime', date.toISOString());
    if (kerwaCountdown.dayOfKerwa !== undefined) {
        const targetDayElement = document.querySelector(`#timetable article:nth-child(${kerwaCountdown.dayOfKerwa})`);
        document.querySelector(`#timetable div`).scrollLeft = targetDayElement.offsetLeft;
    }
});
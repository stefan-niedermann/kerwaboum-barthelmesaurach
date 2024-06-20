'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const now = new Date();
    const date = new Date(now.getFullYear(), 8, 1, 12);
    const weekday = date.getDay();
    const dayDiff = weekday === 0 ? 7 : weekday;
    date.setDate(date.getDate() - dayDiff - 7 - 2);

    document.querySelector('time').setAttribute('datetime', date.toISOString());

    if (this.#kerwaStart.getMonth() === now.getMonth() &&
        now.getDate() >= this.#kerwaStart.getDate() &&
        now.getDate() <= this.#kerwaStart.getDate() + 5) {

        const weekdayKerwaday = new Map([[6, 2], [7, 3], [1, 4]]);
        const targetDayElementNumber = weekdayKerwaday.get(now.getDay());

        if (targetDayElementNumber !== undefined) {
            const targetDayElement = document.querySelector(`#timetable article:nth-child(${targetDayElementNumber})`);
            document.querySelector(`#timetable div`).scrollLeft = targetDayElement.offsetLeft;
        }
    }
});
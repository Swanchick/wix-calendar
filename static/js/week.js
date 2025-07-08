"use strict";
class Week {
    constructor(date, eventManager) {
        this.weekNamesContainer = document.getElementById(WEEK_NAMES_CONTAINER_ID);
        this.weekDatesContainer = document.getElementById(WEEK_DATES_ID);
        this.dayContainer = document.getElementById(DAYS_CONTAINER_ID);
        this.date = date;
        this.eventManager = eventManager;
    }
    build(date) {
        this.date = date;
        const currentDayInWeek = this.date.getDay();
        this.buildWeekNames(currentDayInWeek);
        console.log(date);
        const weekDays = this.getWeek(this.date);
        for (const weekDay of weekDays) {
            console.log(weekDay.getDate());
            console.log(weekDay.getMonth());
            console.log(weekDay.getFullYear());
            console.log("==========");
        }
        this.buildWeekDays(this.date, weekDays);
        this.buildDays(currentDayInWeek, weekDays);
    }
    buildWeekNames(currentDayInWeek) {
        var _a;
        if (this.weekNamesContainer === null) {
            return;
        }
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const weekNameElement = this.createWeekNameElement(i, currentDayInWeek);
            (_a = this.weekNamesContainer) === null || _a === void 0 ? void 0 : _a.appendChild(weekNameElement);
        }
    }
    buildWeekDays(date, weekDays) {
        if (this.weekDatesContainer === null) {
            return;
        }
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            let dayInMonth = weekDays[i];
            let dayElement = this.createWeekDayElement(dayInMonth.getDate(), i, date.getDay());
            this.weekDatesContainer.appendChild(dayElement);
        }
    }
    buildDays(currentDayInWeek, weekDays) {
        if (this.dayContainer === null) {
            return;
        }
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const isCurrentDay = i === currentDayInWeek;
            const isLastDay = i === DAYS_IN_WEEK - 1;
            const day = this.createDayElement(isCurrentDay, isLastDay);
            const events = this.eventManager.getTodayEvents(weekDays[i]);
            if (events !== undefined) {
                for (const eventStorage of events) {
                    const event = WixEvent.fromStorage(eventStorage);
                    const element = event.element;
                    element.onclick = (_) => {
                        this.eventManager.openDetails(event);
                    };
                    day.appendChild(element);
                }
            }
            this.dayContainer.appendChild(day);
        }
    }
    clearAll() {
        const weekNamesContainer = this.weekNamesContainer;
        if (weekNamesContainer === null) {
            return;
        }
        for (const child of weekNamesContainer.children) {
            weekNamesContainer.removeChild(child);
        }
        const weekDatesContainer = this.weekDatesContainer;
        if (weekDatesContainer === null) {
            return;
        }
        for (const child of weekDatesContainer.children) {
            weekNamesContainer.removeChild(child);
        }
        const dayContainer = this.dayContainer;
        if (dayContainer === null) {
            return;
        }
        for (const child of dayContainer.children) {
            dayContainer.removeChild(child);
        }
    }
    getWeek(date) {
        const days = [];
        const year = date.getFullYear();
        const month = date.getMonth();
        const currentDayInMonth = date.getDate();
        const currentDayInWeek = date.getDay();
        const currentMonth = MONTHS[month];
        const firstDay = currentDayInMonth - currentDayInWeek;
        const prevMonth = this.getPreviousMonth(currentMonth);
        const prevYear = year - 1;
        const prevMonthDays = prevMonth.getDays((prevMonth.position === 11) ? prevYear : year);
        const nextMonth = this.getNextMonth(currentMonth);
        const nextYear = year + 1;
        const nextMonthDays = nextMonth.getDays((nextMonth.position === 0) ? nextYear : year);
        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            let actualDay = firstDay + i;
            let actualMonth = month;
            let actualYear = year;
            if (actualDay < 1) {
                actualDay = prevMonthDays - Math.abs(actualDay);
                actualMonth = prevMonth.position;
                if (prevMonth.position === 11) {
                    actualYear = prevYear;
                }
            }
            if (actualDay > currentMonth.getDays(year)) {
                actualDay = (actualDay % nextMonthDays) + 1;
                actualMonth = nextMonth.position;
                if (nextMonth.position === 0) {
                    actualYear = nextYear;
                }
            }
            days.push(new Date(actualYear, actualMonth, actualDay));
        }
        return days;
    }
    createElementForWeek(day, currentDay) {
        const element = document.createElement("h2");
        if (day !== DAYS_IN_WEEK - 1) {
            element.classList.add("right-border");
        }
        if (day === currentDay) {
            element.classList.add("current-day");
        }
        return element;
    }
    createWeekDayElement(day, weekIndex, currentDayInWeekend) {
        const element = this.createElementForWeek(weekIndex, currentDayInWeekend);
        const textNode = document.createTextNode(day.toString());
        element.appendChild(textNode);
        return element;
    }
    createWeekNameElement(day, currentDay) {
        const element = this.createElementForWeek(day, currentDay);
        const currentDayName = DAY_NAMES[day];
        const textNode = document.createTextNode(currentDayName);
        element.appendChild(textNode);
        return element;
    }
    createDayElement(currentDay, lastDay) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day-container");
        if (!lastDay) {
            dayElement.classList.add("right-border");
        }
        const timeElements = this.createTimeElements();
        for (const timeElement of timeElements) {
            dayElement.appendChild(timeElement);
        }
        if (currentDay) {
            const arrowElement = this.createArrow();
            dayElement.appendChild(arrowElement);
        }
        return dayElement;
    }
    createArrow() {
        const arrowElement = document.createElement("div");
        arrowElement.id = ARROW_ID;
        return arrowElement;
    }
    createTimeElements() {
        const timeElements = [];
        let currentDayPart = "am";
        for (let i = 0; i < HOURS_IN_DAY; i++) {
            if (i > 11) {
                currentDayPart = "pm";
            }
            let number = i % 12;
            if (number === 0) {
                number = 12;
            }
            const element = document.createElement("h2");
            element.classList.add("hour-marker");
            const finalTimeText = `${number} ${currentDayPart}`;
            const textNode = document.createTextNode(finalTimeText);
            element.appendChild(textNode);
            timeElements.push(element);
        }
        return timeElements;
    }
    getNextMonth(month) {
        const nextMonth = month.position + 1;
        if (nextMonth > 11) {
            return MONTHS[0];
        }
        return MONTHS[nextMonth];
    }
    getPreviousMonth(month) {
        const previousMonth = month.position - 1;
        if (previousMonth < 0) {
            return MONTHS[ALL_MONTHS - 1];
        }
        return MONTHS[previousMonth];
    }
}

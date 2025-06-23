class Week {
    #weekNamesContainer;
    #weekDatesContainer;
    #dayContainer;
    #dayElements;

    constructor() {
        this.#weekNamesContainer = document.getElementById(WEEK_NAMES_CONTAINER);
        this.#weekDatesContainer = document.getElementById(WEEK_DATES_ID);
        this.#dayContainer = document.getElementById(DAYS_CONTAINER_ID);
        this.#dayElements = [];
    }

    build(today) {
        const currentDayInWeek = today.getDay();
        const currentDayInMonth = today.getDate();

        this.#buildWeekNames(currentDayInWeek);
        this.#buildWeekDays(currentDayInMonth, currentDayInWeek);
        this.#buildDays(currentDayInWeek);
        
    }

    #buildWeekNames(currentDayInWeek) {
        if (this.#weekNamesContainer == null) {
            return;
        }

        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const weekNameElement = this.#createWeekNameElement(i, currentDayInWeek);
            this.#weekNamesContainer.appendChild(weekNameElement);
        }
    }

    #buildWeekDays(currentDayInMonth, currentDayInWeek) {
        if (this.#weekDatesContainer == null) {
            return;
        }
        
        const firstDay = currentDayInMonth - currentDayInWeek;

        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const dayInMonth = firstDay + i;

            const dayElement = this.#createWeekDayElement(dayInMonth, i, currentDayInWeek);
            this.#weekDatesContainer.appendChild(dayElement);
        }
    }

    #buildDays(currentDayInWeek) {
        if (this.#dayContainer == null) {
            return;
        }

        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const isCurrentDay = i == currentDayInWeek;
            const isLastDay = i == DAYS_IN_WEEK - 1;
            const day = this.#createDayElement(isCurrentDay, isLastDay);

            this.#dayContainer.appendChild(day);
            this.#dayElements.push(day);
        }
    }

    #createElementForWeek(day, currentDay) {
        const element = document.createElement("h2");
        
        if (day != DAYS_IN_WEEK - 1) {
            element.classList.add("right-border");
        }

        if (day == currentDay) {
            element.classList.add("current-day");
        }

        return element;
    }

    #createWeekDayElement(day, weekIndex, currentDayInWeek) {
        const element = this.#createElementForWeek(weekIndex, currentDayInWeek);
        const textNode = document.createTextNode(day.toString());

        element.appendChild(textNode);

        return element;
    }

    #createWeekNameElement(day, currentDay) {
        const element = this.#createElementForWeek(day, currentDay);
        
        const currentDayName = DAY_NAMES[day];
        const textNode = document.createTextNode(currentDayName);
        element.appendChild(textNode);

        return element;
    }

    #createArrowElement() {
        const arrowElement = document.createElement("div");
        arrowElement.id = ARROW_ID;

        return arrowElement;
    }

    #createDayElement(currentDay, lastDay) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day-container");
        if (!lastDay) {
            dayElement.classList.add("right-border");
        }

        const timeElements = this.#createTimeElements();
        
        timeElements.forEach((element) => {
            dayElement.appendChild(element);
        });

        if (currentDay) {
            const arrowElement = this.#createArrowElement();
            dayElement.appendChild(arrowElement);
        }

        return dayElement;
    }

    #createTimeElements() {
        const HOURS = 24;

        const timeElements = [];
        let currentDayPart = "am";

        for (let i = 0; i < HOURS; i++) {
            if (i > 11) {
                currentDayPart = "pm";
            }

            let number = i % 12;
            if (number == 0) {
                number = 12;
            }

            const element = document.createElement("h2");
            element.classList.add("hour-marker");

            let finalTimeText = `${number} ${currentDayPart}`;
            const textNode = document.createTextNode(finalTimeText);

            element.appendChild(textNode);

            timeElements.push(element);
        }

        return timeElements;
    }

    #isLeapYear(year) {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

    #getFebruaryDays(year) {
        return this.#isLeapYear ? 29 : 28;
    }

    #getCurrentMonthDays(year, currentMonth) {
        const days = MONTHS[currentMonth];

        const isFebruary = days == 0;
        if (isFebruary) {
            return this.#getFebruaryDays(year);
        }

        return days;
    }

    #getPreviousMonth(month) {
        const prevMonth = month - 1;

        if (prevMonth < 0) {
            return ALL_MONTHS - 1;
        }

        return prevMonth;
    }
}
class Week {
    #weekNamesContainer;
    #weekDatesContainer;
    #dayContainer;
    #dayElements;

    #eventManager;

    constructor(eventManager) {
        this.#weekNamesContainer = document.getElementById(WEEK_NAMES_CONTAINER);
        this.#weekDatesContainer = document.getElementById(WEEK_DATES_ID);
        this.#dayContainer = document.getElementById(DAYS_CONTAINER_ID);
        this.#dayElements = [];

        this.#eventManager = eventManager;
    }

    build(today) {
        const year = today.getFullYear();
        const month = today.getMonth();
        const currentDayInWeek = today.getDay();
        const currentDayInMonth = today.getDate();

        this.#buildWeekNames(currentDayInWeek);
        const weekDays = this.#buildWeekDays(year, month, currentDayInMonth, currentDayInWeek);
        this.#buildDays(currentDayInWeek, weekDays);
        
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

    #buildWeekDays(year, month, currentDayInMonth, currentDayInWeek) {
        if (this.#weekDatesContainer == null) {
            return;
        }
        
        const weekDays = this.#getWeek(year, month, currentDayInMonth, currentDayInWeek);

        for (let i = 0; i < weekDays.length; i++) {
            let dayInMonth = weekDays[i];

            const dayElement = this.#createWeekDayElement(dayInMonth.getDate(), i, currentDayInWeek);
            this.#weekDatesContainer.appendChild(dayElement);
        }

        return weekDays;
    }

    #buildDays(currentDayInWeek, weekDays) {
        if (this.#dayContainer == null) {
            return;
        }

        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const isCurrentDay = i == currentDayInWeek;
            const isLastDay = i == DAYS_IN_WEEK - 1;
            const day = this.#createDayElement(isCurrentDay, isLastDay);
            
            const events = this.#eventManager.getTodayEvents(weekDays[i]);
            if (events !== undefined) {
                events.forEach((e) => {
                    const element = e.createElement();
                    element.onclick = (_) => {
                        this.#eventManager.openDetails(e);
                    }

                    day.appendChild(element);
                });
            }

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

    #getWeek(year, month, currentDayInMonth, currentDayInWeek) {
        const days = [];

        const currentMonthDays = this.#getMonthDays(year, month);

        const firstDay = currentDayInMonth - currentDayInWeek;
        const prevMonth = this.#getPreviousMonth(month);
        const prevYear = year - 1;

        console.log(prevMonth);
        const prevMonthDays = this.#getMonthDays((prevMonth === 11) ? prevYear : year, prevMonth);

        const nextMonth = this.#getNextMonth(month);
        const nextYear = year + 1;
        const nextMonthDays = this.#getMonthDays((nextMonth === 0) ? nextYear : year, nextMonth);


        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            let actualDay = firstDay + i;
            let actualMonth = month;
            let actualYear = year;

            if (actualDay < 1) {
                actualDay = prevMonthDays - Math.abs(actualDay);
                actualMonth = prevMonth;
                
                if (prevMonth === 11) {
                    actualYear = prevYear;
                }
            }

            if (actualDay > currentMonthDays) {
                actualDay = (actualDay % nextMonthDays) + 1;
                actualMonth = nextMonth;

                if (nextMonth === 0) {
                    actualYear = nextYear;
                }
            }

            days.push(new Date(actualYear, actualMonth, actualDay));
        }

        return days;
    }

    #isLeapYear(year) {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }

    #getFebruaryDays(year) {
        return this.#isLeapYear(year) ? 29 : 28;
    }

    #getMonthDays(year, currentMonth) {
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

    #getNextMonth(month) {
        const nextMonth = month + 1;
        if (month > 11) {
            return 0;
        }

        return nextMonth;
    }
}
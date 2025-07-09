class Week {
    private weekNamesContainer: HTMLElement | null = document.getElementById(WEEK_NAMES_CONTAINER_ID);
    private weekDatesContainer: HTMLElement | null = document.getElementById(WEEK_DATES_ID);
    private dayContainer: HTMLElement | null = document.getElementById(DAYS_CONTAINER_ID);
    private date: Date;

    private eventManager: EventManager;

    constructor(date: Date, eventManager: EventManager) {
        this.date = date;
        this.eventManager = eventManager;
    }

    build(date: Date) {
        this.date = date;
        const currentDayInWeek = this.date.getDay();

        this.buildWeekNames(currentDayInWeek);

        const weekDays = this.getWeek(this.date);

        this.buildWeekDays(this.date, weekDays);
        this.buildDays(currentDayInWeek, weekDays);
    }

    private buildWeekNames(currentDayInWeek: number) {
        if (this.weekNamesContainer === null) {
            return;
        }

        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const weekNameElement = this.createWeekNameElement(i, currentDayInWeek);
            this.weekNamesContainer?.appendChild(weekNameElement);
        }
    }

    private buildWeekDays(date: Date, weekDays: Array<Date>) {
        if (this.weekDatesContainer === null) {
            return;
        }

        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            let dayInMonth = weekDays[i];

            let dayElement = this.createWeekDayElement(dayInMonth.getDate(), i, date.getDay());
            this.weekDatesContainer!.appendChild(dayElement);
        }
    }

    private buildDays(currentDayInWeek: number, weekDays: Array<Date>) {
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

            this.dayContainer!.appendChild(day);
        }
    }

    clearAll() {
        const weekNamesContainer = this.weekNamesContainer;
        if (weekNamesContainer === null) {
            return;
        }

        const weekNamesChildren: Array<Element> = Array.from(weekNamesContainer.children);

        for (const child of weekNamesChildren) {
            weekNamesContainer.removeChild(child);
        }

        const weekDatesContainer = this.weekDatesContainer;
        if (weekDatesContainer === null) {
            return;
        }

        const weekDatesChildren: Array<Element> = Array.from(weekDatesContainer.children);

        for (const child of weekDatesChildren) {
            console.log(child);
            weekDatesContainer.removeChild(child);
        }

        const dayContainer = this.dayContainer;
        if (dayContainer === null) {
            return;
        }

        const dayChildren: Array<Element> = Array.from(dayContainer.children);

        for (const child of dayChildren) {
            dayContainer.removeChild(child);
        }
    }

    private getWeek(date: Date): Array<Date> {
        const days: Array<Date> = [];

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

    private createElementForWeek(day: number, currentDay: number): HTMLElement {
        const element = document.createElement("h2");

        if (day !== DAYS_IN_WEEK - 1) {
            element.classList.add("right-border");
        }

        if (day === currentDay) {
            element.classList.add("current-day");
        }

        return element;
    }

    private createWeekDayElement(day: number, weekIndex: number, currentDayInWeekend: number): HTMLElement {
        const element = this.createElementForWeek(weekIndex, currentDayInWeekend);
        const textNode = document.createTextNode(day.toString());

        element.appendChild(textNode);

        return element;
    }

    private createWeekNameElement(day: number, currentDay: number): HTMLElement {
        const element = this.createElementForWeek(day, currentDay);
        
        const currentDayName = DAY_NAMES[day];
        const textNode = document.createTextNode(currentDayName);
        element.appendChild(textNode);

        return element;
    }

    private createDayElement(currentDay: boolean, lastDay: boolean): HTMLElement {
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

    private createArrow(): HTMLElement {
        const arrowElement = document.createElement("div");
        arrowElement.id = ARROW_ID;

        return arrowElement;
    }

    private createTimeElements(): Array<HTMLElement> {
        const timeElements: Array<HTMLElement> = [];
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

    private getNextMonth(month: Month): Month {
        const nextMonth = month.position + 1;
        if (nextMonth > 11) {
            return MONTHS[0];
        }

        return MONTHS[nextMonth];
    }

    private getPreviousMonth(month: Month): Month {
        const previousMonth = month.position - 1;
        if (previousMonth < 0) {
            return MONTHS[ALL_MONTHS - 1];
        }

        return MONTHS[previousMonth];
    }
}

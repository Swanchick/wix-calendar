

class Week {
    #weekDatesContainer;
    #dayContainer;
    #dayElements;

    constructor() {
        this.#weekDatesContainer = document.getElementById(WEEK_DATES_ID);
        this.#dayContainer = document.getElementById(DAYS_CONTAINER_ID);
        this.#dayElements = [];
    }

    build(today) {
        const currentDayInWeek = today.getDay();
        const currentDayInMonth = today.getDate();

        if (this.#dayContainer == null) {
            return;
        }

        for (let i = 0; i < 7; i++) {
            const isCurrentDay = i == currentDayInWeek;
            const day = this.#createDayElement(isCurrentDay);

            this.#dayContainer.appendChild(day);
            this.#dayElements.push(day);
        }
    }

    #createArrowElement() {
        const arrowElement = document.createElement("div");
        arrowElement.id = ARROW_ID;

        return arrowElement;
    }

    #createDayElement(currentDay) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day-container");
        dayElement.classList.add("right-border");

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
}
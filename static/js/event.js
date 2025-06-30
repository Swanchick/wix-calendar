class Event {
    #title;
    #description;
    #startDate;
    #endTime;
    
    constructor(title, description, startDate, endTime) {
        this.#title = title;
        this.#description = description;
        this.#startDate = startDate;
        this.#endTime = endTime;
    }

    getTitle() {
        return this.#title;
    }

    getDescription() {
        return this.#description;
    }

    getStartDate() {
        return this.#startDate;
    }

    getEndTime() {
        return this.#endTime;
    }

    getTimeStartAndEnd() {
        let startHours = this.#startDate.getHours();
        let startHoursStr = String(startHours).padStart(2, "0");

        let startMinutes = this.#startDate.getMinutes();
        let startMinutesStr = String(startMinutes).padStart(2, "0");

        let endHours = this.#endTime.getHours();
        let endHoursStr = String(endHours).padStart(2, "0");
        
        let endMinutes = this.#endTime.getMinutes();
        let endMinutesStr = String(endMinutes).padStart(2, "0");

        return `${startHoursStr}:${startMinutesStr} - ${endHoursStr}:${endMinutesStr}`;
    }

    createElement() {
        let element = document.createElement("button");

        let titleElement = document.createElement("p");
        let title = document.createTextNode(this.#title);
        titleElement.appendChild(title);

        titleElement.classList.add("event-panel-title");

        let timeElement = document.createElement("p");
        let time = document.createTextNode(this.getTimeStartAndEnd());
        timeElement.appendChild(time);

        timeElement.classList.add("event-panel-time");

        element.appendChild(titleElement);
        element.appendChild(timeElement);

        element.classList.add("event-mark");

        const startInPercentage = getCurrentSecondsInPercentage(this.#startDate);
        const endInPercentage = getCurrentSecondsInPercentage(this.#endTime);

        element.style.top = `${startInPercentage}%`;
        element.style.height = `${endInPercentage - startInPercentage}%`;

        return element;
    }
}
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
}
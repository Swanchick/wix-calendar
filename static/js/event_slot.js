class EventSlot {
    #date;
    #event;

    constructor(date, event) {
        this.#date = date;
        this.#event = event;
    }

    isToday(date) {
        return this.#date == date;
    }

    getEvent() {
        return this.#event;
    }
}

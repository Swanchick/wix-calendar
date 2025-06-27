


class EventManager {
    #events;
    
    constructor() {
        this.#events = [];
    }

    #dateToKey(date) {
        return `${startDate.getFullYear()}:${startDate.getMonth()}:${startDate.getDate()}`;
    }
    
    addEvent(event) {
        const startDate = event.getStartDate();
        const startDateString = this.#dateToKey(startDate);

        const eventSlot = new EventSlot(startDateString, event);

        this.#events.push(eventSlot);
    }

    getTodayEvents(date) {
        let events = [];
        
        const dayString = this.#dateToKey(date);

        this.#events.forEach((eventSlot) => {
            if (eventSlot.isToday(dayString)) {
                events.push(eventSlot.getEvent());
            }
        });

        return events;
    }
}
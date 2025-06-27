class EventManager {
    #eventWindow;
    #eventButton;

    #windowActive;
    #createButton;
    #closeButton;

    #events;
    
    constructor() {
        this.#windowActive = false;
        
        this.#eventWindow = document.getElementById(EVENT_WINDOW_ID);
        this.#eventButton = document.getElementById(OPEN_EVENT_WINDOW_ID);

        this.#createButton = document.getElementById(CREATE_EVENT_BUTTON);
        this.#closeButton = document.getElementById(CLOSE_EVENT_BUTTON);

        this.#createButton.onclick = (e) => {
            e.preventDefault();

            if (this.#windowActive) {
                this.#closeWindow();
            }
        }

        this.#closeButton.onclick = (e) => {
            e.preventDefault();

            if (this.#windowActive) {
                this.#closeWindow();
            }
        }
        
        this.#eventButton.onclick = (_) => {
            if (this.#windowActive) {
                this.#closeWindow();
            } else {
                this.#openWindow();
            }
        }

        this.#events = [];
    }

    #openWindow() {
        this.#eventWindow.classList.remove("hidden");
        this.#windowActive = true;
    }

    #closeWindow() {
        this.#eventWindow.classList.add("hidden");
        this.#windowActive = false;
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
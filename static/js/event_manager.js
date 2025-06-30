const WINDOW_STATE = {
    CLOSED: 0,
    FORM: 1,
    DETAILS: 2
}


class EventManager {
    #eventWindow;
    #eventForm;
    #eventDetails;
    #eventButton;
    #createButton;
    #closeButton;

    #windowState;

    #events;
    
    constructor() {
        this.#windowState = WINDOW_STATE.CLOSED;
        
        this.#eventWindow = document.getElementById(EVENT_WINDOW_ID);
        this.#eventButton = document.getElementById(OPEN_EVENT_WINDOW_ID);

        this.#createButton = document.getElementById(CREATE_EVENT_BUTTON);
        this.#closeButton = document.getElementById(CLOSE_EVENT_BUTTON);

        this.#eventForm = document.getElementById(EVENT_FORM_ID);
        this.#eventDetails = document.getElementById(EVENT_DETAILS_ID);

        this.#createButton.onclick = (e) => {
            e.preventDefault();

            if (this.#windowState != WINDOW_STATE.CLOSED) {
                this.#closeWindow();
            }
        }

        this.#closeButton.onclick = (e) => {
            e.preventDefault();

            if (this.#windowState != WINDOW_STATE.CLOSED) {
                this.#closeWindow();
            }
        }
        
        this.#eventButton.onclick = (_) => {
            if (this.#windowState == WINDOW_STATE.CLOSED) {
                this.#openForm("asda");
            } else {
                this.#closeWindow();
            }
        }

        this.#events = [];
    }

    #openForm() {
        this.#eventWindow.classList.remove("hidden");
        this.#eventForm.classList.remove("hidden");

        this.#windowState = WINDOW_STATE.FORM;
    }

    openDetails(dateKey) {
        this.#eventWindow.classList.remove("hidden");
        this.#eventDetails.classList.remove("hidden");

        this.#windowState = WINDOW_STATE.DETAILS;
    }

    #closeWindow() {
        if (!this.#eventForm.classList.contains("hidden")) {
            this.#eventForm.classList.add("hidden");
        }

        if (!this.#eventDetails.classList.contains("hidden")) {
            this.#eventForm.classList.add("hidden");
        }

        this.#eventWindow.classList.add("hidden");

        this.#windowState = WINDOW_STATE.CLOSED;
    }

    dateToKey(date) {
        return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`;
    }
    
    addEvent(event) {
        const startDate = event.getStartDate();
        const startDateString = this.dateToKey(startDate);

        const eventSlot = new EventSlot(startDateString, event);

        this.#events.push(eventSlot);
    }

    getTodayEvents(date) {
        let events = [];
        
        const dayString = this.dateToKey(date);

        this.#events.forEach((eventSlot) => {
            if (eventSlot.isToday(dayString)) {
                events.push(eventSlot.getEvent());
            }
        });

        return events;
    }
}
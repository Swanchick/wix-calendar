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
                const validationResult = this.#validateForm();

                if (validationResult) {
                    this.#closeWindow();
                }
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

        this.#events = {};
    }

    #openForm() {
        this.#eventWindow.classList.remove("hidden");
        this.#eventForm.classList.remove("hidden");

        this.#windowState = WINDOW_STATE.FORM;
    }

    #validateForm() {
        let isValid = true;
        
        const formTitle = document.getElementById(FORM_TITLE_ID);
        const formTitleWarning = document.getElementById(FORM_TITLE_WARNING_ID);

        if (formTitle.value == "") {
            formTitleWarning.classList.remove("hidden");
            
            isValid = false;
        }

        console.log("Title: ");
        console.log(formTitle.value);

        const formDescription = document.getElementById(FORM_DESCRIPTION_ID);
        const formDescriptionWarning = document.getElementById(FORM_DESCRIPTION_WARNING_ID);

        if (formDescription.value == "") {
            formDescriptionWarning.classList.remove("hidden");

            isValid = false;
        }

        console.log("Description: ");
        console.log(formDescription.value);

        const formStartTime = document.getElementById(FORM_START_TIME_ID);
        const formStartTimeWarning = document.getElementById(FORM_STAR_TIME_WARNING_ID);

        if (formStartTime.value == "") {
            formStartTimeWarning.classList.remove("hidden");

            isValid = false;
        }

        console.log("Start time: ");
        console.log(formStartTime.value);

        const formEndTime = document.getElementById(FORM_END_TIME_ID);
        const formEndtimeWarning = document.getElementById(FORM_END_TIME_WARNING_ID);

        if (formEndTime.value == "") {
            formEndtimeWarning.classList.remove("hidden");

            isValid = false;
        }

        console.log("End time: ");
        console.log(typeof formEndTime.value);

        return isValid;
    }

    openDetails(event) {
        const detailsTitle = document.getElementById(DETAILS_TITLE_ID);
        detailsTitle.textContent = event.getTitle();

        const detailsTimes = document.getElementById(DETAILS_TIMES_ID);
        detailsTimes.textContent = event.getTimeStartAndEnd();

        const detailsDescription = document.getElementById(DETAILS_DESCRIPTION_ID);
        detailsDescription.textContent = event.getDescription();

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
        
        if (this.#events[startDateString] === undefined) {
            this.#events[startDateString] = [];
        }

        this.#events[startDateString].push(event);
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
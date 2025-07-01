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

        this.#eventWindow.onclick = (e) => {
            if (e.target === this.#eventWindow && this.#windowState !== WINDOW_STATE.CLOSED) {
                this.#closeWindow();
            }
        };

        this.#eventForm.onclick = e => e.stopPropagation();
        this.#eventDetails.onclick = e => e.stopPropagation();

        this.#createButton.onclick = (e) => {
            e.preventDefault();

            if (this.#windowState != WINDOW_STATE.CLOSED) {
                const validationResult = this.#validateForm();

                if (validationResult) {
                    this.onFormSuccess();
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
                this.#openForm();
            } else {
                this.#closeWindow();
            }
        }

        this.#events = {};

        const data = this.#loadFromLocalStorage();
        this.#loadEvents(data);
    }

    #loadFromLocalStorage() {
        const events = localStorage.getItem(EVENT_LOCAL_STORAGE);

        if (events === null) {
            localStorage.setItem(EVENT_LOCAL_STORAGE, "{}");
            return {};
        }

        return JSON.parse(events);
    }

    #loadEvents(data) {
        Object.keys(data).forEach((dateKey) => {
            const events = data[dateKey];
            events.forEach((eventJson) => {
                const event = new Event(
                    eventJson.title, 
                    eventJson.description, 
                    new Date(eventJson.startDate), 
                    new Date(eventJson.endDate)
                );

                this.addEvent(event);
            });
        });
    }

    #saveEvent(event) {
        const eventData = event.getJson();
        const data = this.#loadFromLocalStorage();
        const dateKey = this.dateToKey(event.getStartDate());

        if (data[dateKey] === undefined) {
            data[dateKey] = [];
        }

        data[dateKey].push(eventData);

        console.log(data);
        localStorage.setItem(EVENT_LOCAL_STORAGE, JSON.stringify(data));
    } 

    onFormSuccess() {}

    #openForm() {
        this.#eventWindow.classList.remove("hidden");
        this.#eventForm.classList.remove("hidden");

        this.#windowState = WINDOW_STATE.FORM;
    }

    #validateForm() {
        const formTitle = document.getElementById(FORM_TITLE_ID);
        const validation1 = this.#validateTextFields(FORM_TITLE_WARNING_ID, formTitle.value);

        const formDescription = document.getElementById(FORM_DESCRIPTION_ID);
        const validation2 = this.#validateTextFields(FORM_DESCRIPTION_WARNING_ID, formDescription.value);

        const formStartTime = document.getElementById(FORM_START_TIME_ID);
        const validation3 = this.#validateDate(FORM_START_TIME_WARNING_ID, formStartTime.value);

        const formEndTime = document.getElementById(FORM_END_TIME_ID);
        const validation4 = this.#validateDate(FORM_END_TIME_WARNING_ID, formEndTime.value);

        if (!(validation1 && validation2 && validation3 && validation4)) {
            return false;
        }

        const startDate = new Date(formStartTime.value);
        const endDate = new Date(formEndTime.value);

        const dateValidation = this.#validateSameDates(startDate, endDate);
        if (!dateValidation) {
            return false
        }

        const endDateValidation = this.#validateEndTime(startDate, endDate);
        if (!endDateValidation) {
            return false;
        }

        const event = new Event(formTitle.value, formDescription.value, startDate, endDate);
        this.addEvent(event);
        this.#saveEvent(event);

        return true;
    }

    #validateTextFields(warningId, text) {
        if (text === "") {
            this.#showWarning(warningId, "This field requires input data!");
            
            return false;
        }
        
        return true;
    }

    #validateSameDates(startDate, endDate) {
        if (this.dateToKey(startDate) != this.dateToKey(endDate)) {
            this.#showWarning(FORM_START_TIME_WARNING_ID, "Date forms should be in the same day!");
            this.#showWarning(FORM_END_TIME_WARNING_ID, "Date forms should be in the same day!");
            
            return false;
        }

        return true;
    }

    #validateDate(warningId, dateStr) {
        const date = new Date(dateStr);
        
        if (Number.isNaN(date.valueOf())) {
            this.#showWarning(warningId, "This date field is not valid!");
            
            return false;
        }

        return true;
    }

    #validateEndTime(startDate, endDate) {
        const startDateInPercantage = getCurrentSecondsInPercentage(startDate);
        const endDateInPercantage = getCurrentSecondsInPercentage(endDate);

        if (endDateInPercantage < startDateInPercantage) {
            this.#showWarning(FORM_END_TIME_WARNING_ID, "This field need to have time after the start date!");

            return false;
        }

        return true;
    }

    #resetAllInputs() {
        const inputIds = [
            FORM_TITLE_ID,
            FORM_DESCRIPTION_ID,
            FORM_START_TIME_ID,
            FORM_END_TIME_ID
        ];

        inputIds.forEach((inputId) => {
            let element = document.getElementById(inputId);
            if (element !== null) {
                element.value = "";
            }
        });
    }

    #resetAllWarnings() {
        const warningIds = [
            FORM_TITLE_WARNING_ID, 
            FORM_DESCRIPTION_WARNING_ID, 
            FORM_START_TIME_WARNING_ID, 
            FORM_END_TIME_WARNING_ID
        ];

        warningIds.forEach((id) => {
            const element = document.getElementById(id);

            if (!element.classList.contains("hidden")) {
                element.classList.add("hidden");
            }
        });
    }

    #showWarning(warningId, message) {
        const warningElement = document.getElementById(warningId);

        if (warningElement == null) {
            return;
        }

        if (warningElement.classList.contains("hidden")) {
            warningElement.classList.remove("hidden");
        }

        warningElement.textContent = message;
    }

    openDetails(event) {
        this.#eventWindow.classList.remove("hidden");
        this.#eventDetails.classList.remove("hidden");

        const detailsTitle = document.getElementById(DETAILS_TITLE_ID);
        detailsTitle.textContent = event.getTitle();

        const detailsTimes = document.getElementById(DETAILS_TIMES_ID);
        detailsTimes.textContent = event.getTimeStartAndEnd();

        const detailsDescription = document.getElementById(DETAILS_DESCRIPTION_ID);
        detailsDescription.textContent = event.getDescription();

        this.#windowState = WINDOW_STATE.DETAILS;
    }

    #closeWindow() {
        this.#resetAllInputs();
        this.#resetAllWarnings();
        
        if (!this.#eventForm.classList.contains("hidden")) {
            this.#eventForm.classList.add("hidden");
        }

        if (!this.#eventDetails.classList.contains("hidden")) {
            this.#eventDetails.classList.add("hidden");
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
        const dayString = this.dateToKey(date);

        return this.#events[dayString];
    }
}
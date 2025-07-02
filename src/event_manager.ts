enum WindowState {
    CLOSED,
    FORM,
    DETAILS,
}

class EventManager {
    private eventWindow: HTMLElement | null = document.getElementById(EVENT_WINDOW_ID);
    private eventForm: HTMLElement | null = document.getElementById(EVENT_FORM_ID);
    private eventDetails: HTMLElement | null = document.getElementById(EVENT_DETAILS_ID);

    private eventButton: HTMLElement | null = document.getElementById(OPEN_EVENT_WINDOW_ID);
    private createButton: HTMLElement | null = document.getElementById(CREATE_EVENT_BUTTON_ID);
    private closeButton: HTMLElement | null = document.getElementById(CLOSE_EVENT_BUTTON_ID);

    private windowState: WindowState = WindowState.CLOSED;
    private events: Map<string, Array<WixEvent>> = new Map();

    constructor() {
        this.eventWindow!.onclick = (e) => {
            if (e.target === this.eventWindow && this.windowState !== WindowState.CLOSED) {
                this.closeWindow();
            }
        };

        this.eventForm!.onclick = e => e.stopPropagation();
        this.eventDetails!.onclick = e => e.stopPropagation();

        this.createButton!.onclick = (e) => {
            e.preventDefault();

            if (this.windowState !== WindowState.CLOSED) {
                if (this.validateForm()) {
                    this.onFormSuccess();
                    this.closeWindow();
                }
            }
        }

        this.closeButton!.onclick = (e) => {
            e.preventDefault();
            if (this.windowState !== WindowState.CLOSED) {
                this.closeWindow();
            }
        }

        this.eventButton!.onclick = (_) => {
            if (this.windowState === WindowState.CLOSED) {
                this.openForm();
            } else {
                this.closeWindow();
            }
        }

        const data = this.loadEventsFromStorage();
        this.loadEvents(data);
    }

    private loadEventsFromStorage(): Map<string, Array<IEventStorage>> {
        const dataString = localStorage.getItem(EVENT_LOCAL_STORAGE);
        if (dataString == null) {
            localStorage.setItem(EVENT_LOCAL_STORAGE, "{}");

            return new Map();
        }

        const data: Map<string, Array<IEventStorage>> = JSON.parse(dataString);
        return data;
    }

    private loadEvents(data: Map<string, Iterable<IEventStorage>>) {
        for (const key of data.keys()) {
            const events: Iterable<IEventStorage> | undefined = data.get(key);
            if (events === undefined) {
                continue;
            }

            for (const eventStracture of events) {
                const event = eventStracture as WixEvent;

                this.addEvent(event);   
            }
        }
    }

    private saveEvent(event: WixEvent) {
        const data = this.loadEventsFromStorage();
        const dateKey = this.dateToKey(event.startDate);

        let events = data.get(dateKey);
        if (events === undefined) {
            events = [];
        }

        events.push(event as IEventStorage);
        data.set(dateKey, events);

        localStorage.setItem(EVENT_LOCAL_STORAGE, JSON.stringify(data));
    }

    private addEvent(event: WixEvent) {
        const startDate = event.startDate;
        const startDateString = this.dateToKey(startDate);
        
        if (this.events.get(startDateString) === undefined) {
            this.events.set(startDateString, []);
        }

        this.events.get(startDateString)!.push(event);
    }

    private resetAllInputs() {
        const inputIds = [
            FORM_TITLE_ID,
            FORM_DESCRIPTION_ID,
            FORM_START_TIME_ID,
            FORM_END_TIME_ID,
        ];

        for (const id of inputIds) {
            const element = document.getElementById(id);
            if (element === null || !(element instanceof HTMLInputElement)) {
                continue;
            }

            element.value = "";
        }
    }

    private resetAllWarnings() {
        const warningIds = [
            FORM_TITLE_WARNING_ID,
            FORM_DESCRIPTION_WARNING_ID,
            FORM_START_TIME_WARNING_ID,
            FORM_END_TIME_WARNING_ID,
        ];

        for (const id of warningIds) {
            const element = document.getElementById(id);
            if (element === null || element.classList.contains("hidden")) {
                return;
            }

            element.classList.add("hidden");
        }
    }

    private showWarning(warningId: string, message: string) {
        const element = document.getElementById(warningId);
        if (element === null) {
            return;
        }

        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        }

        element.textContent = message;
    }

    private closeWindow() {
        this.resetAllInputs();
        this.resetAllWarnings();

        const eventForm = this.eventForm;
        if (eventForm !== null && eventForm.classList.contains("hidden")) {
            eventForm.classList.add("hidden");
        }

        const eventDetails = this.eventDetails;
        if (eventDetails !== null && !eventDetails.classList.contains("hidden")) {
            eventDetails.classList.add("hidden");
        }

        this.windowState = WindowState.CLOSED;

        this.eventWindow?.classList.add("hidden");
        this.windowState = WindowState.CLOSED;
    }

    private openForm() {
        this.eventWindow?.classList.remove("hidden");
        this.eventForm?.classList.remove("hidden");

        this.windowState = WindowState.FORM;
    }

    openDetails(event: WixEvent) {
        this.eventWindow?.classList.remove("hidden");
        this.eventDetails?.classList.remove("hidden");
        this.windowState = WindowState.DETAILS;

        const detailsTitle = document.getElementById(DETAILS_TITLE_ID);
        if (detailsTitle === undefined) {
            return;
        }

        detailsTitle!.textContent = event.title;
        
        const detailsDescription = document.getElementById(DETAILS_DESCRIPTION_ID);
        if (detailsDescription === undefined) {
            return;
        }
        
        detailsDescription!.textContent = event.description;

        const detailsTime = document.getElementById(DETAILS_TIMES_ID);
        if (detailsTime === undefined) {
            return;
        }

        detailsTime!.textContent = event.formatTime;
    }

    private validateForm(): boolean {
        const formTitle = document.getElementById(FORM_TITLE_ID);
        if (formTitle === undefined || !(formTitle instanceof HTMLInputElement)) {
            return false;
        }
        
        const validateTitle = this.validateTextFields(FORM_TITLE_WARNING_ID, formTitle.value);

        const formDescription = document.getElementById(FORM_DESCRIPTION_ID);
        if (formDescription === undefined || !(formDescription instanceof HTMLInputElement)) {
            return false;
        }

        const validateDescription = this.validateTextFields(FORM_DESCRIPTION_WARNING_ID, formDescription.value);

        const formStartDate = document.getElementById(FORM_START_TIME_ID);
        if (formStartDate === undefined || !(formStartDate instanceof HTMLInputElement)) {
            return false;
        }

        const validateStartDate = this.validateDate(FORM_START_TIME_WARNING_ID, formStartDate.value);

        const formEndDate = document.getElementById(FORM_END_TIME_ID);
        if (formEndDate === undefined || !(formEndDate instanceof HTMLInputElement)) {
            return false;
        }
        
        const validateEndDate = this.validateDate(FORM_END_TIME_WARNING_ID, formEndDate.value);

        if (!(validateTitle && validateDescription && validateStartDate && validateEndDate)) {
            return false;
        }

        const startDate = new Date(formStartDate.value);
        const endDate = new Date(formEndDate.value);

        const validateSameDayDates = this.validateSameDates(startDate, endDate);
        if (!validateSameDayDates) {
            return false;
        } 

        const validateEndDateBedoreStartDate = this.validateEndDate(startDate, endDate);
        if (!validateEndDateBedoreStartDate) {
            return false;
        }

        const event = new WixEvent(formTitle.value, formDescription.value, startDate, endDate);
        this.addEvent(event);
        this.saveEvent(event);
        
        return true;
    }

    private validateTextFields(warningId: string, text: string): boolean {
        if (text === "") {
            this.showWarning(warningId, "This field requires input data");

            return false;
        }

        return false;
    }

    private validateDate(warningId: string, value: string): boolean {
        const date = new Date(value);
        if (Number.isNaN(date.valueOf())) {
            this.showWarning(warningId, "This date field is not valid!");
            
            return false;
        }
        
        return true;
    }

    private validateSameDates(startDate: Date, endDate: Date): boolean {
        if (this.dateToKey(startDate) !== this.dateToKey(endDate)) {
            this.showWarning(FORM_START_TIME_WARNING_ID, "Date fields should be in the same date!");
            this.showWarning(FORM_END_TIME_WARNING_ID, "Date fields should be in the same date!");
            
            return false;
        }
        
        return true;
    }

    private validateEndDate(startDate: Date, endDate: Date): boolean {
        const startDateInPercentage = getCurrentSecondsInPercentage(startDate);
        const endDateInPercentage = getCurrentSecondsInPercentage(endDate);

        const difference = endDateInPercentage - startDateInPercentage;

        if (difference < ONE_HOUR_IN_PERCENTAGE) {
            this.showWarning(FORM_END_TIME_WARNING_ID, "This field need to have time after the start date!");

            return false;
        }

        return true;
    }

    private dateToKey(date: Date) {
        return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`;
    }

    getTodayEvents(date: Date): Array<IEventStorage> | undefined {
        const dateKey = this.dateToKey(date);

        return this.events.get(dateKey);        
    }

    onFormSuccess() {}
}

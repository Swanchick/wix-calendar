"use strict";
var WindowState;
(function (WindowState) {
    WindowState[WindowState["CLOSED"] = 0] = "CLOSED";
    WindowState[WindowState["FORM"] = 1] = "FORM";
    WindowState[WindowState["DETAILS"] = 2] = "DETAILS";
})(WindowState || (WindowState = {}));
class EventManager {
    constructor() {
        this.eventWindow = document.getElementById(EVENT_WINDOW_ID);
        this.eventForm = document.getElementById(EVENT_FORM_ID);
        this.eventDetails = document.getElementById(EVENT_DETAILS_ID);
        this.eventButton = document.getElementById(OPEN_EVENT_WINDOW_ID);
        this.createButton = document.getElementById(CREATE_EVENT_BUTTON_ID);
        this.closeButton = document.getElementById(CLOSE_EVENT_BUTTON_ID);
        this.windowState = WindowState.CLOSED;
        this.events = new Map();
        this.eventWindow.onclick = (e) => {
            if (e.target === this.eventWindow && this.windowState !== WindowState.CLOSED) {
                this.closeWindow();
            }
        };
        this.eventForm.onclick = e => e.stopPropagation();
        this.eventDetails.onclick = e => e.stopPropagation();
        this.createButton.onclick = (e) => {
            e.preventDefault();
            if (this.windowState !== WindowState.CLOSED) {
                if (this.validateForm()) {
                    this.onFormSuccess();
                    console.log("Pressed button");
                    this.closeWindow();
                }
            }
        };
        this.closeButton.onclick = (e) => {
            e.preventDefault();
            if (this.windowState !== WindowState.CLOSED) {
                this.closeWindow();
            }
        };
        this.eventButton.onclick = (_) => {
            if (this.windowState === WindowState.CLOSED) {
                this.openForm();
            }
            else {
                this.closeWindow();
            }
        };
        const data = this.loadEventsFromStorage();
        this.loadEvents(data);
    }
    loadEventsFromStorage() {
        const dataString = localStorage.getItem(EVENT_LOCAL_STORAGE);
        if (dataString == null) {
            return JSON.parse("{}");
        }
        const data = JSON.parse(dataString);
        return data;
    }
    loadEvents(data) {
        if (data instanceof Map) {
            for (const [key, events] of data) {
                if (!events)
                    continue;
                for (const eventStructure of events) {
                    const event = eventStructure;
                    this.addEvent(event);
                }
            }
        }
        else if (data && typeof data === "object") {
            for (const [key, events] of Object.entries(data)) {
                if (!events)
                    continue;
                for (const eventStructure of events) {
                    const event = eventStructure;
                    this.addEvent(event);
                }
            }
        }
        else {
            return;
        }
    }
    saveEvent(event) {
        let data = this.loadEventsFromStorage();
        if (data && typeof data === "object") {
            data = new Map();
        }
        const dateKey = this.dateToKey(event.startDate);
        let events = data.get(dateKey);
        if (events === undefined) {
            events = [];
        }
        events.push(event);
        data.set(dateKey, events);
        localStorage.setItem(EVENT_LOCAL_STORAGE, JSON.stringify(data));
    }
    addEvent(event) {
        const startDate = event.startDate;
        const startDateString = this.dateToKey(startDate);
        if (this.events.get(startDateString) === undefined) {
            this.events.set(startDateString, []);
        }
        this.events.get(startDateString).push(event);
    }
    resetAllInputs() {
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
    resetAllWarnings() {
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
    showWarning(warningId, message) {
        const element = document.getElementById(warningId);
        if (element === null) {
            return;
        }
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        }
        element.textContent = message;
    }
    closeWindow() {
        var _a;
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
        (_a = this.eventWindow) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        this.windowState = WindowState.CLOSED;
    }
    openForm() {
        var _a, _b;
        (_a = this.eventWindow) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
        (_b = this.eventForm) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
        this.windowState = WindowState.FORM;
    }
    openDetails(event) {
        var _a, _b;
        (_a = this.eventWindow) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
        (_b = this.eventDetails) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
        this.windowState = WindowState.DETAILS;
        const detailsTitle = document.getElementById(DETAILS_TITLE_ID);
        if (detailsTitle === undefined) {
            return;
        }
        detailsTitle.textContent = event.title;
        const detailsDescription = document.getElementById(DETAILS_DESCRIPTION_ID);
        if (detailsDescription === undefined) {
            return;
        }
        detailsDescription.textContent = event.description;
        const detailsTime = document.getElementById(DETAILS_TIMES_ID);
        if (detailsTime === undefined) {
            return;
        }
        detailsTime.textContent = event.formatTime;
    }
    validateForm() {
        const formTitle = document.getElementById(FORM_TITLE_ID);
        if (formTitle === undefined || !(formTitle instanceof HTMLInputElement)) {
            return false;
        }
        const validateTitle = this.validateTextFields(FORM_TITLE_WARNING_ID, formTitle.value);
        const formDescription = document.getElementById(FORM_DESCRIPTION_ID);
        if (formDescription === undefined || !(formDescription instanceof HTMLTextAreaElement)) {
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
    validateTextFields(warningId, text) {
        if (text === "") {
            this.showWarning(warningId, "This field requires input data");
            return false;
        }
        return true;
    }
    validateDate(warningId, value) {
        const date = new Date(value);
        if (Number.isNaN(date.valueOf())) {
            this.showWarning(warningId, "This date field is not valid!");
            return false;
        }
        return true;
    }
    validateSameDates(startDate, endDate) {
        if (this.dateToKey(startDate) !== this.dateToKey(endDate)) {
            this.showWarning(FORM_START_TIME_WARNING_ID, "Date fields should be in the same date!");
            this.showWarning(FORM_END_TIME_WARNING_ID, "Date fields should be in the same date!");
            return false;
        }
        return true;
    }
    validateEndDate(startDate, endDate) {
        const startDateInPercentage = getCurrentSecondsInPercentage(startDate);
        const endDateInPercentage = getCurrentSecondsInPercentage(endDate);
        const difference = endDateInPercentage - startDateInPercentage;
        if (difference < ONE_HOUR_IN_PERCENTAGE) {
            this.showWarning(FORM_END_TIME_WARNING_ID, "This field need to have time after the start date!");
            return false;
        }
        return true;
    }
    dateToKey(date) {
        return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`;
    }
    getTodayEvents(date) {
        const dateKey = this.dateToKey(date);
        return this.events.get(dateKey);
    }
    onFormSuccess() { }
}

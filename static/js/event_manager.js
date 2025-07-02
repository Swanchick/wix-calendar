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
        const data = this.loadEventsFromStorage();
        this.loadEvents(data);
    }
    loadEventsFromStorage() {
        const dataString = localStorage.getItem(EVENT_LOCAL_STORAGE);
        if (dataString == null) {
            localStorage.setItem(EVENT_LOCAL_STORAGE, "{}");
            return new Map();
        }
        const data = JSON.parse(dataString);
        return data;
    }
    loadEvents(data) {
        for (const key of data.keys()) {
            const events = data.get(key);
            if (events === undefined) {
                continue;
            }
            for (const eventStracture of events) {
                const event = eventStracture;
                this.addEvent(event);
            }
        }
    }
    saveEvent(event) {
        const data = this.loadEventsFromStorage();
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
    validateForm() {
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

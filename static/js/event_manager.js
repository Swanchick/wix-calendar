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
        this.createButton = document.getElementById(CREATE_EVENT_BUTTON);
        this.closeButton = document.getElementById(CLOSE_EVENT_BUTTON);
        this.windowState = WindowState.CLOSED;
        this.events = [];
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
    closeWindow() {
    }
    validateForm() {
        return true;
    }
    onFormSuccess() { }
}

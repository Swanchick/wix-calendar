"use strict";
class Calendar {
    constructor() {
        this.date = new Date();
        this.week = new Week();
        this.eventManager = new EventManager();
        this.arrow = new Arrow();
    }
    start() {
    }
    updateArrow() {
    }
}

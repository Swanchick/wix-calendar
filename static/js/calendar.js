"use strict";
class Calendar {
    constructor() {
        this.date = new Date();
        this.eventManager = new EventManager();
        this.week = new Week(this.date, this.eventManager);
        this.arrow = new Arrow();
        this.eventManager.onFormSuccess = () => {
            this.week.clearAll();
            this.week.build(this.date);
            this.arrow = new Arrow();
        };
        const currentDateElement = document.getElementById(CURRENT_DATE_ID);
        if (currentDateElement !== null) {
            currentDateElement.textContent = `${MONTHS[this.date.getMonth()].name} ${this.date.getFullYear()}`;
        }
    }
    start() {
        this.week.build(this.date);
        this.updateArrow();
        setInterval(() => { this.updateArrow(); }, 1000);
    }
    updateArrow() {
        this.date = new Date();
        const arrowPosition = getCurrentSecondsInPercentage(this.date);
        this.arrow.setPosition(arrowPosition);
    }
}

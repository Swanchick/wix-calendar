"use strict";
class Week {
    constructor() {
        this.weekNamesContainer = document.getElementById(WEEK_NAMES_CONTAINER);
        this.weekDatesContainer = document.getElementById(WEEK_DATES_ID);
        this.dayContainer = document.getElementById(DAYS_CONTAINER_ID);
        this.dayElements = [];
        this.today = null;
    }
}

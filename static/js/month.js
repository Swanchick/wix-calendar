"use strict";
class Month {
    constructor(name, days, isFebruary = false) {
        this.name = name;
        this.internalDays = days;
        this.isFebruary = isFebruary;
    }
    getDays(date) {
        if (!this.isFebruary) {
            return this.internalDays;
        }
        const isLeapYear = this.isLeapYear(date.getFullYear());
        const februaryDays = isLeapYear ? 29 : 28;
        return februaryDays;
    }
    isLeapYear(year) {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }
}

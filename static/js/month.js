"use strict";
class Month {
    constructor(name, days, position, isFebruary = false) {
        this.name = name;
        this.internalDays = days;
        this.position = position;
        this.isFebruary = isFebruary;
    }
    getDays(year) {
        if (!this.isFebruary) {
            return this.internalDays;
        }
        const isLeapYear = this.isLeapYear(year);
        const februaryDays = isLeapYear ? 29 : 28;
        return februaryDays;
    }
    isLeapYear(year) {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    }
}

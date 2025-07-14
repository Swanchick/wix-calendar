import React, { ReactElement } from "react";
import { DAY_NAMES, DAYS_IN_WEEK, MONTHS, ALL_MONTHS } from "../global";
import { WeekElement } from "./weekElement";
import { Month } from "../utils/month";
import { TimeElements } from "./timeElements";
import { Arrow } from "./arrow";
import { WixEvent } from "./event/event"

function getPreviousMonth(month: Month): Month {
    const previousMonth = month.position - 1;
    if (previousMonth < 0) {
        return MONTHS[ALL_MONTHS - 1];
    }

    return MONTHS[previousMonth];
}

function getNextMonth(month: Month): Month {
    const nextMonth = month.position + 1;
    if (nextMonth > 11) {
        return MONTHS[0];
    }

    return MONTHS[nextMonth];
}


function getWeek(date: Date): Array<Date> {
    const days: Array<Date> = [];

    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDayInMonth = date.getDate();
    const currentDayInWeek = date.getDay();

    const currentMonth = MONTHS[month];
    const firstDay = currentDayInMonth - currentDayInWeek;

    const prevMonth = getPreviousMonth(currentMonth);
    const prevYear = year - 1;
    const prevMonthDays = prevMonth.getDays((prevMonth.position === 11) ? prevYear : year);

    const nextMonth = getNextMonth(currentMonth);
    const nextYear = year + 1;
    const nextMonthDays = nextMonth.getDays((nextMonth.position === 0) ? nextYear : year);

    for (let i = 0; i < DAYS_IN_WEEK; i++) {
        let actualDay = firstDay + i;
        let actualMonth = month;
        let actualYear = year;

        if (actualDay < 1) {
            actualDay = prevMonthDays - Math.abs(actualDay);
            actualMonth = prevMonth.position;

            if (prevMonth.position === 11) {
                actualYear = prevYear;
            }
        }

        if (actualDay > currentMonth.getDays(year)) {
            actualDay = (actualDay % nextMonthDays) + 1;
            actualMonth = nextMonth.position;

            if (nextMonth.position === 0) {
                actualYear = nextYear;
            }
        }

        days.push(new Date(actualYear, actualMonth, actualDay));
    }

    return days;
}

function generateDayNames(date: Date): Array<ReactElement> {
    const dayNames: Array<ReactElement> = [];
    
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
        const element = (
            <WeekElement
                key={`DAY_NAME: ${i}`}
                day={i}
                currentDay={date.getDay()}
                text={DAY_NAMES[i]}
            />
        );

        dayNames.push(element);
    }
    
    
    return dayNames;
}

function generateDayWeeks(date: Date, week: Array<Date>): Array<ReactElement> {
    const dayWeeks: Array<ReactElement> = [];
    
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
        const dayInMonth = week[i];
        const element = (
            <WeekElement
                key={`DAY_IN_MONTH: ${i}`}
                day={i}
                currentDay={date.getDate()}
                text={`${dayInMonth.getDate()}`}
                />
        );

        dayWeeks.push(element);
    }

    return dayWeeks;
}

function generateDayElement(isCurrentDay: boolean, isLastDay: boolean): ReactElement {
    const lastDayClass = !isLastDay ? "right-border" : "";
    const finalClassName = `day-container ${lastDayClass}`;

    const start = new Date(2025, 6, 14, 11, 0);
    const end = new Date(2025, 6, 14, 12, 0);    

    const event = (<WixEvent
        title="Test 1"
        start={start}
        end={end}
        description="Blah blah blah"
    />);

    return (
        <div className={finalClassName}>
            <TimeElements/>
            {isCurrentDay ? (
                <>
                    <Arrow/>
                    {event}
                </>
            ) : null}
        </div>
    );
}


function generateDayElements(currentDayInWeek: number, week: Array<Date>): Array<ReactElement> {
    const elements: Array<ReactElement> = []
    
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
        const isCurrentDay = i === currentDayInWeek;
        const isLastDay = i === DAYS_IN_WEEK - 1;
        const day = generateDayElement(isCurrentDay, isLastDay);

        elements.push(day);
    }

    return elements;
}

export function WeekContainer(): ReactElement {
    const date = new Date();
    const weekNames = generateDayNames(date);
    const week = getWeek(date);

    const weekDays = generateDayWeeks(date, week);
    const weekTimeDayElements = generateDayElements(date.getDay(), week);

    return (
        <div className="week-container">
            <div className="days-grid text-align-center" id="week-names-container">
                {weekNames}
            </div>

            <div className="days-grid text-align-center bottom-border" id="week-dates">
                {weekDays}
            </div>

            <div className="days-grid full-height" id="days-container">
                {weekTimeDayElements}
            </div>
        </div>
    );
}
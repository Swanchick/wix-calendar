import React, { ReactElement, useContext } from "react";
import { DAY_NAMES, DAYS_IN_WEEK, MONTHS, ALL_MONTHS } from "../global";
import { WeekElement } from "./weekElement";
import { Month } from "../utils/month";
import { TimeElements } from "./timeElements";
import { Arrow } from "./arrow";
import { dateToKey, EventData } from "./event/eventData";
import { EventContext } from "./event/eventContext";
import { WixEvent } from "./event/event";

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

export function WeekContainer(): ReactElement {
    const context = useContext(EventContext);
    const events = context.events;
    const date = new Date();
    const currentDateKey = dateToKey(date);
    const week = getWeek(date);

    return (
        <div className="week-container">
            <div className="days-grid text-align-center" id="week-names-container">
                {DAY_NAMES.map((name, i) => (
                    <WeekElement
                        key={`DAY_NAME: ${name} ${i}`}
                        day={i}
                        currentDay={date.getDate()}
                        text={name}
                    />
                ))}
            </div>

            <div className="days-grid text-align-center bottom-border" id="week-dates">
                {week.map((dateInMonth, i) => (
                    <WeekElement
                        key={`DAY_IN_MONTH: ${dateInMonth.toDateString()}`}
                        day={i}
                        currentDay={date.getDate()}
                        text={`${dateInMonth.getDate()}`}
                    />
                ))}
            </div>

            <div className="days-grid full-height" id="days-container">
                {week.map((dayInMonth, dayInWeek) => (
                    <div className={`day-container ${(dayInWeek === DAYS_IN_WEEK - 1) ? "" : "right-border"}`}>
                        <TimeElements/>
                        {
                            (dateToKey(dayInMonth) === currentDateKey) ? 
                            <Arrow/> : 
                            ""
                        }

                        {
                            (events[dateToKey(dayInMonth)] !== undefined) ?
                            events[dateToKey(dayInMonth)].map((eventData) => (
                                <WixEvent 
                                    title={eventData.title!}
                                    description={eventData.description!}
                                    start={eventData.startDate!}
                                    end={eventData.endDate!}
                                />
                            )) :
                            ""
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
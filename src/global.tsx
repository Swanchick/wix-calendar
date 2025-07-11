import { Month } from "./utils/month"


export const EVENT_LOCAL_STORAGE = "wix-calendar-events";


export const WEEK_DATES_ID = "week-dates";
export const DAYS_CONTAINER_ID = "days-container";
export const ARROW_ID = "arrow";
export const WEEK_NAMES_CONTAINER_ID = "week-names-container";
export const EVENT_WINDOW_ID = "event-window";
export const OPEN_EVENT_WINDOW_ID = "open-event-window";
export const CREATE_EVENT_BUTTON_ID = "create-event-button";
export const CLOSE_EVENT_BUTTON_ID = "close-event-button";
export const EVENT_FORM_ID = "event-form";
export const EVENT_DETAILS_ID = "event-details";

export const CURRENT_DATE_ID = "current-date";

// Detail element ids 
export const DETAILS_TITLE_ID = "event-details-title";
export const DETAILS_TIMES_ID = "event-details-times";
export const DETAILS_DESCRIPTION_ID = "event-details-description";


// Form element ids
export const FORM_TITLE_ID = "event-title";
export const FORM_TITLE_WARNING_ID = "title-warning";

export const FORM_DESCRIPTION_ID = "event-description";
export const FORM_DESCRIPTION_WARNING_ID = "description-warning";

const FORM_START_TIME_ID = "event-start-time";
const FORM_START_TIME_WARNING_ID = "start-time-warning";

export const FORM_END_TIME_ID = "event-end-time";
export const FORM_END_TIME_WARNING_ID = "end-time-warning";

// Year, month and day constants
export const DAY_NAMES = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
];

export const DAYS_IN_WEEK = 7;

export const MONTHS = [
    new Month("January",    31, 0),
    new Month("February",   0,  1, true),
    new Month("March",      31, 2),
    new Month("April",      30, 3),
    new Month("May",        31, 4),
    new Month("June",       30, 5),
    new Month("July",       31, 6),
    new Month("August",     31, 7),
    new Month("September",  30, 8),
    new Month("October",    31, 9),
    new Month("November",   30, 10),
    new Month("December",   31, 11),
];

export const ALL_MONTHS = 12;
export const ONE_HOUR_IN_PERCENTAGE = 4;

export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR_AND_SECONDS_IN_MINUTE = 60;

export function getCurrentSecondsInPercentage(date: Date): number {    
    const FULL_DAY_IN_SECONDS = Math.pow(MINUTES_IN_HOUR_AND_SECONDS_IN_MINUTE, 2) * HOURS_IN_DAY;

    let seconds = date.getSeconds();
    let minutesInSeconds = date.getMinutes() * 60;
    let hoursInSeconds = date.getHours() * 3600;

    return ((hoursInSeconds + minutesInSeconds + seconds) / FULL_DAY_IN_SECONDS) * 100;
}

const EVENT_LOCAL_STORAGE = "wix-calendar-events";


const WEEK_DATES_ID = "week-dates";
const DAYS_CONTAINER_ID = "days-container";
const ARROW_ID = "arrow";
const WEEK_NAMES_CONTAINER_ID = "week-names-container";
const EVENT_WINDOW_ID = "event-window";
const OPEN_EVENT_WINDOW_ID = "open-event-window";
const CREATE_EVENT_BUTTON_ID = "create-event-button";
const CLOSE_EVENT_BUTTON_ID = "close-event-button";
const EVENT_FORM_ID = "event-form";
const EVENT_DETAILS_ID = "event-details";

const CURRENT_DATE_ID = "current-date";

// Detail element ids 
const DETAILS_TITLE_ID = "event-details-title";
const DETAILS_TIMES_ID = "event-details-times";
const DETAILS_DESCRIPTION_ID = "event-details-description";


// Form element ids
const FORM_TITLE_ID = "event-title";
const FORM_TITLE_WARNING_ID = "title-warning";

const FORM_DESCRIPTION_ID = "event-description";
const FORM_DESCRIPTION_WARNING_ID = "description-warning";

const FORM_START_TIME_ID = "event-start-time";
const FORM_START_TIME_WARNING_ID = "start-time-warning";

const FORM_END_TIME_ID = "event-end-time";
const FORM_END_TIME_WARNING_ID = "end-time-warning";

// Year, month and day constants
const DAY_NAMES = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
];

const DAYS_IN_WEEK = 7;

const MONTHS = [
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

const ALL_MONTHS = 12;
const ONE_HOUR_IN_PERCENTAGE = 4.166666666666666;

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR_AND_SECONDS_IN_MINUTE = 60;

function getCurrentSecondsInPercentage(date: Date): number {    
    const FULL_DAY_IN_SECONDS = Math.pow(MINUTES_IN_HOUR_AND_SECONDS_IN_MINUTE, 2) * HOURS_IN_DAY;

    let seconds = date.getSeconds();
    let minutesInSeconds = date.getMinutes() * 60;
    let hoursInSeconds = date.getHours() * 3600;

    return ((hoursInSeconds + minutesInSeconds + seconds) / FULL_DAY_IN_SECONDS) * 100;
}

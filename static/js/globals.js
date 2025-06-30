const WEEK_DATES_ID = "week-dates";
const DAYS_CONTAINER_ID = "days-container";
const ARROW_ID = "arrow";
const WEEK_NAMES_CONTAINER = "week-names-container";
const EVENT_WINDOW_ID = "event-window";
const OPEN_EVENT_WINDOW_ID = "open-event-window";
const CREATE_EVENT_BUTTON = "create-event-button";
const CLOSE_EVENT_BUTTON = "close-event-button";
const EVENT_FORM_ID = "event-form";
const EVENT_DETAILS_ID = "event-details";

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


const DAY_NAMES = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
];

const MONTHS = [
    31, // January
    0, // February (28 or 29 depends on a year, but we will check it later)
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
]

const ALL_MONTHS = 12;

const DAYS_IN_WEEK = 7;
const HOURS_IN_DAY = 25;

function getCurrentSecondsInPercentage(date) {
    const FULL_DAY_IN_SECONDS = 3600 * 24;
        
    let seconds = date.getSeconds();
    let minutesInSeconds = date.getMinutes() * 60;
    let hoursInSeconds = date.getHours() * 3600;

    return ((hoursInSeconds + minutesInSeconds + seconds) / FULL_DAY_IN_SECONDS) * 100;
}

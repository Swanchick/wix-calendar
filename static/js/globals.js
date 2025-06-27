const WEEK_DATES_ID = "week-dates";
const DAYS_CONTAINER_ID = "days-container";
const ARROW_ID = "arrow";
const WEEK_NAMES_CONTAINER = "week-names-container";
const EVENT_WINDOW_ID = "event-window";
const OPEN_EVENT_WINDOW_ID = "open-event-window";
const CREATE_EVENT_BUTTON = "create-event-button";
const CLOSE_EVENT_BUTTON = "close-event-button";

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

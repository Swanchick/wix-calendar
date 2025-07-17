import { Month } from "./utils/month"


export const EVENT_LOCAL_STORAGE = "wix-calendar-events";
export const BACKEND_SERVER_API = "http://localhost:3000";

export function buidlApiRoute(route: string): string {
    let finalRoute = BACKEND_SERVER_API;
    
    if (route[0] !== "/") {
        finalRoute = `${finalRoute}/`;
    }

    return `${finalRoute}${route}`;
}

export const ARROW_ID = "arrow";

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

const isFebruary = true;

export const MONTHS = [
    new Month("January",    31, 0               ),
    new Month("February",   0,  1, isFebruary   ),
    new Month("March",      31, 2               ),
    new Month("April",      30, 3               ),
    new Month("May",        31, 4               ),
    new Month("June",       30, 5               ),
    new Month("July",       31, 6               ),
    new Month("August",     31, 7               ),
    new Month("September",  30, 8               ),
    new Month("October",    31, 9               ),
    new Month("November",   30, 10              ),
    new Month("December",   31, 11              ),
];

export const ALL_MONTHS = 12;
export const ONE_HOUR_IN_PERCENTAGE = 4;

export const HOURS_IN_DAY = 24;

export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 3600;

export function getCurrentSecondsInPercentage(date: Date): number {    
    const FULL_DAY_IN_SECONDS = SECONDS_IN_HOUR * HOURS_IN_DAY;

    let seconds = date.getSeconds();
    let minutesInSeconds = date.getMinutes() * SECONDS_IN_MINUTE;
    let hoursInSeconds = date.getHours() * SECONDS_IN_HOUR;

    return ((hoursInSeconds + minutesInSeconds + seconds) / FULL_DAY_IN_SECONDS) * 100;
}

export function formatTime(start: Date, end: Date): string {
    let startHours = start.getHours();
    let startHoursStr = String(startHours).padStart(2, "0");

    let startMinutes = start.getMinutes();
    let startMinutesStr = String(startMinutes).padStart(2, "0");

    let endHours = end.getHours();
    let endHoursStr = String(endHours).padStart(2, "0");
    
    let endMinutes = end.getMinutes();
    let endMinutesStr = String(endMinutes).padStart(2, "0");

    return `${startHoursStr}:${startMinutesStr} - ${endHoursStr}:${endMinutesStr}`;
}

export function dateToKey(date: Date): string {
    return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()}`;
}
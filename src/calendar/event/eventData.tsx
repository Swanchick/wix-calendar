import { EVENT_LOCAL_STORAGE, dateToKey } from "../../global";


export interface EventData {
    title: string | null;
    description: string | null;
    startDate: Date | null;
    endDate: Date | null;
}

export function loadEvents(): Record<string, Array<EventData>> {
    const eventsString = localStorage.getItem(EVENT_LOCAL_STORAGE);
    if (eventsString === null) {
        return {};
    }

    const events: Record<string, Array<EventData>> = JSON.parse(eventsString);
    for (const dateKey in events) {
        for (const event of events[dateKey]) {
            event.startDate = new Date(event.startDate!);
            event.endDate = new Date(event.endDate!);
        }
    }

    return events;
}

export function saveEvent(event: EventData) {
    const events = loadEvents();
    const key = dateToKey(event.startDate!);

    if (events[key] === undefined) {
        events[key] = [];
    }

    events[key].push(event);

    localStorage.setItem(EVENT_LOCAL_STORAGE, JSON.stringify(events));
}
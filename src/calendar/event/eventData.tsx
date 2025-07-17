import { dateToKey, buidlApiRoute } from "../../global";


export interface EventData {
    title: string | null;
    description: string | null;
    startDate: Date | null;
    endDate: Date | null;
}

interface EventDataBase {
    datakey: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export function loadEvents(): Promise<Record<string, Array<EventData>>> {
    const events = fetch(buidlApiRoute("/events/"))
        .then((response) => {
            return response.json();
        })
        .then((json: Array<EventDataBase>) => {
            const events: Record<string, Array<EventData>> = {};
            
            for (const eventDataBase of json) {
                const dateKey = eventDataBase.datakey;

                if (events[dateKey] === undefined) {
                    events[dateKey] = [];
                }

                const event: EventData = {
                    title: eventDataBase.title,
                    description: eventDataBase.description,
                    startDate: new Date(eventDataBase.startDate),
                    endDate: new Date(eventDataBase.endDate)
                };

                events[dateKey].push(event);
            }

            return events;
        })
        .catch((e) => {
            return {};
        });

    return events;
}

export function saveEvent(event: EventData) {
    const eventDataBase: EventDataBase = {
        datakey: dateToKey(event.startDate!),
        title: event.title!,
        description: event.description!,
        startDate: event.startDate!.toString(),
        endDate: event.endDate!.toString()
    };

    fetch(buidlApiRoute("/events/"), {
        method: "POST",
        headers: {
            "Content-Type": "application-json"
        },
        body: JSON.stringify(eventDataBase)
    })
    .catch((e) => {
        console.log("Cannot connect to server!");
    });
}
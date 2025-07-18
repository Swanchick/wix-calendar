import { useDispatch } from "react-redux";
import { dateToKey, buidlApiRoute } from "../../global";
import { addEventFromDataBase } from "./eventState";
import { Dispatch } from "@reduxjs/toolkit";


export interface EventData {
    title: string | null;
    description: string | null;
    startDate: Date | null;
    endDate: Date | null;
}

export interface EventDataBase {
    datakey: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export function loadEvents(dispatch: Dispatch) {    
    fetch(buidlApiRoute("/events/"))
    .then((response) => {
        return response.json();
    })
    .then((json: Array<EventDataBase>) => {
        const events: Record<string, Array<EventData>> = {};
        
        for (const eventDataBase of json) {
            dispatch(addEventFromDataBase(eventDataBase));
        }

        return events;
    });
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
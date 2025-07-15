import React, { Dispatch, SetStateAction, createContext } from "react";
import { EventData } from "./eventData";
import { EventState } from "./eventState";


export interface EventContextType {
    currentEvent: EventData | null
    events: Array<EventData>,
    setEvents: Dispatch<SetStateAction<Array<EventData>>>,
    windowState: EventState,
    setWindowState: Dispatch<SetStateAction<EventState>>,
}

export const EventContext = createContext<EventContextType>({
    currentEvent: null,
    events: [],
    setEvents: () => {},
    windowState: EventState.CLOSED,
    setWindowState: () => {}
});
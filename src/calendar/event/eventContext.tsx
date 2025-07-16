import React, { Dispatch, SetStateAction, createContext } from "react";
import { EventData } from "./eventData";
import { EventState } from "./eventState";

type EventRecord = Record<string, Array<EventData>>;

export interface EventContextType {
    currentEvent: EventData | null
    events: EventRecord,
    setEvents: Dispatch<SetStateAction<EventRecord>>,
    windowState: EventState,
    setWindowState: Dispatch<SetStateAction<EventState>>
}

export const EventContext = createContext<EventContextType>({
    currentEvent: null,
    events: {},
    setEvents: () => {},
    windowState: EventState.CLOSED,
    setWindowState: () => {}
});
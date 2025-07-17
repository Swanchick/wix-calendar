import React, { Dispatch, SetStateAction, createContext } from "react";
import { EventData } from "./eventData";
import { WindowState } from "../windowState";

type EventRecord = Record<string, Array<EventData>>;

export interface EventContextType {
    currentEvent: EventData | null
    setCurrentEvent: Dispatch<SetStateAction<EventData | null>>
    events: EventRecord,
    setEvents: Dispatch<SetStateAction<EventRecord>>,
    windowState: WindowState,
    setWindowState: Dispatch<SetStateAction<WindowState>>,
}

export const EventContext = createContext<EventContextType>({
    currentEvent: null,
    setCurrentEvent: () => {},
    events: {},
    setEvents: () => {},
    windowState: WindowState.CLOSED,
    setWindowState: () => {}
});
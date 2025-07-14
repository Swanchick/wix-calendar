import React, { ReactElement } from "react";
import { EventState } from "./eventState";
import { EventForm } from "./eventForm";

type EventWindowProps = {
    state: EventState, 
    event?: {
        title: string,
        start: Date,
        end: Date,
        description: string
    }
}

export function EventWindow({state, event} : EventWindowProps): ReactElement {
    return (
        <div className="event-window">
            <EventForm />
        </div>
    );
}
import React, { ReactElement, useContext } from "react";
import { EventState } from "./eventState";
import { EventForm } from "./eventForm";
import { EventContext } from "./eventContext";
import { EventDetails } from "./eventDetails";

type EventWindowProps = {
    state: EventState, 
}

export function EventWindow({state} : EventWindowProps): ReactElement {
    const context = useContext(EventContext);
    const eventDetails = context.currentEvent!;
    
    const closeWindow = () => {
        context.setCurrentEvent(null);
        context.setWindowState(EventState.CLOSED);
    };

    return (
        <div className="event-window" onClick={closeWindow}>
            {
                state === EventState.FORM ? 
                <EventForm /> :
                ""
            }

            {
                state === EventState.DETAILS ?
                <EventDetails 
                    currentEvent={eventDetails}
                /> :
                ""
            }
        </div>
    );
}
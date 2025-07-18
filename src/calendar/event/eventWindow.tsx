import React, { ReactElement, useContext } from "react";
import { WindowState } from "../windowState";
import { EventForm } from "./eventForm";
import { EventContext } from "./eventContext";
import { EventDetails } from "./eventDetails";

type EventWindowProps = {
    state: WindowState, 
};

export function EventWindow({state} : EventWindowProps): ReactElement {
    const context = useContext(EventContext);
    const eventDetails = context.currentEvent!;
    
    const closeWindow = () => {
        context.setCurrentEvent(null);
        context.setWindowState(WindowState.CLOSED);
    };

    return (
        <div className="event-window" onClick={closeWindow}>
            {
                state === WindowState.FORM ? 
                <EventForm /> :
                ""
            }

            {
                state === WindowState.DETAILS ?
                <EventDetails 
                    currentEvent={eventDetails}
                /> :
                ""
            }
        </div>
    );
}
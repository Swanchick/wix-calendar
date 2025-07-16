import React, { ReactElement, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./header";
import { Calendar } from "./calendar/calendar";
import { EventWindow } from "./calendar/event/eventWindow";
import { EventState } from "./calendar/event/eventState";
import { EventContextType, EventContext } from "./calendar/event/eventContext";
import { EventData, loadEvents } from "./calendar/event/eventData";

function App(): ReactElement {
    const [windowState, setWindowState] = useState<EventState>(EventState.CLOSED);
    const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);

    const [events, setEvents] = useState<Record<string, Array<EventData>>>(loadEvents());
    
    const contextValue: EventContextType = {
        currentEvent: currentEvent,
        setCurrentEvent: setCurrentEvent,
        events: events,
        setEvents: setEvents,
        windowState: windowState,
        setWindowState: setWindowState
    };

    return (
        <EventContext.Provider value={contextValue}>
            <Header/>
            <Calendar/>
            
            {(windowState !== EventState.CLOSED) ? 
                (<EventWindow state={windowState}/>) : ""
            }
        </EventContext.Provider>
    );
}

window.onload = () => {
    let root = document.getElementById("root");
    if (root === null) {
        return;
    }

    if (root.parentElement == null) {
        return;
    }

    ReactDOM.createRoot(root.parentElement).render(<App/>);
}

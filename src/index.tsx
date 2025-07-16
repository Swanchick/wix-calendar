import React, { ReactElement, useState } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./header";
import { Calendar } from "./calendar/calendar";
import { EventWindow } from "./calendar/event/eventWindow";
import { EventState } from "./calendar/event/eventState";
import { EventContextType, EventContext } from "./calendar/event/eventContext";
import { EventData } from "./calendar/event/eventData";

function App(): ReactElement {
    const [windowState, setWindowState] = useState<EventState>(EventState.CLOSED);

    const [events, setEvents] = useState<Record<string, Array<EventData>>>({
        "2025:6:16": [
            {
                title: "Test 2",
                description: "Test Description",
                startDate: new Date(2025, 6, 16, 13, 0),
                endDate: new Date(2025, 6, 16, 14, 0)
            },
            {
                title: "Test 3",
                description: "Test Description",
                startDate: new Date(2025, 6, 16, 14, 0),
                endDate: new Date(2025, 6, 16, 15, 0)
            },
            {
                title: "Test 4",
                description: "Test Description",
                startDate: new Date(2025, 6, 16, 16, 0),
                endDate: new Date(2025, 6, 16, 18, 0)
            }
        ],
        "2025:6:15": [
            {
                title: "Lunch",
                description: "Eat food",
                startDate: new Date(2025, 6, 16, 12, 0),
                endDate: new Date(2025, 6, 16, 13, 0)
            }
        ]
    });
    
    const contextValue: EventContextType = {
        currentEvent: null,
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

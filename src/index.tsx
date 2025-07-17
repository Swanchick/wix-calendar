import React, { ReactElement, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./header";
import { Calendar } from "./calendar/calendar";
import { EventWindow } from "./calendar/event/eventWindow";
import { WindowState } from "./calendar/windowState";
import { EventContextType, EventContext } from "./calendar/event/eventContext";
import { EventData, loadEvents } from "./calendar/event/eventData";
import store from "./store";
import { Provider } from "react-redux";

function App(): ReactElement {
    const [windowState, setWindowState] = useState<WindowState>(WindowState.CLOSED);
    const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);

    const [events, setEvents] = useState<Record<string, Array<EventData>>>({});

    // useEffect(() => {
    //     loadEvents()
    //     .then((e) => {
    //         if (events === e) {
    //             return;
    //         }
    //         setEvents(e);
    //     });
    // }, []);
    
    const contextValue: EventContextType = {
        currentEvent: currentEvent,
        setCurrentEvent: setCurrentEvent,
        events: events,
        setEvents: setEvents,
        windowState: windowState,
        setWindowState: setWindowState
    };

    return (
        <Provider store={store}>
            <EventContext.Provider value={contextValue}>
                <Header/>
                <Calendar/>
                
                {(windowState !== WindowState.CLOSED) ? 
                    (<EventWindow state={windowState}/>) : ""
                }
            </EventContext.Provider>
        </Provider>
        
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

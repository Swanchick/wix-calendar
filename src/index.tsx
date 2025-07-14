import React, { ReactElement, useState } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./header";
import { Calendar } from "./calendar/calendar";
import { EventWindow } from "./calendar/event/eventWindow";
import { EventState } from "./calendar/event/eventState";

function App(): ReactElement {
    const [eventState, setEventState] = useState(EventState.CLOSED);
    
    return (
        <>
            <Header/>
            <Calendar/>
            <EventWindow state={EventState.FORM}/>
            {/* {(eventState !== EventState.CLOSED) ? 
                (<EventWindow state={eventState}/>) : ""
            } */}
        </>
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

import React, { ReactElement, useContext } from "react";
import { EventContext } from "./event/eventContext";
import { WindowState } from "./windowState";

export function SideContainer(): ReactElement {
    const context = useContext(EventContext);
    
    const handleEventClick = () => {
        context.setWindowState(WindowState.FORM);
    };
    
    
    return (
        <div className="side-container">
            <button 
                className="button side-button" 
                id="open-event-window"
                onClick={handleEventClick}
            > 
            + Event
            </button>
            
            <h2>Very cool placeholder</h2>
        </div>
    );
}
import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { getCurrentSecondsInPercentage, formatTime } from "../../global";
import { EventData } from "./eventData";
import { WindowState } from "../windowState";

type EventProps = {
    eventData: EventData;
    setCurrentEvent: Dispatch<SetStateAction<EventData | null>>;
    setWindowState: Dispatch<SetStateAction<WindowState>>;
};


export function WixEvent({eventData, setCurrentEvent, setWindowState}: EventProps): ReactElement {    
    const position = getCurrentSecondsInPercentage(eventData.startDate!);
    const endPosition = getCurrentSecondsInPercentage(eventData.endDate!);
    const height = endPosition - position;

    const handleEventClick = (_) => {
        setWindowState(WindowState.DETAILS);
        setCurrentEvent(eventData);
    };
    
    return (
        <button className="event-mark" onClick={handleEventClick} style={{
            top: `${position}%`,
            height: `${height}%`
        }}>
            <p className="event-panel-title">{eventData.title}</p>
            <p>{formatTime(eventData.startDate!, eventData.endDate!)}</p>
        </button>
    );
}


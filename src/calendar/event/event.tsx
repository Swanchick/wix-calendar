import React, { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import { getCurrentSecondsInPercentage, formatTime } from "../../global";
import { EventContext } from "./eventContext";
import { EventData } from "./eventData";
import { EventState } from "./eventState";

type EventProps = {
    eventData: EventData,
    setCurrentEvent: Dispatch<SetStateAction<EventData | null>>,
    setWindowState: Dispatch<SetStateAction<EventState>>
};


export function WixEvent({eventData, setCurrentEvent, setWindowState}: EventProps): ReactElement {    
    const position = getCurrentSecondsInPercentage(eventData.startDate!);
    const endPosition = getCurrentSecondsInPercentage(eventData.endDate!);
    const height = endPosition - position;

    const handleEventClick = (_) => {
        setWindowState(EventState.DETAILS);
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


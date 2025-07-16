import React, { ReactElement, useContext } from "react";
import { getCurrentSecondsInPercentage } from "../../global";
import { EventContext } from "./eventContext";

type EventProps = {
    title: string, 
    start: Date, 
    end: Date, 
    description: string
};


function formatTime(start: Date, end: Date): string {
    let startHours = start.getHours();
    let startHoursStr = String(startHours).padStart(2, "0");

    let startMinutes = start.getMinutes();
    let startMinutesStr = String(startMinutes).padStart(2, "0");

    let endHours = end.getHours();
    let endHoursStr = String(endHours).padStart(2, "0");
    
    let endMinutes = end.getMinutes();
    let endMinutesStr = String(endMinutes).padStart(2, "0");

    return `${startHoursStr}:${startMinutesStr} - ${endHoursStr}:${endMinutesStr}`;
}


export function WixEvent({title, start, end, description}: EventProps): ReactElement {
    const position = getCurrentSecondsInPercentage(start);
    const endPosition = getCurrentSecondsInPercentage(end);
    const height = endPosition - position;

    const handleEventClick = (_) => {
        console.log("==================");
        console.log(title);
        console.log(description);
        console.log(formatTime(start, end));
    };

    console.log(`Created: ${title}!`);
    
    return (
        <button className="event-mark" onClick={handleEventClick} style={{
            top: `${position}%`,
            height: `${height}%`
        }}>
            <p className="event-panel-title">{title}</p>
            <p>{formatTime(start, end)}</p>
        </button>
    );
}


import React, {ReactElement, useContext} from "react";
import { EventData } from "./eventData";
import { formatTime } from "../../global";

type EventDetailsProps = {
    currentEvent: EventData
}

export function EventDetails({currentEvent}: EventDetailsProps): ReactElement {
    return (
        <div className="event-menu" onClick={(e) => {e.stopPropagation()}}>
            <h2>{currentEvent.title}</h2>
            <p>{formatTime(currentEvent.startDate!, currentEvent.endDate!)}</p>
            <p>{currentEvent.description}</p>
        </div>
    );
}
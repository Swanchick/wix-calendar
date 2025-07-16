import React, { ReactElement } from "react";
import { DAYS_IN_WEEK } from "../global";


type WeekElementsProps = {
    day: number;
    currentDay: number;
    text: string;
};

export function WeekElement({day, currentDay, text}: WeekElementsProps): ReactElement {
    const rightBorderClassName = (day !== DAYS_IN_WEEK - 1) ? "right-border" : "";
    const currentDayClassName = (day === currentDay) ? "current-day" : "";

    const finalClassName = `${rightBorderClassName} ${currentDayClassName}`;
    
    return (
        <h2 className={finalClassName}>{text}</h2>
    );
}
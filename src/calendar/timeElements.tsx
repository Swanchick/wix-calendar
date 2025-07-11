import React, { ReactElement } from "react";
import { HOURS_IN_DAY } from "../global";

export function TimeElements(): Array<ReactElement> {
    const timeElements: Array<ReactElement> = [];
    let currentDayPart = "am";

    for (let i = 0; i < HOURS_IN_DAY; i++) {
        if (i > 11) {
            currentDayPart = "pm";
        }

        let number = i % 12;
        if (number === 0) {
            number = 12;
        }

        const element = (
            <h2 className="hour-marker">{`${number} ${currentDayPart}`}</h2>
        );

        timeElements.push(element);
    }

    return timeElements;
}
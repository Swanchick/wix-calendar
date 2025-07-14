import React, { ReactElement, useEffect, useState } from "react";
import { getCurrentSecondsInPercentage } from "../global";

export function Arrow(): ReactElement {
    const date = new Date();
    const [position, setPosition] = useState(getCurrentSecondsInPercentage(date));

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setPosition(getCurrentSecondsInPercentage(date));
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div 
            id="arrow" 
            style={{
                top: `${position}%`,
            }}
        >
        </div>
    );
}
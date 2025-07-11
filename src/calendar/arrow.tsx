import React, { ReactElement, useEffect, useState } from "react";
import { getCurrentSecondsInPercentage } from "../global";

export function Arrow() {
    const [position, setPosition] = useState(0);
    
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
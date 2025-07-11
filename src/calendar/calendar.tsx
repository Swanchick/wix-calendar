import React from "react";
import { SideContainer } from "./sideContainer";
import { WeekContainer } from "./weekContainer";

export function Calendar() {
    return (
        <div className="main-container">
            <SideContainer/>
            <WeekContainer/>
        </div>
    );
}
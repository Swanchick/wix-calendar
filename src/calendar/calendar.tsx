import React, { ReactElement } from "react";
import { SideContainer } from "./sideContainer";
import { WeekContainer } from "./weekContainer";

export function Calendar(): ReactElement {
    return (
        <div className="main-container">
            <SideContainer/>
            <WeekContainer/>
        </div>
    );
}
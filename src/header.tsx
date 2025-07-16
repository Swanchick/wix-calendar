import React, { ReactElement } from "react";
import { MONTHS } from "./global";


export function Header(): ReactElement {
    const date = new Date();
    
    return (
        <header>
            <div className="header-left">
                <h2>Kyryl's Calendar</h2>
                <button className="header-button">Today</button>

                <button className="header-symbol-button">{"<"}</button>
                <button className="header-symbol-button">{">"}</button>

                <h2 id="current-date">{MONTHS[date.getMonth()].name} - {date.getFullYear()}</h2>
            </div>
        </header>
    );
}
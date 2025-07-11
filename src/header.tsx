import React, { ReactElement } from "react";


export function Header(): ReactElement {
    return (
        <header>
            <div className="header-left">
                <h2>Kyryl's Calendar</h2>
                <button className="header-button">Today</button>

                <button className="header-symbol-button">{"<"}</button>
                <button className="header-symbol-button">{">"}</button>

                <h2 id="current-date">June - 2025</h2>
            </div>
        </header>
    );
}
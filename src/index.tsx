import React, { ReactElement } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./header";
import { Calendar } from "./calendar/calendar";

function App(): ReactElement {
    return (
        <>
            <Header/>
            <Calendar/>
        </>
    );
}

window.onload = () => {
    let root = document.getElementById("root");
    if (root === null) {
        return;
    }

    if (root.parentElement == null) {
        return;
    }

    ReactDOM.createRoot(root.parentElement).render(<App/>);
}

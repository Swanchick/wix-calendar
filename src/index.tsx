import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./header";
import { Calendar } from "./calendar/calendar";

function App() {
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

    ReactDOM.createRoot(root).render(<App/>);
}

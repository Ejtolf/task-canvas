import React from "react";
import Header from "./Header";
import InformationBlock from "./InformationBlock";

import "../Styles/Main.css"
import TasksCalendar from "./TasksCalendar";

export default function Main() {
    return (
        <div className="main">
            <Header />
            <div className="content-inside">
                <div className="higher">
                    <InformationBlock />
                    <TasksCalendar />
                </div>
            </div>
        </div>
    )
}

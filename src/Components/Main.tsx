import React from "react";
import Header from "./Header";
import InformationBlock from "./InformationBlock";
import TasksCalendar from "./TasksCalendar";
import TaskGraphs from "./TaskGraphs";

import "../Styles/Main.css"

export default function Main() {
    return (
        <div className="main">I
            <Header />
            <div className="higher">
                <div className="content-inside">
                    <span className="info-span">
                        <InformationBlock />
                    </span>
                    <span className="tasks-span">
                        <TasksCalendar />
                    </span>
                </div>
            </div>
        </div>
    )
}

import React from "react";
import Header from "./Header";
import InformationBlock from "./InformationBlock";
import TasksCalendar from "./TasksCalendar";
import TaskGraphs from "./TaskGraphs";

import "../Styles/Main.css"

export default function Main() {
    return (
        <div className="main">
            <Header />
            <div className="content-inside">
                <div className="higher">
                    <span className="info-span">
                        <InformationBlock />
                    </span>
                    <span className="tasks-span">
                        <TasksCalendar />
                    </span>
                </div>
                <div className="lower">
                    {/* <TaskGraphs /> */}
                </div>
            </div>
        </div>
    )
}

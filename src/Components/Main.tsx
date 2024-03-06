import React, { useState } from "react";
import Header from "./Header";
import InformationBlock from "./InformationBlock";
import TasksCalendar from "./TasksCalendar";
import TaskGraphs from "./TaskGraphs";

import "../Styles/Main.css"

export default function Main() {
    const [numberOfTasks, setNumberOfTasks] = useState<number>(0);

    return (
        <div className="main">
            <Header />
            <div className="higher">
                <div className="content-inside">
                    <span className="info-span">
                        <InformationBlock tasks={numberOfTasks} />
                        <TaskGraphs />
                    </span>
                    <span className="tasks-span">
                        <TasksCalendar setNumberOfTasks={setNumberOfTasks} />
                    </span>
                </div>
            </div>
        </div>
    )
}

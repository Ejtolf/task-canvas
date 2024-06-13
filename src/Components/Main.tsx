import { useState } from "react";
import Header from "./Header";
import InformationBlock from "./InformationBlock";
import TasksCalendar from "./TasksCalendar";
import TaskGraphs from "./TaskGraphs";
import Task from "./Task";

import "../Styles/Main.css"

export default function Main() {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <div className="main">
            <Header />
            <div className="higher">
                <div className="content-inside">
                    <span className="info-span">
                        <InformationBlock tasks={tasks} />
                        <TaskGraphs tasks={tasks} />
                    </span>
                    <span className="tasks-span">
                        <TasksCalendar setTasks={setTasks} />
                    </span>
                </div>
            </div>
        </div>
    )
}

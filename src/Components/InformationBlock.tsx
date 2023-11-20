import React, { useEffect, useState } from "react";
import "../Styles/InformationBlock.css";
import { Button } from "@mui/material";

export default function InformationBlock() {
    const [numberOfTasksForToday, setNumberOfTasksForToday] = useState<number>(0);
    const [numberOfTasksForTomorrow, setNumberOfTasksForTomorrow] = useState<number>(0);
    const [lastTaskTime, setLastTaskTime] = useState<string | number | Date>(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [tasksRemains, setTasksRemains] = useState<string | number>(0);

    // DATE
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = months[today.getMonth()];

    // CLOCK
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleAddTask = () => {
        setNumberOfTasksForToday(numberOfTasksForToday + 1);
        setLastTaskTime(currentTime.toLocaleTimeString());
    }

    return (
        <div className="informationBlock">
            <div className="left-column">
                <p className="information-panel-text">Tasks for today: {numberOfTasksForToday}</p>
                <p className="information-panel-text">Tasks for tomorrow: {numberOfTasksForTomorrow}</p>
                <p className="information-panel-text">Tasks for tomorrow: {numberOfTasksForTomorrow}</p>
                <p className="information-panel-text">{
                    (numberOfTasksForToday === 0) ?
                        "All tasks done." :                     // TRUE
                        `Tasks remains: ${tasksRemains}`                                      // FALSE
                }</p>
            </div>
            <div className="right-column">
                <p className="information-panel-text">Time: {currentTime.toLocaleTimeString()}</p>
                <p className="information-panel-text">Date: {currentDay} of {currentMonth}</p>
            </div>
            <div className="bottom">
                <div className="last-task-div">
                    <p className="information-panel-text p-tasks-count">{
                        (lastTaskTime === 0) ?
                            "No Tasks Today." :                     // TRUE
                            `Last task added at ${lastTaskTime}`    // FALSE
                    }</p>
                </div>
                {/* ---------------------------------------------------------------- */}
                <div className="manager-buttons">
                    <Button variant="contained" onClick={handleAddTask} style={{
                    }}>Add New Task</Button>
                    <Button variant="contained">Clear completed tasks</Button>
                </div>
            </div>
        </div>
    );
}

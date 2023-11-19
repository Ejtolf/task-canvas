import React, { useEffect, useState } from "react";
import "../Styles/InformationBlock.css";
import { Button } from "@mui/material";

export default function InformationBlock() {
    const [numberOfTasksForToday, setNumberOfTasksForToday] = useState<number>(0);
    const [numberOfTasksForTomorrow, setNumberOfTasksForTomorrow] = useState<number>(0);
    const [lastTaskTime, setLastTaskTime] = useState<string | number | Date>(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Date
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
            <p className="information-panel-text">Time: {currentTime.toLocaleTimeString()}</p>
            <p className="information-panel-text">Date: {currentDay} of {currentMonth}</p>
            <hr />
            <p className="information-panel-text">Tasks for today: {numberOfTasksForToday}</p>
            <p className="information-panel-text">Tasks for tomorrow: {numberOfTasksForTomorrow}</p>
            <hr />
            <p className="information-panel-text p-tasks-count">{
                (lastTaskTime === 0) ?
                    "No Tasks Today." :                     // TRUE
                    `Last task added at ${lastTaskTime}`    // FALSE
            }</p>
            {/* ---------------------------------------------------------------- */}
            <Button variant="contained" onClick={handleAddTask} style={{
                float: "right"
            }}>Add New Task</Button>
        </div>
    );
}

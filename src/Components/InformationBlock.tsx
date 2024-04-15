import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import IsTaskPreparingContext from "../Context/contexts";
import Task from "./Task";

import "../Styles/InformationBlock.css";


interface InformationBlockProps {
    tasks?: Task[];
}

const InformationBlock: React.FC<InformationBlockProps> = ({ tasks }) => {
    const { isTaskPreparing, setIsTaskPreparing } = useContext(IsTaskPreparingContext);

    const [numberOfTasksForToday, setNumberOfTasksForToday] = useState<number>(0);
    const [numberOfTasksForTomorrow, setNumberOfTasksForTomorrow] = useState<number>(0);
    const [lastTaskTime, setLastTaskTime] = useState<string | number | Date>(0);
    const [tasksRemains, setTasksRemains] = useState<string | number>(0);

    // DATE
    const [currentTime, setCurrentTime] = useState(new Date());
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

    const handleChangeTaskPreparation = () => { //!...
        setIsTaskPreparing(!isTaskPreparing);
        console.log(isTaskPreparing);
    }

    const handleDeleteAllTasks = () => {
        setNumberOfTasksForToday(0);
        setNumberOfTasksForTomorrow(0);
        setLastTaskTime(0);
        setTasksRemains(0);
    }

    return (
        <div className="informationBlock">
            <div className="left-column">
                <p className="information-panel-text">Tasks: {tasks?.length}</p>
                <p className="information-panel-text">Tasks for today: {numberOfTasksForToday}</p>
                <p className="information-panel-text">Tasks for tomorrow: {numberOfTasksForTomorrow}</p>
                <p className="information-panel-text">{
                    (tasks?.length == 0) ?
                        "All tasks done." :
                        `Tasks left: ${tasks?.length}`
                }</p>
            </div>
            <div className="right-column">
                <p className="information-panel-text">Time: {currentTime.toLocaleTimeString()}</p>
                <p className="information-panel-text">Date: The {currentDay} of {currentMonth}</p>
                <p className="information-panel-text p-tasks-count">{
                    (lastTaskTime === 0) ?
                        "No Tasks Today." :
                        `Last task added at ${lastTaskTime}`
                }</p>
                <div className="manager-buttons">
                    <Button className="manager-button" variant="contained" onClick={handleChangeTaskPreparation}>{
                        isTaskPreparing ? "Cancel" : "Add New Task"
                    }</Button>
                    <Button className="manager-button" variant="contained" onClick={handleDeleteAllTasks}>Clear completed tasks</Button>
                </div>
            </div>
            <div className="bottom">

            </div>
        </div >
    );
}

export default InformationBlock;

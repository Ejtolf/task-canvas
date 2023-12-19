import React, { useContext, useEffect, useState } from "react";
import "../Styles/InformationBlock.css";
import { Button, Slide, SlideProps, Snackbar, Typography } from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";
import IsTaskPrepairingContext from "../Context/taskPrepairingContext";

const InformationBlock: React.FC = () => {
    const { setIsTaskPreparing } = useContext(IsTaskPrepairingContext)
    const [taskIsPrepairing, setTaskIsPrepairing] = useState(false);

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


    const handleAddTask = () => {         //TODO
        setTaskIsPrepairing(!taskIsPrepairing);
        setNumberOfTasksForToday(numberOfTasksForToday + 1);
        setLastTaskTime(currentTime.toLocaleTimeString());
        setTaskIsPrepairing(!taskIsPrepairing);
        setIsTaskPreparing(taskIsPrepairing);
    }

    const handleDeleteAllTasks = () => { //TODO
        setNumberOfTasksForToday(0);     //!
        setNumberOfTasksForTomorrow(0);
        setLastTaskTime(0);
        setTasksRemains(0);
    }

    return (
        <div className="informationBlock">
            <div className="left-column">
                <p className="information-panel-text">Tasks for today: {numberOfTasksForToday}</p>
                <p className="information-panel-text">Tasks for tomorrow: {numberOfTasksForTomorrow}</p>
                <p className="information-panel-text">Tasks for tomorrow: {numberOfTasksForTomorrow}</p>
                <p className="information-panel-text">{
                    (numberOfTasksForToday === 0) ?
                        "All tasks done." :
                        `Tasks remains: ${tasksRemains}`
                }</p>
            </div>
            <div className="right-column">
                <p className="information-panel-text">Time: {currentTime.toLocaleTimeString()}</p>
                <p className="information-panel-text">Date: The {currentDay} of {currentMonth}</p>
            </div>
            <div className="bottom">
                <div className="last-task-div">
                    <p className="information-panel-text p-tasks-count">{
                        (lastTaskTime === 0) ?
                            "No Tasks Today." :
                            `Last task added at ${lastTaskTime}`
                    }</p>
                </div>
                {/* ---------------------------------------------------------------- */}
                <div className="manager-buttons">
                    <Button variant="contained" onClick={handleAddTask}>Add New Task</Button>
                    <Button variant="contained" onClick={handleDeleteAllTasks}>Clear completed tasks</Button>
                </div>
            </div>
        </div >
    );
}

export default InformationBlock;

import React, { useEffect, useState } from "react";
import "../Styles/InformationBlock.css";
import { Button, Slide, SlideProps, Snackbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export default function InformationBlock() {
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

    // TYPES
    // type TransitionProps = Omit<SlideProps, "direction">;

    // CLOCK
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // const TransitionDown = (props: TransitionProps) => {
    //     return <Slide {...props} direction="down" />;
    // }

    const handleAddTask = () => {
        setNumberOfTasksForToday(numberOfTasksForToday + 1);
        setLastTaskTime(currentTime.toLocaleTimeString());

        // const [transition, setTransition] = React.useState<React.ComponentType<TransitionProps> | undefined>(undefined);

        // setTransition(() => Transition);
    }

    const handleDeleteAllTasks = () => { //TODO: This is test function. Then it must be changed to be useful.
        setNumberOfTasksForToday(0);
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
                    <Button variant="contained" onClick={handleAddTask}>Add New Task</Button>
                    <Button variant="contained" onClick={handleDeleteAllTasks}>Clear completed tasks</Button>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import Task from "./Task";
import CompletedStatuses from "./CompletedStatuses";
import "../Styles/InformationBlock.css";

interface InformationBlockProps {
    tasks?: Task[];
}

const InformationBlock: React.FC<InformationBlockProps> = ({ tasks }) => {
    const [numberOfTasksForToday, setNumberOfTasksForToday] = useState<number>(0);
    const [numberOfTasksForTomorrow, setNumberOfTasksForTomorrow] = useState<number>(0);

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

    // Calculate tasks for today and tomorrow
    useEffect(() => {
        if (tasks) {
            const todayStart = new Date(today.setHours(0, 0, 0, 0));
            const tomorrowStart = new Date(todayStart);
            tomorrowStart.setDate(todayStart.getDate() + 1);

            const tasksForToday = tasks.filter(task => {
                const taskDate = task.generationTime ? new Date(task.generationTime) : null;
                return taskDate && taskDate >= todayStart && taskDate < tomorrowStart;
            });

            const tasksForTomorrow = tasks.filter(task => {
                const taskDate = task.generationTime ? new Date(task.generationTime) : null;
                return taskDate && taskDate >= tomorrowStart && taskDate < new Date(tomorrowStart.setDate(tomorrowStart.getDate() + 1));
            });

            setNumberOfTasksForToday(tasksForToday.length);
            setNumberOfTasksForTomorrow(tasksForTomorrow.length);
        }
    }, [tasks, today]);

    const numberOfTasksLeft = () => {
        // List of undone tasks.
        return tasks?.filter((task) => task.isCompleted === CompletedStatuses[0] || task.isCompleted === CompletedStatuses[1]);
    }

    return (
        <div className="informationBlock">
            <div className="left-column">
                <p className="information-panel-text">Tasks: {tasks?.length}</p>
                <p className="information-panel-text">Tasks for today: {numberOfTasksForToday}</p>
                <p className="information-panel-text">Tasks for tomorrow: {numberOfTasksForTomorrow}</p>
                <p className={numberOfTasksLeft()?.length === 0 ? "all-tasks-done-text information-panel-text" : "information-panel-text"}>{
                    (numberOfTasksLeft()?.length === 0) ?
                        "All tasks done." :
                        `Tasks left: ${numberOfTasksLeft()?.length}`
                }</p>
            </div>
            <div className="right-column">
                <p className="information-panel-text">Time: {currentTime.toLocaleTimeString()}</p>
                <p className="information-panel-text">Date: The {currentDay} of {currentMonth}</p>
            </div>
        </div>
    );
}

export default InformationBlock;

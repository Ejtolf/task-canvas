import React, { useEffect, useState } from "react";
import Task from "./Task";

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
            </div>
        </div >
    );
}

export default InformationBlock;

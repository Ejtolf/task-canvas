import React, { useEffect, useState } from "react";
import "../Styles/InformationBlock.css";

export default function InformationBlock() {
    const [numberOfTasksForToday, setNumberOfTasksForToday] = useState(0);
    const [numberOfTasksForTomorrow, setNumberOfTasksForTomorrow] = useState(0);
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

    return (
        <div className="informationBlock">
            <p className="information-panel-text">Time: {currentTime.toLocaleTimeString()}</p>
            <p className="information-panel-text">Date: {currentDay} of {currentMonth}</p>
            <p className="information-panel-text">Tasks for today: {numberOfTasksForToday}</p>
            <p className="information-panel-text">Tasks for tomorrow: {numberOfTasksForTomorrow}</p>
        </div>
    );
}

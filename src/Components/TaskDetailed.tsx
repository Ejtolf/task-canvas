import React from 'react';

import "../Styles/TaskDetailed.css";

interface Task {
    id: number;
    title: string;
    description?: string;
    generationTime?: Date;
    deadline?: string;
    isImportant: boolean;
    isUrgently: boolean;
    isCompleted: string;
}

interface TaskDetailedProps {
    task: Task | undefined;
}

const TaskDetailed: React.FC<TaskDetailedProps> = ({ task }) => {
    const checkTaskParameters = (parameter: boolean) => parameter ? "td-par-true" : "td-par-false";

    if (!task) {
        return <div className="no-tasks-were-selected-text">No task selected</div>;
    }

    return (
        <div className="taskDetailed">
            <div className="td-header">
                <div className="td-header-title">
                    <h1 className="td-title">{task.title}</h1>
                </div>
                <div className="td-date-info">
                    <p>Created:</p>
                    <p>{String(task.generationTime?.getHours())}:{String(task.generationTime?.getMinutes())}, {String(task.generationTime?.getDate())}.{String(task.generationTime?.getMonth())}</p>
                    <p>Deadline: {task.deadline || "-"}</p>
                </div>
            </div>
            <div className="td-left-info">
                <p className={checkTaskParameters(task.isImportant)}>Important</p>
                <p className={checkTaskParameters(task.isUrgently)}>Urgently</p>
                <p>{task.isCompleted}</p>
            </div>
            <div className="td-right-info">
                <p>{task.description || "No description available."}</p>
            </div>
        </div>
    );
};

export default TaskDetailed;

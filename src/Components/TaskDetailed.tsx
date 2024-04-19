import React, { useState } from 'react';
import Status from "./CompletedStatuses";
import Task from "./Task";
import "../Styles/TaskDetailed.css";

interface TaskDetailedProps {
    task: Task | undefined;
    taskId?: number;
    onUpdateTaskStatus: (taskId: number, newStatus: string) => void;
}

const TaskDetailed: React.FC<TaskDetailedProps> = ({ task, taskId, onUpdateTaskStatus }) => {
    const [currentStatus, setCurrentStatus] = useState<string>(task?.isCompleted || "");

    const handleStatusChange = (newStatus: string) => {
        if (taskId !== undefined) {
            onUpdateTaskStatus(taskId, newStatus);
        }
    };

    const checkTaskParameters = (parameter: boolean) => parameter ? "td-par td-par-true" : "td-par td-par-false";

    const checkTaskCompleted = () => {
        if (task?.isCompleted === Status[2]) {
            return "td-par-completed td-task-completed";
        } else if (task?.isCompleted === Status[1]) {
            return "td-par-completed td-task-in-process";
        } else {
            return "td-par-completed td-task-not-completed"
        }
    }

    if (!task) {
        return (
            <div className="taskDetailed">
                <div className="no-tasks-were-selected-text">No task selected</div>
            </div>
        );
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
            <div className="td-general-info">
                <div className="td-left-info">
                    <p className={checkTaskParameters(task.isImportant)}>Important</p>
                    <hr />
                    <p className={checkTaskParameters(task.isUrgently)}>Urgently</p>
                    <hr />
                    <p className="td-status">
                        <select value={currentStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                            {Object.values(Status).map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </p>
                </div>
                <div className="td-right-info">
                    <p className="td-task-description">{task.description || "No description available."}</p>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailed;
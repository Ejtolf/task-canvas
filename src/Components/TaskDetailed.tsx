import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
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
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const handleStatusChange = (newStatus: string) => {
        if (taskId !== undefined) {
            onUpdateTaskStatus(taskId, newStatus);
            setCurrentStatus(newStatus);
            setSnackbarMessage(`Task status has been changed to: ${newStatus}`);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const checkTaskParameters = (parameter: boolean) => parameter ? "td-par td-par-true" : "td-par td-par-false";

    const checkTaskCompleted = () => {
        if (task?.isCompleted === Status[2]) {
            return "td-par-completed td-task-completed";
        } else if (task?.isCompleted === Status[1]) {
            return "td-par-completed td-task-in-process";
        } else {
            return "td-par-completed td-task-not-completed";
        }
    };

    if (!task) {
        return (
            <div className="taskDetailed">
                <div className="no-tasks-were-selected-text">No task selected</div>
            </div>
        );
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'short' });
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    };

    return (
        <div className="taskDetailed">
            <div className="td-header">
                <div className="td-header-title">
                    <h1 className="td-title">{task.title}</h1>
                </div>
                <div className="td-date-info">
                    <p>Created:</p>
                    <p>{formatDate(String(task.generationTime))}</p>
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
                        <div className="status-buttons">
                            {Object.values(Status).map((status) => (
                                <button
                                    key={status}
                                    className={`status-button ${currentStatus === status ? 'active' : ''}`}
                                    onClick={() => handleStatusChange(status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </p>
                </div>
                <div className="td-right-info">
                    <p className="td-task-description">{task.description || "No description available."}</p>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TaskDetailed;

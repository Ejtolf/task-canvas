import React, { useState } from 'react';
import { Button, FormControlLabel, Checkbox } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';

import "../../Styles/TasksCalendar.css";

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

interface TaskPreparingComponentProps {
    onTaskAdd: (newTask: Task) => void;
    isTaskPreparing: boolean;
}

let id = 0;
const TaskPreparingComponent: React.FC<TaskPreparingComponentProps> = ({ onTaskAdd, isTaskPreparing }) => {
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadlineTime, setDeadlineTime] = useState<string>("");
    const [isImportant, setIsImportant] = useState<boolean>(true);
    const [isUrgently, setIsUrgently] = useState<boolean>(true);

    const handleAddTaskToTableGrid = () => {
        id++;
        const newTask: Task = {
            id,
            title: taskTitle,
            description: description,
            generationTime: new Date(),
            deadline: deadlineTime,
            isImportant: isImportant,
            isUrgently: isUrgently,
            isCompleted: "Not completed"
        };

        setOpenSnackbar(true);
        onTaskAdd(newTask);
        setTaskTitle("");
        setDescription("");
        setDeadlineTime("");
        setIsImportant(true);
        setIsUrgently(true);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="new-task-form">
            <h3 className="new-task-title">New Task</h3>
            <hr />
            <div className="new-task-span-head">
                <div className="left-section">
                    <span>
                        <input className="task-title-input" value={taskTitle} type="text" placeholder="Task title" onChange={(e) => setTaskTitle(e.target.value)} />
                    </span>

                    <span style={{ marginLeft: "15px" }}>
                        <Button onClick={() => {
                            if (taskTitle.trim() === "" && description.trim() === "") {
                                alert("No fields were filled.");
                            } else if (taskTitle.trim() === "") {
                                alert("Task title must be filled.");
                            } else {
                                handleAddTaskToTableGrid();
                            }
                        }} variant="outlined" startIcon={<CheckIcon />}>
                            Save
                        </Button>

                        <Button onClick={() => {
                            setTaskTitle("");
                            setDescription("");
                            setDeadlineTime("");
                            setIsImportant(true);
                            setIsUrgently(true);
                        }} variant="outlined" startIcon={<EditOffOutlinedIcon />}>
                            Clear
                        </Button>
                    </span>
                </div>
            </div>
            <hr />
            <div>
                <textarea value={description} className="task-description-input" placeholder="Task description and detailed information." onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="new-task-notes">
                <div>
                    <FormControlLabel control={<Checkbox checked={isImportant} />} label="Important" onChange={() => setIsImportant(!isImportant)} />
                    <FormControlLabel control={<Checkbox checked={isUrgently} />} label="Urgently" onChange={() => setIsUrgently(!isUrgently)} />
                </div>
                <div>
                    <div className="deadline-label">Deadline time:</div>
                    <input className="deadline-input" value={deadlineTime} type="date" onChange={(e) => setDeadlineTime(e.target.value)} />
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {"New task has been added!"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TaskPreparingComponent;

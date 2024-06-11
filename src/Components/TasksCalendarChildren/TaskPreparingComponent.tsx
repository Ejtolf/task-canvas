import React, { useState, useContext, useEffect } from 'react';
import IsTaskPreparingContext from '../../Context/contexts';
import TaskGridComponent from './TaskGridComponent';
import TasksCalendar from '../TasksCalendar';

// Material UI
import { Button, FormControlLabel, Checkbox } from '@mui/material';
import IconButton from "@mui/material/IconButton";
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
}

let id = 0;
const TaskPreparingComponent: React.FC<TaskPreparingComponentProps> = ({ onTaskAdd }) => {
    const { setIsTaskPreparing } = useContext(IsTaskPreparingContext);
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

        onTaskAdd(newTask)
        setIsTaskPreparing(false);
    }

    const handleClearAllFields = () => {
        setTaskTitle("");
        setDescription("");
        setDeadlineTime("");
        setIsImportant(true);
        setIsUrgently(true);
    }

    return (
        <div className="new-task-form">
            <h3 className="new-task-title">New Task</h3>
            <hr />
            <div className="new-task-span-head">
                <div className="left-section">
                    <input className="task-title-input" value={taskTitle} type="text" placeholder="Task title" onChange={(e) => setTaskTitle(e.target.value)} />
                </div>

                <IconButton onClick={() => {
                    if (taskTitle.trim() === "" && description.trim() === "") {
                        alert("No fields was filled.");
                    } else if (taskTitle.trim() === "") {
                        alert("Task title must be filled.");
                    } else {
                        handleAddTaskToTableGrid();
                    }
                }} aria-label="check" size="medium">
                    <CheckIcon fontSize="inherit" />
                </IconButton>

                <IconButton onClick={() => {
                    handleClearAllFields();
                }} aria-label="edit" size="medium">
                    <EditOffOutlinedIcon fontSize="inherit" />
                </IconButton>

                <div className="right-section">
                    <div className="deadline-label">deadline time:</div>
                    <input className="deadline-input" value="date" type="date" onChange={(e) => {
                        const newDate = e.target.value;
                        setDeadlineTime(newDate);
                    }} />
                </div>
            </div>
            <hr />
            <div>
                <textarea value={description} className="task-description-input" placeholder="Task description and detailed information.
In the task table, you will only see the title; when you open it, you will be able to see this description, so:
- Enter the necessary details here, follow the text format;
- If necessary, format the text, making it *bold*, _italic_, ~underlined~, or !highlighted!." onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="new-task-notes">
                <FormControlLabel control={<Checkbox defaultChecked />} label="Important" onChange={() => setIsImportant(!isImportant)} />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Urgently" onChange={() => setIsUrgently(!isUrgently)} />
            </div>
            <span className="new-task-buttons-span">
            </span>
        </div>
    )
};

export default TaskPreparingComponent;

import React, { useContext } from 'react';
import { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Alert, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import IsTaskPrepairingContext from '../Context/taskPrepairingContext';
import CustomizedSnackbars from './Snackbars/Sliders';

import "../Styles/TasksCalendar.css";

const columns: GridColDef[] = [
    { field: 'id', headerName: '№', width: 70 },
    { field: 'taskDescription', headerName: 'Task description', width: 130 },
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'deadlineTime', headerName: 'Deadline', type: 'number', width: 130 },
    { field: 'taskStatus', headerName: 'Status', width: 160 },
];

const rows = [
    { id: 1, taskDescription: "My first task for it.", time: "01.02.2023", deadlineTime: "02.02.2023", taskStatus: "Not completed!" }
];

interface Task {
    title: string;
    description?: string;
    deadline: string;
    isImportant: boolean;
    isUrgently: boolean;
}

const TaskGridComponent: React.FC = () => {
    return (
        <div className="tasks-calendar">
            <div style={{
                height: '50vh',
            }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
            {/* </ThemeProvider> */}
        </div>
    )
}

const TaskPrepairingComponent: React.FC = () => {
    const [taskIsPrepairingNow, setTaskIsPrepairingNow] = useState(true);
    const [taskTitle, setTaskTitle] = useState("");
    const [inputedText, setInputedText] = useState("");
    const [deadlineTime, setDeadlineTime] = useState("");
    const [openAlert, setOpenAlert] = useState(false);

    const { setIsTaskPreparing } = useContext(IsTaskPrepairingContext);

    const handleAddTaskToTableGrid = () => {
        rows.push({ id: 1, taskDescription: "My first task for it.", time: "01.02.2023", deadlineTime: "02.02.2023", taskStatus: "Not completed!" });
        setIsTaskPreparing(!taskIsPrepairingNow);
    }

    const formatText = () => {
        let formattedText = inputedText;

        formattedText = formattedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>'); // жирный
        formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>'); // курсив

        setInputedText(formattedText);
    };

    return (
        <div className="new-task-form">
            <h1 className="new-task-title">New Task</h1>
            <hr />
            <div className="new-task-span-head">
                <div className="left-section">
                    <input className="task-title-input" value={taskTitle} type="text" placeholder="Task title" onChange={(e) => setTaskTitle(e.target.value)} />
                </div>
                <div className="right-section">
                    <div className="deadline-label">deadline time:</div>
                    <input className="deadline-input" type="date" />
                </div>
            </div>
            <hr />
            <div>
                <textarea value={inputedText} className="task-description-input" placeholder="Task description and detailed information.
In the task table, you will only see the title; when you open it, you will be able to see this description, so:
- Enter the necessary details here, follow the text format;
- If necessary, format the text, making it *bold*, _italic_, ~underlined~, or !highlighted!." onChange={(e) => setInputedText(e.target.value)} />
            </div>
            <div className="new-task-notes">
                <FormControlLabel control={<Checkbox defaultChecked />} label="Important" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Urgently" />
            </div>
            <br />
            <span className="new-task-buttons-span">
                <Button variant="contained" onClick={() => {
                    if (taskTitle.trim() === " " && inputedText.trim() === " ") {
                        formatText();
                        // <CustomizedSnackbars handleClick={() => setOpenAlert(!openAlert)} alertOpen={openAlert} message={"!"} />
                        //! ADD LOGIC HERE.
                    } else {
                        // <CustomizedSnackbars handleClick={() => setOpenAlert(!openAlert)} alertOpen={openAlert} message={"?"} />
                        console.log("...");
                        //! ADD LOGIC HERE.
                    }
                }}>Add to datagrid</Button>
                <Button variant="contained" onClick={() => {
                    setTaskTitle(" ");
                    setInputedText(" ");
                    setDeadlineTime(" ");
                }}>Clear</Button>
            </span>
        </div>
    )
}

const TasksCalendar: React.FC = () => {
    const { isTaskPreparing } = React.useContext(IsTaskPrepairingContext)
    return (
        <>
            {isTaskPreparing ? <TaskPrepairingComponent /> : <TaskGridComponent />}
        </>
    );
}

export default TasksCalendar;


import React, { useContext } from 'react';
import { useState } from "react";
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Alert, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import IsTaskPreparingContext from '../Context/contexts';
import CustomizedSnackbars from './Snackbars/Sliders';

import "../Styles/TasksCalendar.css";
import { TaskContext } from '../Context/tasksContext';
import { maxHeaderSize } from 'http';

interface Task {
    index: number,
    title: string,
    description?: string,
    deadline?: string,
    isImportant: boolean,
    isUrgently: boolean,
    isCompleted: boolean
}

const columns: GridColDef[] = [
    { field: 'id', headerName: '№', width: 70 },
    { field: 'taskDescription', headerName: 'Task description', width: 250 },
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'deadlineTime', headerName: 'Deadline', type: 'number', width: 130 },
    { field: 'taskStatus', headerName: 'Status', width: 130 },
];

const rows = [
    { id: 1, taskDescription: 'My first task for it.', time: '01.02.2023', deadlineTime: '02.02.2023', taskStatus: 'Not completed' },
    { id: 2, taskDescription: 'My second task for it.', time: '01.02.2023', deadlineTime: '02.02.2023', taskStatus: 'Not completed' },
];

const TaskGridComponent: React.FC = () => {
    const [updatedRows, setUpdatedRows] = React.useState(rows);

    const handleCellClick = (params: GridCellParams) => {
        const updatedRow = { ...params.row };
        if (updatedRow.taskStatus === 'Not completed') {
            updatedRow.taskStatus = 'In process..';
        } else if (updatedRow.taskStatus === 'In process..' && params.row.id === updatedRow.id) {
            updatedRow.taskStatus = 'Completed';
        } else if (updatedRow.taskStatus === 'Completed') {
            updatedRow.taskStatus = 'Not completed';
        }

        const newRows = updatedRows.map((row) => (row.id === updatedRow.id ? updatedRow : row));
        setUpdatedRows(newRows);
    };

    return (
        <div className="tasks-calendar">
            <div style={{ height: '50vh' }}>
                <DataGrid
                    rows={updatedRows}
                    columns={columns}
                    onCellClick={handleCellClick}
                />
            </div>
        </div>
    );
};



const TaskPreparingComponent: React.FC = () => {
    const { setIsTaskPreparing } = useContext(IsTaskPreparingContext);
    // const { taskList, setTaskList } = useContext(TaskContext);
    // const [taskIsPrepairingNow, setTaskIsPrepairingNow] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [inputedText, setInputedText] = useState("");
    const [deadlineTime, setDeadlineTime] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [task, setTask] = useState<Task>(
        {
            index: 0,
            title: "",
            description: "",
            deadline: "",
            isImportant: true,
            isUrgently: true,
            isCompleted: false
        }
    );

    const handleAddTaskToTableGrid = () => {
        // rows.push({ id: 1, taskDescription: "My first task for it.", time: "01.02.2023", deadlineTime: "02.02.2023", taskStatus: "Not completed!" });
        // setIsTaskPreparing(!taskIsPrepairingNow);
        const newTask: Task = {
            index: 2,
            title: taskTitle,
            description: inputedText,
            deadline: deadlineTime,
            isImportant: true,
            isUrgently: true,
            isCompleted: false
        };

        // for (let i = 0; i < taskList.length; i++) {
        // console.log(taskList[i]);
        // }

        // setTaskList([...taskList, newTask]);
        // setTaskList([...taskList, newTask]);
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
            {/* <br /> */}
            <span className="new-task-buttons-span">
                <Button variant="contained" onClick={() => {
                    if (taskTitle.trim() === " " && inputedText.trim() === " ") {
                        formatText();
                        // <CustomizedSnackbars handleClick={() => setOpenAlert(!openAlert)} alertOpen={openAlert} message={"!"} />
                        //! ADD LOGIC HERE.
                        handleAddTaskToTableGrid();
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
    const { isTaskPreparing } = useContext(IsTaskPreparingContext);

    return (
        <>
            {isTaskPreparing ? <TaskPreparingComponent /> : <TaskGridComponent />}
        </>
    )
}

export default TasksCalendar;


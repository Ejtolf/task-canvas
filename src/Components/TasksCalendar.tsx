import React, { useContext } from 'react';
import { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, TextField, ThemeProvider, createStyles, createTheme, makeStyles } from '@mui/material';
import IsTaskPrepairingContext from '../Context/taskPrepairingContext';

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
    const [testText, setTestText] = useState("First variation");
    const [taskIsPrepairingNow, setTaskIsPrepairingNow] = useState(true);
    const { setIsTaskPreparing } = useContext(IsTaskPrepairingContext);

    const handleAddTaskToTableGrid = () => {
        rows.push({ id: 1, taskDescription: "My first task for it.", time: "01.02.2023", deadlineTime: "02.02.2023", taskStatus: "Not completed!" });
        setIsTaskPreparing(!taskIsPrepairingNow);
    }

    return (
        <div className="new-task-form">
            <h1 className="new-task-title">New Task</h1>
            <h1 className="new-task-title">{testText}</h1>
            <hr />
            <span className="new-task-span">
                <label className="form-label" htmlFor="task-desc-field">Task description:</label>
                <input className="form-input" name="task-desc-field" placeholder="Enter the task description" />
                <br /><br />
                <label className="form-label" htmlFor="deadline-field">Deadline:</label>
                <input className="form-input" type="date" name="task-desc-field" placeholder="Enter the deadline" />
            </span>
            <br />
            <span className="new-task-buttons-span">
                <Button variant="contained" onClick={handleAddTaskToTableGrid}>Accept</Button>
                <Button variant="contained">Cancel</Button>
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


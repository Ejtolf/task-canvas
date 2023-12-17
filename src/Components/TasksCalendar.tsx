import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, ThemeProvider, createStyles, createTheme, makeStyles } from '@mui/material';
import IsTaskPrepairingContext from '../Context/taskPrepairingContext';

import "../Styles/TasksCalendar.css";

const columns: GridColDef[] = [
    { field: 'number', headerName: '№', width: 70 },
    { field: 'firstName', headerName: 'Task description', width: 130 },
    { field: 'lastName', headerName: 'Time', width: 130 },
    {
        field: 'age',
        headerName: 'Deadline',
        type: 'number',
        width: 130,
    },
    {
        field: 'fullName',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const TaskGridComponent: React.FC = () => {
    return (
        <div className="tasks-calendar">
            {/* <ThemeProvider theme={dataGridTheme}> */}
            <div style={{
                height: '50vh',
                // width: '100%'
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
    return (
        <div>
            <h1 className="new-task-title">New Task</h1>
            <hr />
            <label className="form-labels" htmlFor="name-field">Your name: </label>
            <input className="form-inputs" name="name-field" />
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
    //         {/* <h1 style={{ color: "white" }}>{String(isTaskPreparing)}</h1> */}
}

export default TasksCalendar;

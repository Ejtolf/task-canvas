import React, { SetStateAction, useState } from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import TaskDetailed from '../TaskDetailed';
import { saveAs } from "file-saver";

// Material UI
import { Button } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

interface TaskListProps {
    tasks?: Task[];
    onTaskChoice: (chosenTaskId: Task) => void;
}

const TaskGridComponent: React.FC<TaskListProps> = ({ tasks, onTaskChoice }) => {
    // const [open, setOpen] = React.useState(true); // For dialog

    const columns: GridColDef[] = [
        { field: 'id', headerName: '№', width: 70 },
        { field: 'title', headerName: 'Task title', width: 90 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'deadline', headerName: 'Deadline', width: 130 },
        { field: 'isCompleted', headerName: 'Status', width: 130 },
    ];

    const rows = (tasks || []).map((task: Task) => ({
        id: task.id,
        title: task.title,
        description: task.description || "-",
        deadline: task.deadline || "-",
        isCompleted: task.isCompleted,
    }));

    const handleRowClick = (params: { id: GridRowId, data: Task }) => {
        const newSelectedId = typeof params.id === 'number' ? params.id : Number(params.id);
        const chosenTask = tasks?.find((task) => task.id === newSelectedId);
        if (chosenTask) {
            onTaskChoice(chosenTask);
        }
    };

    const handleSaveTasks = () => {
        const tasksJSON = JSON.stringify(tasks);

        if (tasks?.length === 0) {
            alert("The list of tasks is empty.");
        } else {
            let listname = prompt("Please enter your list of tasks name", "TaskCanvas List");
            const blob = new Blob([tasksJSON], { type: "application/json" });
            saveAs(blob, `${listname}.json` || "TaskCanvas List.json");
        }
    };

    return (
        <>
            <Button onClick={handleSaveTasks} variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>
                Save
            </Button>

            <div className="tasksCalendar">
                <div className="tasks-grid">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        // @ts-ignore
                        onRowClick={handleRowClick}
                    />
                </div>
            </div>
        </>
    );
};

export default TaskGridComponent;

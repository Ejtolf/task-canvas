import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import "../../Styles/TasksCalendar.css";

interface Task {
    id: number;
    title: string;
    description?: string;
    generationTime?: Date;
    deadline?: string | Date;
    isImportant: boolean;
    isUrgently: boolean;
    isCompleted: string;
}

interface TaskListProps {
    tasks?: Task[];
}

const TaskGridComponent: React.FC<TaskListProps> = ({ tasks }) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: '№', width: 70 },
        { field: 'title', headerName: 'Task title', width: 250 },
        { field: 'description', headerName: 'Description', width: 130 },
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

    return (
        <div className="tasks-calendar">
            <div style={{ height: '50vh' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default TaskGridComponent;

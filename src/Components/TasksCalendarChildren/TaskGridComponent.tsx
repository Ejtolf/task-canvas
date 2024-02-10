import React, { SetStateAction, useState } from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import TaskDetailed from '../TaskDetailed';

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
    const [selectedId, setSelectedId] = useState<number>(0);

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

    const handleRowClick = (params: { id: GridRowId, data: Task }) => {
        const newSelectedId = typeof params.id === 'number' ? params.id : Number(params.id);
        const chosenTask = tasks?.find((task) => task.id === newSelectedId);
        if (chosenTask) {
            onTaskChoice(chosenTask);
        }
    };

    return (
        <div className="tasks-calendar">
            <div style={{ height: '50vh' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    // @ts-ignore
                    onRowClick={handleRowClick}
                />
            </div>
        </div>
    );
};

export default TaskGridComponent;

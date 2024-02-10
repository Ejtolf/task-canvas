import React from 'react';

import "../Styles/TaskDetailed.css";

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

interface TaskDetailedProps {
    task: Task | undefined;
}

const TaskDetailed: React.FC<TaskDetailedProps> = ({ task }) => {
    if (!task) {
        return <div className="no-tasks-were-selected-text">No task selected</div>;
    }

    return (
        <div className="taskDetailed">
            <h2>{task.title}</h2>
            <p>Description: {task.description || 'No description available'}</p>
            <p>Generation Time: {task.generationTime?.toLocaleString() || 'Not specified'}</p>
            <p>Deadline: {task.deadline || 'Not specified'}</p>
            <p>Is Important: {task.isImportant ? 'Yes' : 'No'}</p>
            <p>Is Urgently: {task.isUrgently ? 'Yes' : 'No'}</p>
            <p>Is Completed: {task.isCompleted}</p>
        </div>
    );
};

export default TaskDetailed;

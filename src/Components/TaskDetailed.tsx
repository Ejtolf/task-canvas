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
    const checkTaskParameters = (parameter: boolean) => parameter ? "td-par-true" : "td-par-false";

    if (!task) {
        return <div className="no-tasks-were-selected-text">No task selected</div>;
    }

    return (
        <div className="taskDetailed">

        </div>
    );
};

export default TaskDetailed;

import React from 'react';
import "../Styles/TaskDetailed.css";

interface TaskDetailedProps {
    rowData?: any;
}

const TaskDetailed: React.FC<TaskDetailedProps> = ({ rowData }) => {
    return (
        <div className="taskDetailed">
            {
                (rowData) ?
                    <>
                        <h2>Selected Task Details</h2>
                        <p>ID: {rowData.id}</p>
                        <p>Task Title: {rowData.taskTitle}</p>
                    </> :
                    <>
                        <h1 className="no-tasks-were-selected-text">No tasks were selected.</h1>
                    </>
            }
        </div>
    );
};

export default TaskDetailed;
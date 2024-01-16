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
                        <h1 className="no-tasks-were-selected-text">Task selected: {rowData.index}</h1>
                    </> :
                    <>
                        <h1 className="no-tasks-were-selected-text">No tasks were selected.</h1>
                    </>
            }
        </div>
    );
};

export default TaskDetailed;
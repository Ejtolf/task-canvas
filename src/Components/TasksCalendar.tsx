import React, { useState, useContext, createContext } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Alert, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import IsTaskPreparingContext from '../Context/contexts';
import CustomizedSnackbars from './Snackbars/Sliders';

import "../Styles/TasksCalendar.css";

interface Task {
    index: number;
    title: string;
    description?: string;
    deadline?: string;
    isImportant: boolean;
    isUrgently: boolean;
    isCompleted: string;
}

interface TaskList {
    tasks?: Task[];
}

const TaskGridComponent: React.FC<TaskList> = ({ tasks }) => {
    const columns: GridColDef[] = [
        { field: 'index', headerName: '№', width: 70 },
        { field: 'title', headerName: 'Task title', width: 250 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'deadline', headerName: 'Deadline', width: 130 },
        { field: 'isCompleted', headerName: 'Status', width: 130 },
    ];

    const rows = (tasks || []).map((task: Task, index) => ({
        id: index + 1,
        index: task.index,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        isCompleted: task.isCompleted,
    }));

    return (
        <div className="tasks-calendar">
            <div style={{ height: '50vh' }}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                />
            </div>
        </div>
    );
};



const TaskPreparingComponent: React.FC = () => {
    const { isTaskPreparing, setIsTaskPreparing } = useContext(IsTaskPreparingContext);
    const [taskList, setTaskList] = useState<Task[]>();
    const [taskTitle, setTaskTitle] = useState("");
    const [inputedText, setInputedText] = useState("");
    const [deadlineTime, setDeadlineTime] = useState("");

    const handleAddTaskToTableGrid = () => {
        const newTask: Task = {
            index: 2,
            title: taskTitle,
            description: inputedText,
            deadline: deadlineTime,
            isImportant: true,
            isUrgently: true,
            isCompleted: "Not completed"
        };

        setTaskList((prevTaskList) => prevTaskList ? [...prevTaskList, newTask] : [newTask]);
        setIsTaskPreparing(false);

        return <TaskGridComponent tasks={taskList} />
    }


    const formatText = () => {
        let formattedText = inputedText;

        formattedText = formattedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>'); // жирный
        formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>'); // курсив

        setInputedText(formattedText);
    };

    if (isTaskPreparing === true) {
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
                        if (taskTitle.trim() === "" && inputedText.trim() === "") {
                            formatText();
                            // <CustomizedSnackbars handleClick={() => setOpenAlert(!openAlert)} alertOpen={openAlert} message={"!"} />
                            //! ADD LOGIC HERE.
                            alert("No fields was filled.");
                        } else {
                            // <CustomizedSnackbars handleClick={() => setOpenAlert(!openAlert)} alertOpen={openAlert} message={"?"} />
                            //! ADD LOGIC HERE.
                            handleAddTaskToTableGrid();
                            // setIsTaskPreparing(false);
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
    } else {
        return <TaskGridComponent />
    }
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
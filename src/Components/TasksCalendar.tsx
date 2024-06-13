import React, { useState, useEffect } from 'react';
import TaskPreparingComponent from './TasksCalendarChildren/TaskPreparingComponent';
import TaskGridComponent from './TasksCalendarChildren/TaskGridComponent';
import TaskDetailed from './TaskDetailed';
import Task from "./Task";
import { saveAs } from "file-saver";

// Material UI
import { Button } from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import '../Styles/TasksCalendar.css';

interface TasksCalendarProps {
    setTasks: (tasks: Task[]) => void;
}

const TasksCalendar: React.FC<TasksCalendarProps> = ({ setTasks }) => {
    const [isPreparingComponentOpen, setIsPreparingComponentOpen] = useState<boolean>(false);

    const [tasks, setInternalTasks] = useState<Task[]>([]);
    const [chosenTaskId, setChosenTaskId] = useState<number | undefined>(undefined);

    const handleUpdateTaskStatus = (taskId: number, newStatus: string) => {
        setInternalTasks((oldTasks) =>
            oldTasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isCompleted: newStatus };
                }
                return task;
            })
        );
    };

    const handleTaskAdd = (newTask: Task) => {
        setInternalTasks((oldTasks) => [...oldTasks, newTask]);
        setIsPreparingComponentOpen(false);
    };

    const handleChooseTask = (chosenTask: Task) => {
        setChosenTaskId(chosenTask.id);
    };

    useEffect(() => {
        setTasks(tasks);
    }, [tasks, setTasks]);

    const handleChangeComponent = () => {
        setIsPreparingComponentOpen(!isPreparingComponentOpen);
    }

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

    const handleLoadTasks = () => {
        console.log("Load the tasks.");
    }

    const startIconForAddTask = isPreparingComponentOpen ? <DisabledByDefaultIcon /> : <AddBoxIcon />;

    return (
        <>
            <Button onClick={handleChangeComponent} variant="outlined" startIcon={startIconForAddTask}>
                {isPreparingComponentOpen ? "Cancel" : "Add Task"}
            </Button>
            <Button onClick={handleSaveTasks} variant="outlined" startIcon={<UploadOutlinedIcon />}>
                Save
            </Button>
            <Button onClick={handleLoadTasks} variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>
                Load
            </Button>
            {isPreparingComponentOpen ? (
                <TaskPreparingComponent isTaskPreparing={isPreparingComponentOpen} onTaskAdd={handleTaskAdd} />
            ) : (
                <TaskGridComponent tasks={tasks} onTaskChoice={handleChooseTask} />
            )}
            <TaskDetailed task={tasks.find((task) => task.id === chosenTaskId)} taskId={chosenTaskId} onUpdateTaskStatus={handleUpdateTaskStatus} />
        </>
    );
};

export default TasksCalendar;
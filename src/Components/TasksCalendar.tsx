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

    const [tasks, setInternalTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [chosenTaskId, setChosenTaskId] = useState<number | undefined>(undefined);
    const [isTasksSaved, setIsTasksSaved] = useState<boolean>(!!localStorage.getItem("tasks"));

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

        setIsTasksSaved(false);
    };

    const handleChooseTask = (chosenTask: Task) => {
        setChosenTaskId(chosenTask.id);
    };

    useEffect(() => {
        setTasks(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks, setTasks]);

    const handleChangeComponent = () => {
        setIsPreparingComponentOpen(!isPreparingComponentOpen);
    }

    const handleSaveTasks = () => {
        if (isTasksSaved) {
            const shouldSaveAgain = window.confirm("TASKS ALREADY SAVED. Would you like to save them again?");
            if (!shouldSaveAgain) {
                return;
            }
        }

        if (tasks.length === 0) {
            alert("The list of tasks is empty.");
            return;
        }

        const listName = prompt("Please enter your list of tasks name", "TaskCanvas List");
        if (listName === null || listName.trim() === "") {
            alert("List name cannot be empty.");
            return;
        }

        const tasksJSON = JSON.stringify(tasks);
        const blob = new Blob([tasksJSON], { type: "application/json" });
        saveAs(blob, `${listName.trim()}.json`);

        setIsTasksSaved(true);
    };

    const handleLoadTasks = () => {
        const handleSelectAndLoad = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.click();

            input.onchange = async () => {
                if (input.files && input.files[0]) {
                    setInternalTasks([]);
                    try {
                        const fileReader = new FileReader();
                        fileReader.onload = (event) => {
                            const data: Task[] = JSON.parse(event.target?.result as string);
                            setInternalTasks(data);
                        };
                        fileReader.readAsText(input.files[0]);

                        setIsTasksSaved(true);
                    } catch (error) {
                        alert("The .json file is not suitable for TaskCanvas.");
                    }
                }
            }
        }

        if (!isTasksSaved && tasks.length !== 0) {
            if (window.confirm("TASKS ARE NOT SAVED! Would you like to save them?")) {
                handleSaveTasks();
            }
        }

        handleSelectAndLoad()
    }

    const startIconForAddTask = isPreparingComponentOpen ? <DisabledByDefaultIcon /> : <AddBoxIcon />;

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                    <Button onClick={handleChangeComponent} variant="outlined" startIcon={startIconForAddTask}>
                        {isPreparingComponentOpen ? "Cancel" : "Add Task"}
                    </Button>
                    <Button onClick={handleSaveTasks} variant="outlined" startIcon={<UploadOutlinedIcon />}>
                        Save
                    </Button>
                    <Button onClick={handleLoadTasks} variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>
                        Load
                    </Button>
                </span>
                <span>
                    <p style={{ color: isTasksSaved ? "green" : "red", marginRight: "25px" }}>
                        {isTasksSaved ? "Saved" : "Not saved"}
                    </p>
                </span>
            </div>
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

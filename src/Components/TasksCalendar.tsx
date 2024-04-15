// TasksCalendar.tsx
import React, { useContext, useState, useEffect } from 'react';
import IsTaskPreparingContext from '../Context/contexts';
import TaskPreparingComponent from './TasksCalendarChildren/TaskPreparingComponent';
import TaskGridComponent from './TasksCalendarChildren/TaskGridComponent';
import TaskDetailed from './TaskDetailed';
import Task from "./Task";

import '../Styles/TasksCalendar.css';

interface TasksCalendarProps {
    setTasks: (tasks: Task[]) => void;
}

const TasksCalendar: React.FC<TasksCalendarProps> = ({ setTasks }) => {
    const { isTaskPreparing } = useContext(IsTaskPreparingContext);

    const [tasks, setInternalTasks] = useState<Task[]>([]);
    const [chosenTaskId, setChosenTaskId] = useState<number | undefined>(undefined);

    const handleTaskAdd = (newTask: Task) => {
        setInternalTasks((old) => [...old, newTask]);
    };

    const handleChooseTask = (chosenTask: Task) => {
        setChosenTaskId(chosenTask.id);
    };

    useEffect(() => {
        setTasks(tasks);
    }, [tasks, setTasks]);

    return (
        <>
            {isTaskPreparing ? (
                <TaskPreparingComponent onTaskAdd={handleTaskAdd} />
            ) : (
                <TaskGridComponent tasks={tasks} onTaskChoice={handleChooseTask} />
            )}

            <TaskDetailed task={tasks.find((task) => task.id === chosenTaskId)} />
        </>
    );
};

export default TasksCalendar;

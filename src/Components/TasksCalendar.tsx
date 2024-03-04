// TasksCalendar.tsx
import React, { useContext, useState } from 'react';
import IsTaskPreparingContext from '../Context/contexts';
import TaskPreparingComponent from './TasksCalendarChildren/TaskPreparingComponent';
import TaskGridComponent from './TasksCalendarChildren/TaskGridComponent';
import TaskDetailed from './TaskDetailed';
import TaskGraphs from "./TaskGraphs";

import '../Styles/TasksCalendar.css';

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

interface TasksCalendarProps {
    taskList?: Task[];
}

const TasksCalendar: React.FC<TasksCalendarProps> = () => {
    const { isTaskPreparing } = useContext(IsTaskPreparingContext);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [chosenTaskId, setChosenTaskId] = useState<number | undefined>(undefined);

    const handleTaskAdd = (newTask: Task) => {
        setTasks((old) => [...old, newTask]);
    };

    const handleChooseTask = (chosenTask: Task) => {
        console.log(chosenTask);
        setChosenTaskId(chosenTask.id);
    };

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

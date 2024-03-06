// TasksCalendar.tsx
import React, { useContext, useState, useEffect } from 'react';
import IsTaskPreparingContext from '../Context/contexts';
import TaskPreparingComponent from './TasksCalendarChildren/TaskPreparingComponent';
import TaskGridComponent from './TasksCalendarChildren/TaskGridComponent';
import TaskDetailed from './TaskDetailed';

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
    getTaskList?: () => Task[] | undefined
}

const TasksCalendar: React.FC<TasksCalendarProps & { setNumberOfTasks: (num: number) => void }> = ({ taskList, getTaskList, setNumberOfTasks }) => {
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

    useEffect(() => {
        setNumberOfTasks(tasks.length);
    }, [tasks, setNumberOfTasks]);


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

import React, { useContext, useState } from 'react';
import IsTaskPreparingContext from '../Context/contexts';
import TaskPreparingComponent from './TasksCalendarChildren/TaskPreparingComponent';
import TaskGridComponent from './TasksCalendarChildren/TaskGridComponent';

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

const TasksCalendar: React.FC<TasksCalendarProps> = (props) => {
    const { isTaskPreparing } = useContext(IsTaskPreparingContext);

    const [tasks, setTasks] = useState<Task[]>([]);
    const handleTaskAdd = (newTask: Task) => {
        setTasks(old => ([...old, newTask]))
    }

    return (
        <>
            {isTaskPreparing ? <TaskPreparingComponent onTaskAdd={handleTaskAdd} /> : <TaskGridComponent tasks={tasks} />}
        </>
    );
}

export default TasksCalendar;

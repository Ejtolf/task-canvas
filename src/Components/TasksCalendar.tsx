import React, { useContext } from 'react';
import IsTaskPreparingContext from '../Context/contexts';
import TaskPreparingComponent from './TasksCalendarChildren/TaskPreparingComponent';
import TaskGridComponent from './TasksCalendarChildren/TaskGridComponent';

interface Task {
    index?: number;
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

    return (
        <>
            {isTaskPreparing ? <TaskPreparingComponent /> : <TaskGridComponent tasks={props.taskList || []} />}
        </>
    );
}

export default TasksCalendar;

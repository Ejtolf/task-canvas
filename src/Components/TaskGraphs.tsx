import React from "react";
import Task from "./Task";
import CompletedStatuses from "./CompletedStatuses";

import "../Styles/TaskGraphs.css";

interface TaskGraphsProps {
    tasks?: Task[];
}

//TODO: "Kanban task".
const KanbanGridComponent: React.FC<TaskGraphsProps> = ({ tasks }) => {
    const completedTasks = tasks?.filter(task => task.isCompleted === CompletedStatuses[2]); // Completed.
    const inProcessTasks = tasks?.filter(task => task.isCompleted === CompletedStatuses[1]); // In process.
    const notCompletedTasks = tasks?.filter(task => task.isCompleted === CompletedStatuses[0]); // Not completed.

    return (
        <div className="kanban-board">
            <div className="column todo">
                <h3 className="kanban-header-h2-todo">To Do</h3>
                {/* Rendering tasks marked as 'Not completed' */}
                {notCompletedTasks?.map(task => (
                    <div className="task" key={task.id}>{task.title}</div>
                ))}
            </div>
            <div className="column in-process">
                <h3 className="kanban-header-h2-in-process">In Process</h3>
                {/* Rendering tasks marked as 'In process' */}
                {inProcessTasks?.map(task => (
                    <div className="task" key={task.id}>{task.title}</div>
                ))}
            </div>
            <div className="column done">
                <h3 className="kanban-header-h2-done">Done</h3>
                {/* Rendering tasks marked as 'Completed' */}
                {completedTasks?.map(task => (
                    <div className="task" key={task.id}>{task.title}</div>
                ))}
            </div>
        </div>
    );
}

//TODO: Матрица Эйзенхауэра.
const EisenhowersMatrix: React.FC<TaskGraphsProps> = ({ tasks }) => {
    // return <h1>Матрица Эйзенхауэра</h1>
    return (
        <div className="eisenhower-matrix">
            {
                tasks?.length === 0 ? (<>
                    <div className="quadrant" id="important-urgent">Important & Urgent</div>
                    <div className="quadrant" id="important-not-urgent">Important & Not Urgent</div>
                    <div className="quadrant" id="not-important-urgent">Not Important & Urgent</div>
                    <div className="quadrant" id="not-important-not-urgent">Not Important & Not Urgent</div>
                </>) : (<h1>Tasks Not Found.</h1>)}
        </div>
    )
}

//TODO: Ещё не придумано.
const AnotherOneMatrix: React.FC = () => {
    return <h1>???</h1>
}

const TaskGraphs: React.FC<TaskGraphsProps> = ({ tasks }) => {
    const [mode, setMode] = React.useState<number>(1);

    const handleChangeMode = (numberOfMode: number) => {
        setMode(numberOfMode);
    }

    return (
        <div className="taskGraphs">
            {/* <div className="TaskGraphs"> */}
            <div className="graphs-header-buttons">
                <button className="MatrixMode" onClick={() => handleChangeMode(1)}>Matrix...</button>
                <button className="KANBANMODE" onClick={() => handleChangeMode(2)}>KANBAN</button>
                <button className="AnythingSection" onClick={() => handleChangeMode(3)}>Other...</button>
            </div>
            <div>{(() => {
                switch (mode) {
                    case 1:
                        return <EisenhowersMatrix tasks={tasks} />
                    case 2:
                        return <KanbanGridComponent tasks={tasks} />
                    default:
                        return <AnotherOneMatrix />
                }
            })()}</div>
        </div>
        // </div>
    );
}

export default TaskGraphs;

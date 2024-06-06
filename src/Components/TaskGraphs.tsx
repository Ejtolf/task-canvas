import React, { useState } from "react";
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
                <h3 className="kanban-header-h2-todo">To Do ({notCompletedTasks?.length})</h3>
                {/* Rendering tasks marked as 'Not completed' */}
                {notCompletedTasks?.map(task => (
                    <div className="task" key={task.id}>
                        <span className="task-id">{task.id}:</span>
                        <span className="task-title">{task.title}</span>
                    </div>
                ))}
            </div>
            <div className="column in-process">
                <h3 className="kanban-header-h2-in-process">In Process ({inProcessTasks?.length})</h3>
                {/* Rendering tasks marked as 'In process' */}
                {inProcessTasks?.map(task => (
                    <div className="task" key={task.id}>
                        <span className="task-id">{task.id}:</span>
                        <span className="task-title">{task.title}</span>
                    </div>
                ))}
            </div>
            <div className="column done">
                <h3 className="kanban-header-h2-done">Done ({completedTasks?.length})</h3>
                {/* Rendering tasks marked as 'Completed' */}
                {completedTasks?.map(task => (
                    <div className="task" key={task.id}>
                        <span className="task-id">{task.id}:</span>
                        <span className="task-title">{task.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

//TODO: Матрица Эйзенхауэра.
const EisenhowersMatrix: React.FC<TaskGraphsProps> = ({ tasks }) => {
    const IMP_URG = tasks?.filter(task => task.isImportant === true && task.isUrgently === true);
    const IMP_nURG = tasks?.filter(task => task.isImportant === true && task.isUrgently === false);
    const nIMP_URG = tasks?.filter(task => task.isImportant === false && task.isUrgently === true);
    const nIMP_nURG = tasks?.filter(task => task.isImportant === false && task.isUrgently === false);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="eisenhower-matrix">
            <div className="em-matrix-part">
                {tasks && tasks.length > 0 ? <>
                    <div className="quadrant" id="important-urgent">
                        {IMP_URG?.map((task, id) => (
                            <p className="task-list-for-matrix" key={id}>{task.id}: {task.title}</p>
                        ))}
                    </div>
                    <div className="quadrant" id="important-not-urgent">
                        {IMP_nURG?.map((task, id) => (
                            <p className="task-list-for-matrix" key={id}>{task.id}: {task.title}</p>
                        ))}
                    </div>
                    <div className="quadrant" id="not-important-urgent">
                        {nIMP_URG?.map((task, id) => (
                            <p className="task-list-for-matrix" key={id}>{task.id}: {task.title}</p>
                        ))}
                    </div>
                    <div className="quadrant" id="not-important-not-urgent">
                        {nIMP_nURG?.map((task, id) => (
                            <p className="task-list-for-matrix" key={id}>{task.id}: {task.title}</p>
                        ))}
                    </div>
                </> : <p>No tasks in database.</p>}
            </div>
            <div className="em-statistics-part">
                <h1>STATISTICS</h1>
                <hr />
                <h4 className="imp-urg-lab" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Important & Urgent</h4>
                <p>{IMP_URG?.length}</p>
                <h4 className="imp-nurg-lab" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Important & Not Urgent</h4>
                <p>{IMP_nURG?.length}</p>
                <h4 className="nimp-urg-lab" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Not Important & Urgent</h4>
                <p>{nIMP_URG?.length}</p>
                <h4 className="nimp-nurg-lab" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Not Important & Not Urgent</h4>
                <p>{nIMP_nURG?.length}</p>
            </div>
        </div>
    );
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

    const checkForInsideOfGraph = (tabNumber: number): string => {
        return mode == tabNumber ? "inside" : "outside"
    }

    return (
        <div className="taskGraphs">
            {/* <div className="TaskGraphs"> */}
            <div className="graphs-header-buttons">
                <button id="MatrixMode" className={checkForInsideOfGraph(1)} onClick={() => handleChangeMode(1)}>Matrix...</button>
                <button id="KANBANMODE" className={checkForInsideOfGraph(2)} onClick={() => handleChangeMode(2)}>KANBAN</button>
                <button id="AnythingSection" className={checkForInsideOfGraph(3)} onClick={() => handleChangeMode(3)}>Other...</button>
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
    );
}

export default TaskGraphs;

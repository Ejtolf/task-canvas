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
                <h3 className="kanban-header-h2-todo">To Do ({notCompletedTasks?.length})</h3>
                {/* Rendering tasks marked as 'Not completed' */}
                {notCompletedTasks?.map(task => (
                    <div className="task" key={task.id}>{task.id}: {task.title}</div>
                ))}
            </div>
            <div className="column in-process">
                <h3 className="kanban-header-h2-in-process">In Process ({inProcessTasks?.length})</h3>
                {/* Rendering tasks marked as 'In process' */}
                {inProcessTasks?.map(task => (
                    <div className="task" key={task.id}>{task.id}: {task.title}</div>
                ))}
            </div>
            <div className="column done">
                <h3 className="kanban-header-h2-done">Done ({completedTasks?.length})</h3>
                {/* Rendering tasks marked as 'Completed' */}
                {completedTasks?.map(task => (
                    <div className="task" key={task.id}>{task.id}: {task.title}</div>
                ))}
            </div>
        </div>
    );
}

//TODO: Матрица Эйзенхауэра.
const EisenhowersMatrix: React.FC<TaskGraphsProps> = ({ tasks }) => {
    // return <h1>Матрица Эйзенхауэра</h1>
    const IMP_URG = tasks?.filter(task => task.isImportant === true && task.isUrgently === true);
    const IMP_nURG = tasks?.filter(task => task.isImportant === true && task.isUrgently === false);
    const nIMP_URG = tasks?.filter(task => task.isImportant === false && task.isUrgently === true);
    const nIMP_nURG = tasks?.filter(task => task.isImportant === false && task.isUrgently === false);

    return (
        <div className="eisenhower-matrix">
            <div className="em-matrix-part">
                {
                    tasks !== undefined ? (<>
                        {/* Important & Urgent */}
                        <div className="quadrant" id="important-urgent">
                            {IMP_URG?.map((task, id) => (
                                <p className="task-list-for-matrix" key={id}>{task.title}</p>
                            ))}
                        </div>
                        {/* Important & Not Urgent */}
                        <div className="quadrant" id="important-not-urgent">
                            {IMP_nURG?.map((task, id) => (
                                <p className="task-list-for-matrix" key={id}>{task.title}</p>
                            ))}
                        </div>
                        {/* Not Important & Urgent */}
                        <div className="quadrant" id="not-important-urgent">
                            {nIMP_URG?.map((task, id) => (
                                <p className="task-list-for-matrix" key={id}>{task.title}</p>
                            ))}
                        </div>
                        {/* Not Important & Not Urgent */}
                        <div className="quadrant" id="not-important-not-urgent">
                            {nIMP_nURG?.map((task, id) => (
                                <p className="task-list-for-matrix" key={id}>{task.title}</p>
                            ))}
                        </div>
                    </>) : (<h1>Tasks Not Found.</h1>)}
            </div>
            <div className="em-statistics-part">
                <h1>STATISTICS</h1>
                <hr />
                <h4>Important & Urgently</h4>
                <p>{IMP_URG?.length}</p>
                <h4>Important & Not urgently</h4>
                <p>{IMP_nURG?.length}</p>
                <h4>Not important & Urgently</h4>
                <p>{nIMP_URG?.length}</p>
                <h4>Not important & Not urgently</h4>
                <p>{nIMP_nURG?.length}</p>
            </div>
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

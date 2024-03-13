import React from "react";
import Task from "./Task";

import "../Styles/TaskGraphs.css";

interface TaskGraphsProps {
    tasks?: Task[];
}

//TODO: "Таблица Канбан".
const KanbanGridComponent: React.FC<TaskGraphsProps> = ({ tasks }) => {
    return (
        <div className="TaskGraphs">
            <div className="kanban-board">
                <div className="column todo">
                    <h3 className="kanban-header-h2-todo">To Do</h3>
                    <div className="task">Task 1</div>
                    <div className="task">Task 2</div>
                    <div className="task">Task 3</div>
                </div>
                <div className="column in-process">
                    <h3 className="kanban-header-h2-in-process">In Process</h3>
                    <div className="task">Task 4</div>
                    <div className="task">Task 5</div>
                </div>
                <div className="column done">
                    <h3 className="kanban-header-h2-done">Done</h3>
                    <div className="task">Task 6</div>
                </div>
            </div>
        </div >
    );
}

//TODO: Матрица Эйзенхауэра.
const MatrixFirst: React.FC = () => {
    return <h1>Матрица Эйзенхауэра</h1>
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
            <div className="graphs-header-buttons">
                <button className="MatrixMode" onClick={() => handleChangeMode(1)}>Matrix...</button>
                <button className="KANBANMODE" onClick={() => handleChangeMode(2)}>KANBAN</button>
                <button className="AnythingSection" onClick={() => handleChangeMode(3)}>Other...</button>
            </div>
            <div>{(() => {
                switch (mode) {
                    case 1:
                        return <MatrixFirst />
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

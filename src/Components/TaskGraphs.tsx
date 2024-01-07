import React from "react";

import "../Styles/TaskGraphs.css";

const KanbanGridComponent: React.FC = () => {
    return (
        <div className="task-graphs">
            <div className="kanban-board">
                <div className="column">
                    <h3 className="kanban-header-h2">To Do</h3>
                    <div className="task">Task 1</div>
                    <div className="task">Task 2</div>
                    <div className="task">Task 3</div>
                </div>
                <div className="column">
                    <h3 className="kanban-header-h2">In Process</h3>
                    <div className="task">Task 4</div>
                    <div className="task">Task 5</div>
                </div>
                <div className="column">
                    <h3 className="kanban-header-h2">Done</h3>
                    <div className="task">Task 6</div>
                </div>
            </div>

        </div >
    );
}

const MatrixFirst: React.FC = () => {
    return <h1>Матрица Эйзенхауэра</h1>
}

const AnotherOneMatrix: React.FC = () => {
    return <h1>Чёто ещё</h1>
}

const TaskGraphs: React.FC = () => {
    const [mode, setMode] = React.useState<number>(1);

    const handleChangeMode = (numberOfMode: number) => {
        setMode(numberOfMode);
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <button onClick={() => handleChangeMode(1)}>Matrix...</button>
                <button onClick={() => handleChangeMode(2)}>KANBAN</button>
                <button onClick={() => handleChangeMode(3)}>Anything...</button>
            </div>
            <div>{(() => {
                switch (mode) {
                    case 1:
                        return <MatrixFirst />
                    case 2:
                        return <KanbanGridComponent />
                    default:
                        return <AnotherOneMatrix />
                }
            })()}</div>
        </div>
    );
}

export default TaskGraphs;

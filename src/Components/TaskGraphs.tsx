import React, { useState, PureComponent } from "react";
import CompletedStatuses from "./CompletedStatuses";
import Task from "./Task";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

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
                            <div className="task" key={task.id}>
                                <span className="task-id">{task.id}:</span>
                                <span className="task-title">{task.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="quadrant" id="important-not-urgent">
                        {IMP_nURG?.map((task, id) => (
                            <div className="task" key={task.id}>
                                <span className="task-id">{task.id}:</span>
                                <span className="task-title">{task.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="quadrant" id="not-important-urgent">
                        {nIMP_URG?.map((task, id) => (
                            <div className="task" key={task.id}>
                                <span className="task-id">{task.id}:</span>
                                <span className="task-title">{task.title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="quadrant" id="not-important-not-urgent">
                        {nIMP_nURG?.map((task, id) => (
                            <div className="task" key={task.id}>
                                <span className="task-id">{task.id}:</span>
                                <span className="task-title">{task.title}</span>
                            </div>
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

const Plots: React.FC<TaskGraphsProps> = ({ tasks }) => {
    if (!tasks) return <></>;

    const aggregatedData = tasks.reduce((acc: Record<string, number>, task) => {
        if (task.isImportant && task.isUrgently) {
            acc['Important & Urgent'] = (acc['Important & Urgent'] || 0) + 1;
        } else if (task.isImportant) {
            acc['Important'] = (acc['Important'] || 0) + 1;
        } else if (task.isUrgently) {
            acc['Urgent'] = (acc['Urgent'] || 0) + 1;
        } else {
            acc['Regular'] = (acc['Regular'] || 0) + 1;
        }
        return acc;
    }, {});

    const chartData = Object.keys(aggregatedData).map(key => ({
        name: key,
        value: aggregatedData[key],
    }));

    return (
        <div style={{ textAlign: 'center' }}>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ff7300', '#888888'][index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

const TaskGraphs: React.FC<TaskGraphsProps> = ({ tasks }) => {
    const [mode, setMode] = React.useState<number>(1);

    const handleChangeMode = (numberOfMode: number) => {
        setMode(numberOfMode);
    }

    const checkForInsideOfGraph = (tabNumber: number): string => {
        return mode === tabNumber ? "inside" : "outside"
    }

    return (
        <div className="taskGraphs">
            {/* <div className="TaskGraphs"> */}
            <div className="graphs-header-buttons">
                <button id="matrix-mode" className={checkForInsideOfGraph(1)} onClick={() => handleChangeMode(1)}>EisenhowersMatrix</button>
                <button id="kanban-mode" className={checkForInsideOfGraph(2)} onClick={() => handleChangeMode(2)}>Kanban board</button>
                <button id="plots-mode" className={checkForInsideOfGraph(3)} onClick={() => handleChangeMode(3)}>Visualisation</button>
            </div>
            <div>{(() => {
                switch (mode) {
                    case 1:
                        return <EisenhowersMatrix tasks={tasks} />
                    case 2:
                        return <KanbanGridComponent tasks={tasks} />
                    case 3:
                        return <Plots tasks={tasks} />
                }
            })()}</div>
        </div>
    );
}

export default TaskGraphs;

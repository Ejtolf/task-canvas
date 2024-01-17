import React from "react";
import "../Styles/TaskDetailed.css";

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

interface TaskDetailedProps {
    Task?: Task
}

const TaskDetailed: React.FC<TaskDetailedProps> = (taskProp) => {
    const sampleTask: Task = {
        index: 1,
        title: "Sample task title.",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde possimus officia tenetur sunt quo eum? Ut, quo atque cupiditate illo error vitae blanditiis inventore distinctio nam similique exercitationem recusandae alias.",
        generationTime: new Date(),
        deadline: "01.02.2024",
        isImportant: true,
        isUrgently: false,
        isCompleted: "Not Completed"
    }

    return (
        <div className="taskDetailed">
            {
                !taskProp ?
                    <>
                        <h1 className="no-tasks-were-selected-text">No task was selected.</h1>
                    </> :
                    <>
                        <div className="td-header">
                            <h1 className="td-task-title">{sampleTask.index}: {sampleTask.title}</h1>
                            <h1 className={
                                (() => {
                                    switch (sampleTask.isCompleted) {
                                        case "Not Completed":
                                            return "is-completed is-completed-not";
                                        case "In Work":
                                            return "is-completed is-completed-in-work";
                                        default:
                                            return "is-completed is-completed-done";
                                    }
                                })()
                            }>{sampleTask.isCompleted}</h1>
                        </div>
                        <hr />
                        <h3>{sampleTask.description}</h3>
                        <p>Created at {String(sampleTask.generationTime)}</p>
                        <p>Deadline: {sampleTask.deadline}</p>
                        <h3>{sampleTask.isImportant ? "IMPORTANT" : ""}</h3>
                        <h3>{sampleTask.isUrgently ? "URGENTLY" : ""}</h3>
                    </>
            }
        </div>
    );
}

export default TaskDetailed;

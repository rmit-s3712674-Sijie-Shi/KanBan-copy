import React from "react";
import styles from "./taskbox.module.css"
import TaskCard from "../tastcard/taskcard";



let status = {
    todo: "todo",
    doing: "doing",
    done: "done"
}
const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
    console.log(currentEvent)
    return (
        <>
            <div className={`task-box `}>
                <div className={styles.container}>
                    <div className={styles.column}>
                    <div className={styles.title}>To do </div>
                    {currentEvent.todo.map((value, i) => (
                        <TaskCard task={value} status={status.todo} key={i}></TaskCard>
                    ))}
                    </div>
                    <div className={styles.column}>
                       <div className={styles.title}>In Progress</div> 
                    </div>
                    <div className={styles.column}>
                    <div className={styles.title}> Done</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TaskBox;
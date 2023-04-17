import React from "react";
import styles from "./addtask.module.css"

const AddTask = ({currentEvent, setEvent, setShowAddTask, action}) => {
    let status = {
        todo: "todo",
        doing: "doing",
        done: "done"
    }
    return (
        <>
            <div className={styles.container}>
                <button className={styles.close} onClick={() => setShowAddTask(false)}>x</button>
                <div className={styles.title}>{
                    action === status.todo ? "Add new to do task" :
                    action === status.doing ? "Add new in progress task" :
                    action === status.done ? "Add new finished task" :
                    "Modify " + action
                }</div>
                <div>
                    <div>taskname</div>
                    <div>description</div>
                </div>
            </div>
        </>
    )
}

export default AddTask;
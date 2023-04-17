import React from "react";
import styles from "./addtask.module.css"

const AddTask = ({currentEvent, setEvent, setShowAddTask, action}) => {
    
    return (
        <>
            <div className={styles.container}>
                <button className={styles.close} onClick={() => setShowAddTask(false)}>x</button>
                <div className={styles.title}>{action}</div>
                <div>
                    <div>taskname</div>
                    <div>description</div>
                </div>
            </div>
        </>
    )
}

export default AddTask;
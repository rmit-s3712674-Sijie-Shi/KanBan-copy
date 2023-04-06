import React from "react";
import styles from "./taskcard.module.css";

const TaskCard = ({task, status, key}) => {
    console.log(task)
    return (
        <>
            <div key={key} className={styles.cardContainer}>
                <div className={styles.taskTitle}>
                    {task.taskName}
                </div>
            </div>
        </>
    )
}

export default TaskCard;
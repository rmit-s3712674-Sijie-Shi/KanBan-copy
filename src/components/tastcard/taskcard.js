import React from "react";
import styles from "./taskcard.module.css";

const TaskCard = ({task, status, handleRemove}) => {
    return (
        <>
            <div key={task.id} className={styles.cardContainer}>
                <div className={styles.taskTitle}>
                    {task.taskName}
                </div>
                <div className={styles.description}>
                    {task.detail.description}
                </div>
                <div className={styles.removeBar} onClick={() => handleRemove(status, task.id)}>
                    -
                </div>
            </div>
        </>
    )
}

export default TaskCard;
import React, { useState } from "react";
import styles from "./taskcard.module.css";

const TaskCard = ({task, status, handleRemove, provided, snapshot}) => {
    const [isShown, setIsShown] = useState(false);

    return (
        <>
            <div key={task.id} 
                 className={styles.cardContainer}
                 ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
                 onMouseEnter={() => setIsShown(true)}
                 onMouseLeave={() => setIsShown(false)}
                 >
                <div className={styles.taskTitle}>
                    {task.taskName}
                </div>
                <div className={styles.description}>
                    {task.detail.description}
                </div>
                {
                    isShown ? 
                    <div className={styles.detailHolder}>
                    <div className={styles.detailButton}>
                        detail
                    </div>
                    <div className={styles.deleteButton} onClick={() => handleRemove(status, task.id)}>
                        delete
                    </div>
                    </div> 
                    : null
                }
            </div>
        </>
    )
}

export default TaskCard;
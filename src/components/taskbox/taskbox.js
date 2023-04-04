import React, { useCallback } from "react";
import styles from "./taskbox.module.css"
import TaskCard from "../tastcard/taskcard";
import AddButton from "../addbutton/AddButton";



let status = {
    todo: "todo",
    doing: "doing",
    done: "done"
}
const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
    console.log(currentEvent)
    const handleAddingEvent = useCallback((status) => {
        const task = prompt("enter a task :")
        if(!task) return
        if(!currentEvent[status].find(res => res === task)) {
            setEvents((prev) => 
            {
                let arrayCopy = [...prev]
                const index = prev.findIndex((event) => event.title === currentEvent.title)
                let eventCopy = arrayCopy[index]
                eventCopy[status].push(task)
                arrayCopy.splice(index, 1, eventCopy)
                //console.log(arrayCopy)
                return arrayCopy
            }
            )
        } else {
            alert("exist task")
        }
    }, [events])
    return (
        <>
            <div className={`task-box `}>
                <div className={styles.container}>
                    <div className={styles.column}>
                    <div className={styles.title}>To do </div>
                    <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.todo)}></AddButton></div>
                    
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
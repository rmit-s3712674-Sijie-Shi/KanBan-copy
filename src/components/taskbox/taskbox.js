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
                const arrayCopy = [...prev]
                const index = prev.findIndex((event) => event.title === currentEvent.title)
                const eventCopy = arrayCopy[index]
                eventCopy[status].push(task)
                arrayCopy.splice(index, 1, eventCopy)
                console.log(eventCopy[status])
                return arrayCopy
            }
            )
        } else {
            alert("exist task")
        }
    }, [currentEvent])
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
                       <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.doing)}></AddButton></div>
                    
                    {currentEvent.doing.map((value, i) => (
                        <TaskCard task={value} status={status.doing} key={i}></TaskCard>
                    ))}
                    </div>
                    <div className={styles.column}>
                    <div className={styles.title}> Done</div>
                    <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.done)}></AddButton></div>
                    
                    {currentEvent.done.map((value, i) => (
                        <TaskCard task={value} status={status.done} key={i}></TaskCard>
                    ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default TaskBox;
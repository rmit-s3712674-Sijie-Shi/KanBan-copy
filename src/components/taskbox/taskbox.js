import React, { useCallback } from "react";
import styles from "./taskbox.module.css"
import TaskCard from "../tastcard/taskcard";
import AddButton from "../addbutton/AddButton";
import uuid from "react-uuid";



let status = {
    todo: "todo",
    doing: "doing",
    done: "done"
}
const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
    console.log(currentEvent)
    const handleAddingEvent = useCallback((status) => {
        const taskTtile = prompt("enter a task :")
        const task = {
            taskName: taskTtile,
            id: uuid(),
            detail: {description: "description"}
        }
        if (!task) return
            setEvents((prev) => {
                const arrayCopy = [...prev]
                const index = prev.findIndex((event) => event.title === currentEvent.title)
                const eventCopy = arrayCopy[index]
                eventCopy[status].push(task)
                arrayCopy.splice(index, 1, eventCopy)
                console.log(eventCopy[status])
                return arrayCopy
            }
            )
    }, [currentEvent])

    const handleRemovingEvent = useCallback((status, id) => {
        setEvents((prev) => {
            const arrayCopy = [...prev]
            const index = prev.findIndex((event) => event.title === currentEvent.title)
            const eventCopy = arrayCopy[index]
            eventCopy[status].filter(res => res.id !== id)
            console.log(eventCopy[status])
            return arrayCopy
        })
    }, [currentEvent])

    return (
        <>
            <div className={`task-box `}>
                <div className={styles.container}>
                    <div className={styles.column}>
                        <div className={styles.title}>To do </div>
                        <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.todo)}></AddButton></div>

                        {currentEvent.todo.map((value) => (
                            <TaskCard task={value} status={status.todo} key={value.id}></TaskCard>
                        ))}
                    </div>
                    <div className={styles.column}>
                        <div className={styles.title}>In Progress</div>
                        <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.doing)}></AddButton></div>

                        {currentEvent.doing.map((value) => (
                            <TaskCard task={value} status={status.doing} key={value.id}></TaskCard>
                        ))}
                    </div>
                    <div className={styles.column}>
                        <div className={styles.title}> Done</div>
                        <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.done)}></AddButton></div>

                        {currentEvent.done.map((value) => (
                            <TaskCard task={value} status={status.done} key={value.id}></TaskCard>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default TaskBox;
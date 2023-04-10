import React, { useCallback } from "react";
import styles from "./taskbox.module.css"
import TaskCard from "../tastcard/taskcard";
import AddButton from "../addbutton/AddButton";
import uuid from "react-uuid";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";


let status = {
    todo: "todo",
    doing: "doing",
    done: "done"
}
const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
    const handleAddingEvent = useCallback((status) => {
        const taskTtile = prompt("enter a task :")
        const task = {
            taskName: taskTtile,
            id: uuid(),
            detail: {description: "description"}
        }
        if (!taskTtile) return
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
        console.log(status, id)
        setEvents((prev) => {
            const arrayCopy = [...prev]
            const index = prev.findIndex((event) => event.title === currentEvent.title)
            //const eventCopy = arrayCopy[index]
            arrayCopy[index][status] = arrayCopy[index][status].filter(res => res.id !== id)
            //arrayCopy.splice(index, 1, target)
            console.log(arrayCopy)
            //console.log(eventCopy)
            return arrayCopy
        })
    }, [currentEvent])

    return (
        <>
            <div className={`task-box `}>
                <DragDropContext>
                <div className={styles.container}>
                    <Droppable droppableId={"todo"}>
                    {(provided, snapshot) => {
                        return(
                            <div className={styles.column}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            >
                            <div className={styles.title}>To do </div>
                            <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.todo)}></AddButton></div>
                            {currentEvent.todo.map((value, index) => (
                                <Draggable key={value.id} draggableId={value.id} index={index}>
                                    {(provided, snapshot) => (
                                        <TaskCard task={value} status={status.todo} handleRemove={handleRemovingEvent} provided={provided} snapshot={snapshot}></TaskCard>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                        )
                    }}
                    </Droppable>
                    <Droppable droppableId={"doing"}>
                    <div className={styles.column}>
                        <div className={styles.title}>In Progress</div>
                        <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.doing)}></AddButton></div>

                        {currentEvent.doing.map((value, index) => (
                            <Draggable key={value.id} draggableId={value.id} index={index}>
                            <TaskCard task={value} status={status.doing}></TaskCard>
                            </Draggable>
                        ))}
                    </div>
                    </Droppable>
                    <Droppable droppableId={"done"}>
                    <div className={styles.column}>
                        <div className={styles.title}> Done</div>
                        <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.done)}></AddButton></div>

                        {currentEvent.done.map((value, index) => (
                            <Draggable key={value.id} draggableId={value.id} index={index}>
                            <TaskCard task={value} status={status.done}></TaskCard>
                            </Draggable>
                        ))}
                    </div>
                    </Droppable>
                </div>
                </DragDropContext>

            </div>
        </>
    )
}

export default TaskBox;
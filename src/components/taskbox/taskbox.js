import React, { useCallback, useState } from "react";
import styles from "./taskbox.module.css"
import TaskCard from "../tastcard/taskcard";
import AddButton from "../addbutton/AddButton";
import uuid from "react-uuid";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import { TaskTemplate } from "../types"
import AddTask from "../addtask/addtask";


let status = {
    todo: "todo",
    doing: "doing",
    done: "done"
}

const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
    const [showAddTask, setShowAddTask] = useState(false)

    const handleAddingEvent = useCallback((status) => {
        const taskTtile = prompt("enter a task :")
        setShowAddTask(true)
        const task = {
            taskName: taskTtile,
            id: uuid(),
            detail: { description: "description description description description description description description" }
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

    const handleDragEnd = useCallback((result) => {
        if (!result.destination) return
        const status = result.source.droppableId
        const sourceIndex = result.source.index
        const targetStatus = result.destination.droppableId
        const destinationIndex = result.destination.index
        setEvents((prev) => {
            const arrayCopy = [...prev]
            const index = prev.findIndex((event) => event.title === currentEvent.title)
            let task = arrayCopy[index][status].splice(sourceIndex, 1)
            console.log(task)
            arrayCopy[index][targetStatus].splice(destinationIndex, 0, ...task)
            //console.log(arrayCopy[index][targetStatus])
            return arrayCopy
        })
    }, [currentEvent])

    return (
        <>
            <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                <div className={styles.container}>
                    <div className={styles.column}>
                        <div className={styles.title}>To do </div>
                        <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.todo)}></AddButton></div>
                        <Droppable droppableId={"todo"}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {currentEvent.todo.map((value, index) => (
                                        <Draggable key={value.id} draggableId={value.id} index={index}>
                                            {(provided, snapshot) => (
                                                <TaskCard task={value} status={status.todo} handleRemove={handleRemovingEvent} provided={provided} snapshot={snapshot}></TaskCard>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>

                            )
                            }
                        </Droppable>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.title}>In Progress</div>
                        <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.doing)}></AddButton></div>
                        <Droppable droppableId={"doing"}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >

                                    {currentEvent.doing.map((value, index) => (
                                        <Draggable key={value.id} draggableId={value.id} index={index}>
                                            {(provided, snapshot) => (
                                                <TaskCard task={value} status={status.doing} handleRemove={handleRemovingEvent} provided={provided} snapshot={snapshot}></TaskCard>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )
                            }
                        </Droppable>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.title}> Done</div>
                        <div className={styles.addButton}><AddButton handler={() => handleAddingEvent(status.done)}></AddButton></div>
                        <Droppable droppableId={"done"}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {currentEvent.done.map((value, index) => (
                                        <Draggable key={value.id} draggableId={value.id} index={index}>
                                            {(provided, snapshot) => (
                                                <TaskCard task={value} status={status.done} handleRemove={handleRemovingEvent} provided={provided} snapshot={snapshot}></TaskCard>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )
                            }
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
            {showAddTask ? <AddTask setShowAddTask={setShowAddTask}></AddTask>: null}                
        </>
    )
}

export default TaskBox;
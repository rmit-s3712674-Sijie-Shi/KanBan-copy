import React, { useEffect, useState, useCallback } from "react";
import uuid from "react-uuid";
import styles from "./addtask.module.css"

const AddTask = ({currentEvent, setShowAddTask, action, addNewTask}) => {
    let status = {
        todo: "todo",
        doing: "doing",
        done: "done"
    }

    const [taskDetail, setTaskDetail] = useState({
        title:"",
        description: ""
    })

    useEffect(() => {
        currentEvent ? 
        setTaskDetail({
            title: currentEvent.title,
            description: currentEvent.detail.description
        }) : 
        console.log("no event")
        
    }, [action,currentEvent])

    const handleTaskChange = (type, event) => {
        switch (type) {
            case "title":
                setTaskDetail((prev) => {
                    return {
                        title: event.target.value,
                        description : prev.description
                    }
                })
                break;
            case "description":
                setTaskDetail((prev) => {
                    return {
                        title: prev.title,
                        description : event.target.value
                    }
                })
                break;
            default:
                break;
        }
        
    }

    const sendInfo = useCallback(() => {
        if(taskDetail.title.length > 0) {
            const task = {
                taskName: taskDetail.title,
                id: uuid(),
                detail: { description: taskDetail.description }
            }
            console.log(task)
            addNewTask(task, action)
        } else {
            console.log("no title")
        }
    }, [taskDetail])
    return (
        <>
            <div className={styles.container}>
                <button className={styles.close} onClick={() => setShowAddTask(false)}>x</button>
                <div className={styles.title}>{
                    action === status.todo ? "Add new to do task" :
                    action === status.doing ? "Add new in progress task" :
                    action === status.done ? "Add new finished task" :
                    "Modify " + currentEvent.title
                }</div>
                <div>
                    <div>taskname</div><input value={taskDetail.title} onChange={(e) => handleTaskChange('title', e)}></input>
                    <div>description</div><input value={taskDetail.description} onChange={(e) => handleTaskChange('description', e)}></input>
                </div>
                <button onClick={sendInfo}>Apply</button>
            </div>
        </>
    )
}

export default AddTask;
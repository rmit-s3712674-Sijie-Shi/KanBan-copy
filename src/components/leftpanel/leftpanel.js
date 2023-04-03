import React, { useEffect, useCallback } from "react";
import styles from "./leftpanel.module.css"
import AddButton from "../addbutton/AddButton";

const LeftPanel = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
    console.log(events)
    const handleAddingEvent = useCallback(() => {
        const title = prompt("enter a title :")
        if(events.find((value) =>
            value.title.toLowerCase() === title.toLowerCase())
            ){
                alert('event exist')
                return;
        }
        if(title) {
            setEvents((prev) => [
                ...prev,
                {
                    title,
                    todo:[],
                    doing:[],
                    done:[]
                }
            ])
        }

    },[events, setEvents])

    return (
        <>
            <div className="left-panel">
                <div className={styles.title}>KanBan For Testing</div>
                <div className={styles.addButton}>
                <AddButton handler={handleAddingEvent}></AddButton>
                </div>

                <div className={styles.eventList}>
                    {events.map((value) => (
                        <div className={`${styles.event} ${value.title === currentEvent.title ? styles.selected : ''}`} onClick={() => setCurrentEvent(value)}>{value.title}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default LeftPanel;
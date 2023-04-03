import React, { useEffect } from "react";
import {style} from "./leftpanel.module.css"

const LeftPanel = ({events, setEvents, currentEvent, setCurrentEvent}) => {
    console.log(events)
    return (
        <>
        <div className="left-panel">
        {events.map((value) => (
            value.title
        ))}
        </div>
        </>
    )
}

export default LeftPanel;
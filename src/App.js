import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import LeftPanel from './components/leftpanel/leftpanel';
import TaskBox from './components/taskbox/taskbox';
import uuid from 'react-uuid';
import axios from 'axios';

function App() {
  const initValue = useMemo(() => [
    {
      title: "inital",
      todo: [{taskName: "task1", id: uuid(), detail: {description: "description"}}, {taskName: "task2", id: uuid(), detail: {description: "description"}}],
      doing:[{taskName: "task3", id: uuid(), detail: {description: "description"}}],
      done:[{taskName: "task4", id: uuid(), detail: {description: "description"}}]
    },
  ], [])

  const [events, setEvents] = useState(() => {
    return localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : initValue
  })

  const [currentEvent, setCurrentEvent] = useState(events[0])

  const updateEvents = useCallback(async () => {
    console.log("change localstorage")
    if(!events.length) {
      await localStorage.setItem('events', JSON.stringify(initValue))
      setEvents(JSON.parse(localStorage.getItem('events')))
    } else {
      events.map(res => console.log(res))
      await localStorage.setItem('events', JSON.stringify(events))
    }

  }, [events, initValue])


  const getAllProjects = () => {
    axios.post("http://localhost:3001/getprojects", {
      email: "rikusrocks@gmail.com"
    }).then(res => console.log(res))
  }

  useEffect(() => {
    updateEvents()
    getAllProjects()
  },[events, updateEvents])

  return (
    <div className="App">
      <LeftPanel events={events} setEvents={setEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}></LeftPanel>
      <TaskBox  events={events} setEvents={setEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}></TaskBox>
    </div>
  );
}

export default App;

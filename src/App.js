import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import LeftPanel from './components/leftpanel/leftpanel';
import TaskBox from './components/taskbox/taskbox';

function App() {
  const initValue = useMemo(() => [
    {
      title: "inital",
      todo: [],
      doing:[],
      done:[]
    },
  ], [])

  const [events, setEvents] = useState(() => {
    return localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : initValue
  })

  const [currentEvent, setCurrentEvent] = useState()

  const updateEvents = useCallback(async () => {
    if(!events.length) {
      await localStorage.setItem('events', JSON.stringify(initValue))
      setEvents(JSON.parse(localStorage.getItem('events')))
    } else {
      await localStorage.setItem('events', JSON.stringify(events))
    }
  }, [events])

  useEffect(() => {
    updateEvents()
    setCurrentEvent(events[0])
    console.log(events)
  },[events])

  return (
    <div className="App">
      <LeftPanel events={events} setEvents={setEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}></LeftPanel>
      <TaskBox  events={events} setEvents={setEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}></TaskBox>
    </div>
  );
}

export default App;

import './App.css';
import LeftPanel from './components/leftpanel/leftpanel';
import TaskBox from './components/taskbox/taskbox';

function App() {
  return (
    <div className="App">
      <LeftPanel></LeftPanel>
      <TaskBox></TaskBox>
    </div>
  );
}

export default App;

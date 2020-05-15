import React from 'react';
import './assets/App.css';
import Tetris from './components/Tetris';
import RightPanel from './components/RightPanel';
import LeftPanel from './components/LeftPanel';
function App() {
  return (
    <div className="App">
      <div className="Main-component">
        <LeftPanel></LeftPanel>
        <Tetris></Tetris>
        <RightPanel></RightPanel>
      </div>
    </div>
  );
}

export default App;

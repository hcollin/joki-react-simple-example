import React from 'react';
import './App.css';

import ValueTracker from './components/Values/ValueTracker';
import ValueUpdater from './components/Values/ValueUpdater';

import JOKI from './services/JOKI';
import Test from './components/Test';

// Send Service Initialization call
JOKI.initServices();

function App() {
  return (
    <div className="App">
      <h1>Joki Example Project</h1>

      <ValueTracker valueKey="foo" initialValue={0} />
      <ValueUpdater valueKey="foo" />
      <ValueTracker valueKey="bar" initialValue="beta" />
      <ValueUpdater valueKey="bar" />

      <Test />

    </div>
  );
}

export default App;

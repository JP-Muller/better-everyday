import React from 'react';
import './App.css';
import routes from './routes'
import Navbar from './components/Navbar'
import Inspire from './components/Inspire'

function App() {
  return (
    <div className="App">
      <Navbar />
      {routes}
      <Inspire />
    </div>
  );
}

export default App;

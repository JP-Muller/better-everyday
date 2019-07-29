import React from 'react';
import './App.css';
import routes from './routes'
import Navbar from './components/Navbar'
import Inspire from './components/Inspire'
import Weather from './components/Weather'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Weather />
      {routes}
      <Inspire />
    </div>
  );
}

export default App;

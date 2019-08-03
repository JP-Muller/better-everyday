import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Navbar from './components/Navbar'
import Inspire from './components/Inspire'
import Weather from './components/Weather'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'
import firebase from 'firebase'
import config from './config/firebaseConfig'

firebase.initializeApp(config)

class App extends Component {
  constructor() {
    super()
    this.state = {
      sideDrawerOpen: false,
    }
  }
  drawerClickHandler = () => {
    let { sideDrawerOpen } = this.state
    this.setState({ sideDrawerOpen: !sideDrawerOpen })
  }
  render() {
    let backdrop

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop drawerClickHandler={this.drawerClickHandler} />
    }
    return (

      <div className="App" >
        <Navbar drawerClickHandler={this.drawerClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} drawerClickHandler={this.drawerClickHandler} />
        {backdrop}
        {/* <Weather /> */}
        {routes}
        <footer> <Inspire /></footer >
      </div >
    );
  }
}

export default App;

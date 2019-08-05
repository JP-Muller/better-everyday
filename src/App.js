import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Navbar from './components/Navbar'
import Inspire from './components/Inspire'
import Weather from './components/Weather'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { css } from 'glamor';
import firebase from 'firebase'
import config from './config/firebaseConfig'

toast.configure({
  autoClose: 5000,
})
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
        {routes}
        <footer> <Inspire /></footer >
      </div >
    );
  }
}


export default App;

import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import Navbar from './components/Navbar'
import Inspire from './components/Inspire'
import Weather from './components/Weather'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
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
  componentDidMount = () => {
    let date = new Date().toDateString().split(' ')
    let bodyStyle = document.getElementsByTagName('body')
    if (date && date[0] === 'Sun') {
      for (let i = 0, max = bodyStyle.length; i < max; i++) {
        if (i = 1) {
          bodyStyle[0].style.background = "url(https://images.unsplash.com/photo-1554110397-9bac083977c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) no-repeat center fixed"
        }
        if (i = 2) {
          bodyStyle[0].style.backgroundSize = 'cover'
        }
      }
    } else if (date && date[0] === 'Mon') {
      for (let i = 0, max = bodyStyle.length; i < max; i++) {
        if (i = 1) {
          bodyStyle[0].style.background = "url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) no-repeat center fixed"
        }
        if (i = 2) {
          bodyStyle[0].style.backgroundSize = 'cover'
        }
      }
    } else if (date && date[0] === 'Tue') {
      for (let i = 0, max = bodyStyle.length; i < max; i++) {
        if (i = 1) {
          bodyStyle[0].style.background = "url(https://images.unsplash.com/photo-1498550744921-75f79806b8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) no-repeat center fixed"
        }
        if (i = 2) {
          bodyStyle[0].style.backgroundSize = 'cover'
        }
      }
    } else if (date && date[0] === 'Wed') {
      for (let i = 0, max = bodyStyle.length; i < max; i++) {
        if (i = 1) {
          bodyStyle[0].style.background = "url(https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) no-repeat center fixed"
        }
        if (i = 2) {
          bodyStyle[0].style.backgroundSize = 'cover'
        }
      }
    } else if (date && date[0] === 'Thu') {
      for (let i = 0, max = bodyStyle.length; i < max; i++) {
        if (i = 1) {
          bodyStyle[0].style.background = "url(https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) no-repeat center fixed"
        }
        if (i = 2) {
          bodyStyle[0].style.backgroundSize = 'cover'
        }
      }
    } else if (date && date[0] === 'Fri') {
      for (let i = 0, max = bodyStyle.length; i < max; i++) {
        if (i = 1) {
          bodyStyle[0].style.background = "url(https://images.unsplash.com/flagged/photo-1562592534-61621f33383e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80) no-repeat center fixed"
        }
        if (i = 2) {
          bodyStyle[0].style.backgroundSize = 'cover'
        }
      }
    } else if (date && date[0] === 'Sat') {
      for (let i = 0, max = bodyStyle.length; i < max; i++) {
        if (i = 1) {
          bodyStyle[0].style.background = "url(https://images.unsplash.com/photo-1557626204-59dd03fd2d31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) no-repeat center fixed"
        }
        if (i = 2) {
          bodyStyle[0].style.backgroundSize = 'cover'
        }
      }
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
        <ToastContainer
        toastClassName='dark-toast'
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
       pauseOnHover
        />
        {backdrop}
        {routes}
        <footer> <Inspire /></footer >
      </div >
    );
  }
}


export default App;

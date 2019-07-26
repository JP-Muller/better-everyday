import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import About from './components/About'
import Entries from './components/Entries'
import Account from './components/Account'
import Wizard from './components/Wizard/Wizard'

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/wizard' component={Wizard} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/about' component={About} />
        <Route path='/entries' component={Entries} />
        <Route path='/account' component={Account} />

    </Switch>
)
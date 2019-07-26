import React, { Component } from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export class Wizard extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Step1} />
                        <Route exact path='/wizard/addthoughts' component={Step2} />
                        <Route exact path='/wizard/postpreview' component={Step3} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Wizard

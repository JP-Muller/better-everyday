import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Step1 from './Step1'
import Step2 from './Step2'


export class Wizard extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Step1} />
                        <Route exact path='/wizard/postpreview' component={Step2} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Wizard

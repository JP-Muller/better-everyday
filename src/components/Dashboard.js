import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/userReducer';
import List from './List'
import DateTime from './DateTime'
import Weather from './Weather'
import Background from './Background'
import Wizard from './Wizard/Wizard'

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.user.loggedIn) {
      this.props.getUser();
      console.log('Got User!')
    }
  }

  render() {
    let { user, error, redirect } = this.props;
    if (error || redirect) return <Redirect to="/login" />;
    if (!user.loggedIn) return <div>Loading</div>;
    return (
      <div>
        <Weather />
        <section className="dash-display-container">
          <DateTime user={user} />
          <Wizard />
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { getUser }
)(Dashboard);
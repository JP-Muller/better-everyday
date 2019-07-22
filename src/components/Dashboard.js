import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/userReducer';
import List from './List'
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
      <div className="display-container">
        <List />
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
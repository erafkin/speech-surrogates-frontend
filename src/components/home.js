/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { signOut } from '../state/actions';


class Home extends React.Component {
    uselessfunction = () => {

    }

    render() {
      return (
        <div>
          <p>hello</p>
          {JSON.stringify(this.props.users)}

          <p>curr user</p>
          {JSON.stringify(this.props.user)}
          {Object.keys(this.props.user).length === 0
            ? (
              <NavLink to={ROUTES.LOGIN}>
                <div>
                  <p>Sign In</p>
                </div>
              </NavLink>
            )
            : (
              <div onClick={this.props.signOut} role="button" tabIndex={0}>
                <p>Sign Out</p>
              </div>
            )}


        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    users: state.user.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOut());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

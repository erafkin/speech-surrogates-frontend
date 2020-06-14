/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { signOut } from '../state/actions';
import '../styles/navbar.css';


class Navbar extends React.Component {
    uselessfunction = () => {

    }

    render() {
      return (
        <div className="navbar">
          <div className="heading">
            Surrogate Languages
          </div>
          <div className="content">
            <p className="words">{this.props.user.first_name !== undefined ? `Welcome, ${this.props.user.first_name}` : ''}</p>
            {Object.keys(this.props.user).length === 0
              ? (
                <div className="button-container">
                  <NavLink to={ROUTES.LOGIN}>
                    <div className="button">
                      Sign In
                    </div>
                  </NavLink>
                  <NavLink to={ROUTES.SIGN_UP}>
                    <div className="button">
                      Sign Up
                    </div>
                  </NavLink>
                </div>
              )
              : (
                <div onClick={this.props.signOut} role="button" tabIndex={0} className="button">
                  Sign Out
                </div>
              )}
          </div>


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

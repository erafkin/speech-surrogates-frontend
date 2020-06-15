/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { signOut } from '../state/actions';
import '../styles/navbar.css';


const Navbar = (props) => {
  return (
    <div className="navbar">
      <NavLink to={ROUTES.HOME}>

        <div className="heading">
          Surrogate Languages
        </div>
      </NavLink>
      <div className="content">
        <p className="words">{props.user.first_name !== undefined ? `Welcome, ${props.user.first_name}` : ''}</p>
        {Object.keys(props.user).length === 0
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
            <div onClick={props.signOut} role="button" tabIndex={0} className="button">
              Sign Out
            </div>
          )}
      </div>


    </div>
  );
};

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

/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants/index';
import { signOut } from '../state/actions';
import '../styles/navbar.css';


const Navbar = (props) => {
  return (

    <div className="navbar">
      <div className="heading-container">
        <NavLink to={ROUTES.HOME}>

          <div className="heading">
            Surrogate Languages
          </div>
        </NavLink>
        <NavLink to={ROUTES.HOME}>
          <div className="button">
            Home
          </div>
        </NavLink>
        <NavLink to={ROUTES.ABOUT}>
          <div className="button">
            About
          </div>
        </NavLink>
        <NavLink to={ROUTES.SPEECH_SURROGATES}>
          <div className="button">
            What are speech surrogates?
          </div>
        </NavLink>
      </div>

      <div className="content">
        <p className="words">{props.user.first_name !== undefined ? `Welcome, ${props.user.first_name}` : ''}</p>
        {Object.keys(props.user).length !== 0 && props.user.type === 'admin'
          ? (
            <NavLink to={ROUTES.ADMIN}>
              <div className="button">
                Admin
              </div>
            </NavLink>
          ) : <div style={{ display: 'inline-block' }} />}
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

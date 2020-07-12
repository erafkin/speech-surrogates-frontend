/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ROUTES } from '../constants/index';
import { signOut, setUserBio } from '../state/actions';
import LanguageNav from './language-nav';

const SSNavbar = (props) => {
  return (

    <Navbar bg="light" expand="lg" style={{ marginBottom: '10px' }}>
      <Navbar.Brand href={ROUTES.HOME}>Speech Surrogates</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
          <Nav.Link href={ROUTES.BLOG}>Blog</Nav.Link>
          <NavDropdown title="About" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to={ROUTES.ABOUT}>
              About this website
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to={ROUTES.SPEECH_SURROGATES}>
              What are speech surrogates?
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Grant Languages" id="basic-nav-dropdown">
            <LanguageNav />
          </NavDropdown>
          <NavDropdown title="Contributor Bios" id="basic-nav-dropdown">
            {props.users.map((user) => {
              if (user.bio === undefined) {
                return <div key={user._id} />;
              } else {
                return (
                  <NavDropdown.Item as={NavLink} to={`/bios/${user.username}`} key={user.username} onClick={() => { props.setUserBio(user); }}>
                    {user.first_name} {user.last_name}
                  </NavDropdown.Item>
                );
              }
            })}
          </NavDropdown>


        </Nav>
        <Nav className="mr-sm-2">
          {Object.keys(props.user).length === 0 ? <div /> : (
            <Navbar.Text>
              Welcome, {props.user.first_name}
            </Navbar.Text>
          )}
          {Object.keys(props.user).length !== 0 && props.user.type === 'admin'
            ? (
              <Nav.Link href={ROUTES.ADMIN}>
                Admin
              </Nav.Link>
            ) : <div style={{ display: 'inline-block' }} />}
          {Object.keys(props.user).length !== 0 && (props.user.type === 'admin' || props.user.type === 'contributor')
            ? (
              <Nav.Link href={ROUTES.MY_BIO}>
                My Bio
              </Nav.Link>
            ) : <div style={{ display: 'inline-block' }} />}
          {Object.keys(props.user).length === 0
            ? (
              <div>
                <Nav.Link href={ROUTES.LOGIN} style={{ display: 'inline-block' }}>
                  Sign In
                </Nav.Link>
                <Nav.Link href={ROUTES.SIGN_UP} style={{ display: 'inline-block' }}>
                  Sign Up
                </Nav.Link>
              </div>
            )
            : (
              <Nav.Link href={ROUTES.HOME} onClick={props.signOut} role="button" tabIndex={0}>
                Sign Out
              </Nav.Link>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

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
    setUserBio: (user) => {
      dispatch(setUserBio(user));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SSNavbar));

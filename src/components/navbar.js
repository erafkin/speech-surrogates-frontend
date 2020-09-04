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
import '../styles/home.css';
import home from '../assets/home.jpg';

const SSNavbar = (props) => {
  return (
    <div>
      <div>
        <div className="homeTitleContainer">
          <h1 className="homeTitle">Speech Surrogates</h1>
          {window.innerWidth < 760 ? <div />
            : <p className="homeSubtitle"> Encoding language through music, whistling, and other modalities</p>
          }
        </div>
        <img src={home} alt="balafon" className="homeImage" />
      </div>
      <Navbar bg="light" expand="lg" style={{ marginBottom: '10px' }}>
        <Navbar.Brand href={ROUTES.HOME}>Speech Surrogates</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
            <Nav.Link href={ROUTES.BLOG}>Blog</Nav.Link>
            <NavDropdown title="About" id="basic-nav-dropdown">
              <LanguageNav dropdownType="about-pages" />
            </NavDropdown>
            <NavDropdown title="Media" id="basic-nav-dropdown">
              <LanguageNav dropdownType="grant-languages" />
            </NavDropdown>
            <Nav.Link href={ROUTES.BIOS}>Contributor Bios</Nav.Link>
            <Nav.Link href={ROUTES.MAP}>Map</Nav.Link>

          </Nav>
          <Nav className="mr-sm-2" style={{ paddingRight: '3vw' }}>
            {Object.keys(props.user).length === 0 ? (
              <div>
                <Nav.Link href={ROUTES.LOGIN} style={{ display: 'inline-block' }}>
                  Sign In
                </Nav.Link>
                <Nav.Link href={ROUTES.SIGN_UP} style={{ display: 'inline-block' }}>
                  Sign Up
                </Nav.Link>
              </div>
            ) : (

              <NavDropdown title={`Welcome, ${props.user.first_name}`} id="basic-nav-dropdown">
                {props.user.type === 'admin' || props.user.type === 'contributor'
                  ? (
                    <div>
                      <NavDropdown.Item as={NavLink} to={ROUTES.ADMIN}>
                        Add Content To Site
                      </NavDropdown.Item>
                    </div>

                  ) : <div />}
                <NavDropdown.Item as={NavLink} to={ROUTES.PROFILE}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={props.signOut}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

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
    setUserBio,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SSNavbar));

/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, toast } from 'react-toastify';
import '../styles/home.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import home from '../assets/home.jpg';
import LanguageNav from './language-nav';
import { signOut, setUserBio, updateUser } from '../state/actions';
import { ROUTES } from '../constants/index';

class SSNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      opened: false,
      email: '',
    };
  }

   onFailureCallback = (error) => {
     if (error.message) {
       toast.error(error.message, {
         position: toast.POSITION.TOP_CENTER,
       });
     } else if (error.msg) {
       toast.error(error.msg, {
         position: toast.POSITION.TOP_CENTER,
       });
     } else if (error.error && error.error.message) {
       toast.error(error.error.message, {
         position: toast.POSITION.TOP_CENTER,
       });
     } else if (error.error && error.error.msg) {
       toast.error(error.msg, {
         position: toast.POSITION.TOP_CENTER,
       });
     } else {
       toast.error(JSON.stringify(error), {
         position: toast.POSITION.TOP_CENTER,
       });
     }
   };

   onSuccessCallback = () => {
     toast('Thank you! Your email has been recorded', {
       position: toast.POSITION.TOP_CENTER,
     });
   };


  submit = () => {
    this.setState({
      open: false,
    });
    this.props.updateUser({ ...this.props.user, email: this.state.email }, this.onSuccessCallback, this.onFailureCallback);
  };

  checkForEmail = () => {
    if (Object.keys(this.props.user).length !== 0 && this.props.user.email === undefined && this.state.opened < 1) {
      console.log(this.props.user);
      this.setState({
        open: true,
        opened: true,
      });
    }
  }


  render() {
    this.checkForEmail();
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
        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">We need your email!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Oops! We don`&apos;t have an email attached to this account. Please submit your email.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              onChange={event => this.setState({ email: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.submit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
        <Navbar bg="light" expand="lg" style={{ marginBottom: '10px' }}>
          <Navbar.Brand href={ROUTES.HOME}>Speech Surrogates</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to={ROUTES.HOME}>Home</Nav.Link>
              <Nav.Link as={NavLink} to={ROUTES.BLOG}>Blog</Nav.Link>
              <NavDropdown title="About" id="basic-nav-dropdown">
                <LanguageNav dropdownType="about-pages" />
              </NavDropdown>
              <NavDropdown title="Media" id="basic-nav-dropdown">
                <LanguageNav dropdownType="grant-languages" />
              </NavDropdown>
              <Nav.Link as={NavLink} to={ROUTES.BIOS}>Contributor Bios</Nav.Link>
              <Nav.Link as={NavLink} to={ROUTES.MAP}>Map</Nav.Link>

            </Nav>
            <Nav className="mr-sm-2" style={{ paddingRight: '3vw' }}>
              {Object.keys(this.props.user).length === 0 ? (
                <div>
                  <Nav.Link href={ROUTES.LOGIN} style={{ display: 'inline-block' }}>
                    Sign In
                  </Nav.Link>
                  <Nav.Link href={ROUTES.SIGN_UP} style={{ display: 'inline-block' }}>
                    Sign Up
                  </Nav.Link>
                </div>
              ) : (

                <NavDropdown title={`Welcome, ${this.props.user.first_name}`} id="basic-nav-dropdown">
                  {this.props.user.type === 'admin' || this.props.user.type === 'contributor'
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
                  <NavDropdown.Item onClick={this.props.signOut}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
    updateUser: (user, success, failure) => {
      dispatch(updateUser(user, success, failure));
    },
    setUserBio,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SSNavbar));

import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import { signIn } from '../state/actions';
import { ROUTES } from '../constants';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSuccessCallback = () => {
    props.history.push('/');
  };

  const onFailureCallback = () => {
    toast.error('login failed', {
      position: toast.POSITION.TOP_CENTER,
    });
  };


  return (
    <Fade>
      <div id="sign-in-container" style={{ margin: '2vw' }}>
        <ToastContainer />
        <h3>Sign In</h3>
        <p id="signup-link">Don&apos;t have an account? Click <NavLink to={ROUTES.SIGN_UP}>here</NavLink> to sign up.</p>
        <form>
          <p>Username:</p>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <p>Password:</p>
          <input value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            onKeyPress={(event) => {
              if (event.key === 'Enter') props.signIn(username, password, onSuccessCallback, onFailureCallback);
            }}
          />
          <br />
          <br />
          <Button
            onClick={() => props.signIn(username, password, onSuccessCallback, onFailureCallback)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') props.signIn(username, password, onSuccessCallback, onFailureCallback);
            }}
          >
            Sign In
          </Button>
          <p id="signup-link"><NavLink to={ROUTES.RESET_PASSWORD}>Forgot your password?</NavLink></p>

        </form>
      </div>
    </Fade>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (username, password, success, failure) => {
      dispatch(signIn(username, password, success, failure));
    },
  };
};


export default withRouter(connect(
  null,
  mapDispatchToProps,
)(SignIn));

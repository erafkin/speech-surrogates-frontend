import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';

import { resetPassword } from '../state/actions';

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('');
  const onFailureCallback = () => {
    toast.error('There was an error resetting your password, are you sure you submitted a valid username?', {
      position: toast.POSITION.TOP_CENTER,
    });
  };


  let email = '';
  const onSuccessCallback = () => {
    props.history.push('/login');
    toast(`An email with a new password was sent to ${email}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const submit = () => {
    props.users.forEach((user) => {
      const userEmail = user.email;
      if (user.username === username) email = userEmail;
    });
    if (email === '') {
      toast.error('There was no email address associated with this username. Are you sure you submitted the correct username?', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      props.resetPassword(email, username, onSuccessCallback, onFailureCallback);
    }
  };
  return (
    <Fade>
      <ToastContainer />
      <div id="sign-in-container" style={{ margin: '2vw' }}>
        <p>Username:</p>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <br />
        <br />

        <Button onClick={() => { submit(); }}>
          Submit
        </Button>
      </div>
    </Fade>
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
    resetPassword: (email, user, success, failure) => {
      dispatch(resetPassword(email, user, success, failure));
    },
  };
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword));

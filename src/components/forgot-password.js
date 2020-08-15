import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { ToastContainer, toast } from 'react-toastify';


import { resetPassword } from '../state/actions';

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const onFailureCallback = () => {
    toast.error('There was an error resetting your password, are you sure you submitted a valid username and email address?', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const onSuccessCallback = () => {
    props.history.push('/login');
    toast(`An email with a new password was sent to ${email}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <Fade>
      <ToastContainer />
      <div id="sign-in-container" style={{ margin: '2vw' }}>
        <p>Username:</p>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <p>Email:</p>
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
        <div className="button" onClick={() => props.resetPassword(email, username, onSuccessCallback, onFailureCallback)} role="button" tabIndex={0}>
          Submit
        </div>
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

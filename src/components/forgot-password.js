import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';

import { resetPassword } from '../state/actions';

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Fade>
      <div id="sign-in-container">
        <p>Username:</p>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <p>Email:</p>
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
        <div className="button" onClick={() => props.resetPassword(email, username)} role="button" tabIndex={0}>
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
    resetPassword: (email, user) => {
      dispatch(resetPassword(email, user));
    },
  };
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword));

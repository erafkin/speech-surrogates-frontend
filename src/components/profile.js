/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { updateUser, signOut, getAllUsers } from '../state/actions';
import '../styles/admin.css';
import MyBio from './my-bio';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      email: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.submitPassword = this.submitPassword.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

    handlePasswordChange = (e) => {
      this.setState({ oldPassword: e.target.value });
    }

    handleNewPasswordChange = (e) => {
      this.setState({ password: e.target.value });
    }

    handleEmailChange = (e) => {
      this.setState({ email: e.target.value });
    }

    submitPassword = () => {
      this.props.updateUser({ ...this.props.user, password: this.state.password, oldPassword: this.state.oldPassword }, this.onSuccessCallback, this.onFailureCallback);
    }

    submitEmail = () => {
      this.props.updateUser({ ...this.props.user, email: this.state.email }, this.onSuccessCallbackEmail, this.onFailureCallback);
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
      this.props.signOut();
      this.props.history.push('/login');
      toast('Password was successfully reset', {
        position: toast.POSITION.TOP_CENTER,
      });
    };

    onSuccessCallbackEmail = () => {
      toast('Email was successfully reset', {
        position: toast.POSITION.TOP_CENTER,
      });
    };


    render() {
      return (
        <div style={{ margin: '2vw' }}>
          <ToastContainer />
          <h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
          <br />
          <p><span style={{ fontWeight: '700' }}>Username:</span> {this.props.user.username}</p>
          <p><span style={{ fontWeight: '700' }}>Permissions:</span> {this.props.user.type}</p>
          <p><span style={{ fontWeight: '700' }}>Email:</span> {this.props.user.email}</p>
          <p>Change email</p>
          <input type="text" name="link" value={this.state.email} onChange={this.handleEmailChange} className="title" />
          <br />
          <br />
          <Button className="button" onClick={() => this.submitEmail()}>
            Change Email
          </Button>
          {this.props.user.type === 'admin' || this.props.user.type === 'contributor'
            ? <MyBio history={this.props.history} />
            : <div />}
          <p style={{ fontWeight: '700' }}>Change Password:</p>
          <p>Old password</p>
          <input type="text" name="link" value={this.state.oldPassword} onChange={this.handlePasswordChange} className="title" />
          <p>New password</p>
          <input type="text" name="link" value={this.state.newpassword} onChange={this.handleNewPasswordChange} className="title" />
          <br />
          <br />
          <Button className="button" onClick={() => this.submitPassword()}>
            Change Password
          </Button>


        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user, success, failure) => {
      dispatch(updateUser(user, success, failure));
    },
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
    signOut: () => {
      dispatch(signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

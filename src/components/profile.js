/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { updateUser, signOut } from '../state/actions';
import '../styles/admin.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.submitPassword = this.submitPassword.bind(this);
  }

    handlePasswordChange = (e) => {
      this.setState({ oldPassword: e.target.value });
    }

    handleNewPasswordChange = (e) => {
      this.setState({ password: e.target.value });
    }

    submitPassword = () => {
      this.props.updateUser({ ...this.props.user, password: this.state.password, oldPassword: this.state.oldPassword }, this.onSuccessCallback, this.onFailureCallback);
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


    render() {
      return (
        <div style={{ margin: '2vw' }}>
          <ToastContainer />
          <h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
          <br />
          <p><span style={{ fontWeight: '700' }}>Username:</span> {this.props.user.username}</p>
          <p><span style={{ fontWeight: '700' }}>Permissions:</span> {this.props.user.type}</p>
          <p>CHANGE PASSWORD</p>
          <p>old password</p>
          <input type="text" name="link" value={this.state.oldPassword} onChange={this.handlePasswordChange} className="title" />
          <p>new password</p>
          <input type="text" name="link" value={this.state.newpassword} onChange={this.handleNewPasswordChange} className="title" />

          <Button className="button" onClick={() => this.submitPassword()}>
            Submit
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
    signOut: () => {
      dispatch(signOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ROUTES } from '../constants';

import { getAllUsers, updateUser, setGrantLanguage } from '../state/actions';
import '../styles/admin.css';


class AdminPanel extends React.Component {
  componentWillMount() {
    if (this.props.users.length === 0) {
      this.props.getAllUsers();
    }
  }

  render() {
    return (
      <div className="adminContainer">
        <h2>Users</h2>
        <table>
          <tbody>

            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>username</th>
              <th>Role</th>
              <th>Change Role To</th>
            </tr>
            {this.props.users.map((user) => {
              let newRole = 'none';
              if (user.type === 'none') newRole = 'contributor';
              return (
                <tr key={user._id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.username}</td>
                  <td>{user.type}</td>
                  {user.type === 'admin' ? <td />
                    : (
                      <td>
                        <div onClick={() => this.props.updateUser({ ...user, type: newRole })} role="button" tabIndex={0} className="button">
                          {newRole}
                        </div>
                      </td>
                    )}

                </tr>
              );
            })}
          </tbody>

        </table>
        <br />
        <NavLink to={ROUTES.NEW_LANG} onClick={() => { this.props.setGrantLanguage({}); }}>
          <Button>
            New Grant Language Page
          </Button>
        </NavLink>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
    setGrantLanguage: (lang) => {
      dispatch(setGrantLanguage(lang));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);

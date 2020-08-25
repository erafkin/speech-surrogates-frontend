/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ROUTES } from '../constants';
import {
  getAllUsers, updateUser, setGrantLanguage, getAllNews, createNews, deleteNews, getUser,
} from '../state/actions';
import '../styles/admin.css';
import MyBio from './my-bio';


class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currNewsBlurb: '',
      currNewsLink: '',

    };
    this.handleBlurbChange = this.handleBlurbChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
  }

  componentWillMount() {
    if (this.props.users.length === 0) {
      this.props.getAllUsers();
      this.props.getUser(this.props.user.username);
    }
    if (this.props.news.length === 0) {
      this.props.getAllNews();
    }
  }

  createNews = () => {
    this.props.createNews({ blurb: this.state.currNewsBlurb, link: this.state.currNewsLink }, this.props.user);
    this.setState({
      currNewsBlurb: '',
      currNewsLink: '',
    });
  }

  handleBlurbChange = (e) => {
    this.setState({ currNewsBlurb: e.target.value });
  }

  handleLinkChange = (e) => {
    this.setState({ currNewsLink: e.target.value });
  }

  render() {
    return (
      <div style={{ margin: '2vw' }}>
        <NavLink to={ROUTES.NEW_LANG} onClick={() => { this.props.setGrantLanguage({}); }}>
          <Button>
            Create a new media page
          </Button>
        </NavLink>
        <br />
        <br />
        {this.props.user.type === 'admin'
          ? (
            <div>
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
              <br />
              <br />
              <p style={{ fontWeight: 'bold', fontSize: '1.5em' }}> News </p>
              {this.props.news.map((n) => {
                return (
                  <div key={n._id}>
                    <p> {n.blurb} </p>
                    <p> {n.link} </p>
                    <Button className="button" onClick={() => this.props.deleteNews(n)} variant="danger">
                      Delete News
                    </Button>
                  </div>
                );
              })}
              <br />
              <p style={{ fontWeight: 'bold', fontSize: '1.25em' }}> Add News</p>
              <p>Blurb</p>
              <input type="text" name="blurb" value={this.state.currNewsBlurb} onChange={this.handleBlurbChange} className="title" />
              <p>Link</p>
              <input type="text" name="link" value={this.state.currNewsLink} onChange={this.handleLinkChange} className="title" />

              <Button className="button" onClick={() => this.createNews()}>
                Submit
              </Button>
              <br />
              <br />
            </div>
          )
          : <div />}

        <div>
          <br />
          <MyBio history={this.props.history} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
    user: state.user.user,
    news: state.news.news,
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
    getAllNews: () => {
      dispatch(getAllNews());
    },
    createNews: (news, user) => {
      dispatch(createNews(news, user));
    },
    deleteNews: (news) => {
      dispatch(deleteNews(news));
    },
    getUser: (id) => {
      dispatch(getUser(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);

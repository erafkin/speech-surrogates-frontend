/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/navbar.css';
import '../styles/blog.css';
import ReactHtmlParser from 'react-html-parser';


const IndivBio = (props) => {
  let userBio = {};
  if (props.bio === undefined || Object.keys(props.userBio).length === 0) {
    if (props.match.params.username !== undefined) {
      props.users.forEach((user) => {
        if (user.username === props.match.params.username) userBio = user;
      });
    } else {
      const urlArray = window.location.href.split('/');
      const username = urlArray[urlArray.length - 1];
      props.users.forEachs((user) => {
        if (user.username === username) userBio = user;
      });
    }
  }
  return (
    <div style={{ margin: '2vw' }}>
      <h1 className="lang-title">{userBio.first_name} {userBio.last_name}</h1>
      {/* eslint-disable-next-line new-cap */}
      <div>{ReactHtmlParser(userBio.bio)}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
  };
};


export default withRouter(connect(mapStateToProps, null)(IndivBio));

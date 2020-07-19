/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/navbar.css';
import '../styles/blog.css';
import ReactHtmlParser from 'react-html-parser';


const Bios = (props) => {
  return (
    <div style={{ margin: '2vw' }}>
      {props.users.map((user) => {
        if (user.bio === null || user.bio === undefined) {
          return <div />;
        } else {
          return (
            <div>
              <h1 className="lang-title">{user.first_name} {user.last_name}</h1>
              { /* eslint-disable-next-line new-cap */ }
              <div>{ReactHtmlParser(user.bio)}</div>
            </div>
          );
        }
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
  };
};


export default withRouter(connect(mapStateToProps, null)(Bios));

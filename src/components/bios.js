/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/navbar.css';
import '../styles/blog.css';

const Bios = (props) => {
  return (
    <div style={{ margin: '2vw' }}>
      {props.users.map((user) => {
        if (user.bio === null || user.bio === undefined || user.bio === '') {
          return <div key={user._id} />;
        } else {
          return (
            <div key={user._id} style={{ minHeight: '450px' }}>
              <h1 style={{ }}>{user.first_name} {user.last_name}</h1>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: user.bio }} />
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

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { setBlog } from '../state/actions';
import { ROUTES } from '../constants';
import '../styles/navbar.css';


const IndivBlog = (props) => {
  return (
    <div className="navbar">
      <h1>{props.blog.title}</h1>
      <h2>{props.blog.author}</h2>
      <h3>{new Date(props.blog.date).toDateString()}</h3>

      <p>{props.blog.body}</p>
      {props.isAdmin
        ? (
          <NavLink to={ROUTES.NEW_BLOG} onClick={() => { props.setBlog(props.blog); }}>
            <div className="button" role="button" tabIndex={0}>
              edit blog
            </div>
          </NavLink>
        )
        : <div />
    }
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBlog: (blog) => {
      dispatch(setBlog(blog));
    },
  };
};


export default withRouter(connect(null, mapDispatchToProps)(IndivBlog));

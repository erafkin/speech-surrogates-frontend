/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { getAllBlogs } from '../state/actions';
import IndivBlog from './indiv-blog';
import { ROUTES } from '../constants';
import '../styles/home.css';

const changeKeyword = () => {

};
const Home = (props) => {
  if (Object.keys(props.blogs).length === 0) {
    props.getAllBlogs();
  }
  let blog = {};
  props.blogs.forEach((b) => {
    if (b.visible && Object.keys(blog).length === 0) {
      blog = b;
    }
  });
  console.log(blog);
  return (
    <div className="homeContainer">
      <h1>Welcome to Speech Surrogates!</h1>
      <p>This site is dedicated to sharing research and resources related to speech surrogates,especially musical surrogate
        languages. <span> <a href={ROUTES.ABOUT} style={{ textDecoration: 'underline' }}>Read more here.</a> </span>
      </p>
      <p>
        <a href={ROUTES.SPEECH_SURROGATES} className="homeLinks" style={{ textDecoration: 'underline' }}>What are speech surrogates? </a>
      </p>
      <div className="homeBlog">
        <h1>Most recent blog post</h1>
        <div>
          {Object.keys(blog).length === 0 ? <div /> : <IndivBlog blog={blog} user={{ type: 'none' }} visible changeKeyword={changeKeyword} /> }
        </div>
        <a href={ROUTES.BLOG} className="homeLinks" style={{ textDecoration: 'underline', fontSize: '1.25em' }}>See more blog posts...</a>
      </div>
      <div className="homeNews">
        <p>News</p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    blogs: state.blog.allBlogs,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBlogs: () => {
      dispatch(getAllBlogs());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

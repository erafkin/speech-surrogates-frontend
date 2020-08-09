/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { getAllBlogs, getAllNews, getAllMapLangs } from '../state/actions';
import IndivBlog from './indiv-blog';
import { ROUTES } from '../constants';
import '../styles/home.css';

const changeKeyword = () => {

};
const Home = (props) => {
  if (Object.keys(props.blogs).length === 0) {
    props.getAllBlogs();
  }
  if (Object.keys(props.news).length === 0) {
    props.getAllNews();
  }
  let blog = {};
  props.blogs.forEach((b) => {
    if (b.visible && Object.keys(blog).length === 0) {
      blog = b;
    }
  });
  return (
    <div className="homeContainer">
      <div className="homeBlog">

        <h1>Welcome to Speech Surrogates!</h1>

        <p>This site is dedicated to sharing research and resources related to speech surrogates,especially musical surrogate
          languages. <span> <a href={ROUTES.ABOUT} style={{ textDecoration: 'underline' }}>Read more here.</a> </span>
        </p>
        <p>
          <a href={ROUTES.SPEECH_SURROGATES} className="homeLinks" style={{ textDecoration: 'underline' }}>What are speech surrogates? </a>
        </p>
        <h1>Most recent blog post</h1>
        <div>
          {Object.keys(blog).length === 0 ? <div /> : <IndivBlog blog={blog} user={{ type: 'none' }} visible changeKeyword={changeKeyword} /> }
        </div>
        <a href={ROUTES.BLOG} className="homeLinks" style={{ textDecoration: 'underline', fontSize: '1.25em' }}>See more blog posts...</a>
      </div>
      <div className="homeNews">
        <h2>News</h2>
        {props.news.map((n) => {
          return (
            <div key={n._id}>
              <p>{n.blurb}</p>
              {n.link ? (
                <div>
                  <a href={n.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>More here.</a>
                  <br />
                  <br />
                </div>
              )
                : <div />
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    blogs: state.blog.allBlogs,
    user: state.user.user,
    news: state.news.news,
    map: state.map.map,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBlogs: () => {
      dispatch(getAllBlogs());
    },
    getAllNews: () => {
      dispatch(getAllNews());
    },
    getAllMapLangs: () => {
      dispatch(getAllMapLangs());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

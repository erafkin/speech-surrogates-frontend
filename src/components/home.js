/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import {
  getAllNews, getAllMapLangs, getMostRecentBlog, getAllAboutPages,
} from '../state/actions';
import IndivBlog from './indiv-blog';
import { ROUTES } from '../constants';
import '../styles/home.css';

const changeKeyword = {

};
const Home = (props) => {
  if (props.mostRecentBlog.length === 0) {
    props.getMostRecentBlog();
  }
  if (Object.keys(props.news).length === 0) {
    props.getAllNews();
  }
  if (Object.keys(props.about).length === 0) {
    props.getAllAboutPages();
  }
  let aboutPage = '';
  let speechSurrogatesPage = '';
  props.about.forEach((about) => {
    if (about.title === 'About') {
      aboutPage = about._id;
    } else if (about.title === 'What are speech surrogates?') {
      speechSurrogatesPage = about._id;
    }
  });
  return (
    <div className="homeContainer">
      {Object.keys(props.about).length === 0 || props.mostRecentBlog.length === 0 ? <h1>Loading home page...</h1>
        : (
          <div>
            <div className="homeBlog">

              <h1>Welcome to Speech Surrogates!</h1>

              <p>This site is dedicated to sharing research and resources related to speech surrogates,especially musical surrogate
                languages. <span> <a href={`/about/${aboutPage}`} style={{ textDecoration: 'underline' }}>Read more here.</a> </span>
              </p>
              <p>
                <a href={`/about/${speechSurrogatesPage}`} className="homeLinks" style={{ textDecoration: 'underline' }}>What are speech surrogates? </a>
              </p>
              <h1>Most recent blog post</h1>
              <div>
                {props.mostRecentBlog.length === 0 ? <div /> : <IndivBlog blog={props.mostRecentBlog} user={{ type: 'none' }} visible changeKeyword={changeKeyword} />}
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
        )
      }

    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    mostRecentBlog: state.blog.mostRecentBlog,
    user: state.user.user,
    news: state.news.news,
    map: state.map.map,
    about: state.about.allAboutPages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMostRecentBlog: () => {
      dispatch(getMostRecentBlog());
    },
    getAllAboutPages: () => {
      dispatch(getAllAboutPages());
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

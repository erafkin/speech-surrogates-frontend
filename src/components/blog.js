/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants/index';
import {
  getAllBlogs, updateBlog, setBlog, getAllKeywords,
} from '../state/actions';
import IndivBlog from './indiv-blog';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.changeKeyword = this.changeKeyword.bind(this);
  }

  componentWillMount() {
    this.props.getAllBlogs();
    this.props.getAllKeywords();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.blog !== this.props.blog) {
      window.location.reload(false);
    }
  }

  changeKeyword = (word) => {
    this.setState({
      keyword: word,
    });
  }

  render() {
    return (
      <div className="container">
        {(this.props.user.type === 'admin' || this.props.user.type === 'contributor')
          ? (
            <NavLink to={ROUTES.NEW_BLOG}>
              <div className="button">
                new post
              </div>
            </NavLink>
          )
          : <div />
              }
        <div className="postContainer">
          {this.state.keyword === 'asdf' ? <div /> : <p>Keyword selected: {this.state.keyword}</p> }
          {this.props.blogs.map((b) => {
            if ((this.props.user.type === 'admin' || this.props.user.type === 'contributor') || b.visible) {
              return (
                <div key={`${b._id}main`} className="post">

                  <IndivBlog blog={b} key={b._id} user={this.props.user} visible={b.visible} changeKeyword={this.changeKeyword} />
                  {(this.props.user.type === 'admin' || this.props.user.type === 'contributor')
                    ? (
                      <div key={`${b._id}div`}>
                        <NavLink to={ROUTES.NEW_BLOG} onClick={() => { this.props.setBlog(b); }}>
                          <div className="button" role="button" tabIndex={0}>
                            Edit Post
                          </div>
                        </NavLink>
                        <div onClick={() => {
                          this.props.updateBlog(
                            { ...b, visible: !b.visible },
                            this.props.user,
                          );
                        }}
                          role="button"
                          tabIndex={0}
                          className="button"
                        >
                          {b.visible ? 'Hide post' : 'Show post'}
                        </div>
                      </div>
                    )
                    : <div key={`${b._id}div`} />
                    }
                </div>
              );
            } else return (<div key={`${b._id}div`} />);
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    blogs: state.blog.allBlogs,
    blog: state.blog.blog,
    keywords: state.blog.keywords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBlogs: () => {
      dispatch(getAllBlogs());
    },
    getAllKeywords: () => {
      dispatch(getAllKeywords());
    },
    setBlog: (b) => {
      dispatch(setBlog(b));
    },
    updateBlog: (b, u) => {
      dispatch(updateBlog(b, u));
    },
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));

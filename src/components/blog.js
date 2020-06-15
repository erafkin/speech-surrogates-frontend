/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { getAllBlogs, updateBlog, setBlog } from '../state/actions';
import IndivBlog from './indiv-blog';

class Blog extends React.Component {
  componentWillMount() {
    this.props.getAllBlogs();
  }


  render() {
    return (
      <div>
        {this.props.user.type === 'admin'
          ? (
            <NavLink to={ROUTES.NEW_BLOG}>
              <div className="button">
                new post
              </div>
            </NavLink>
          )
          : <div />
              }
        <div>
          {this.props.blogs.map((b) => {
            if (this.props.user.type === 'admin' || b.visible) {
              return (
                <div key={`${b._id}main`}>

                  <IndivBlog blog={b} key={b._id} user={this.props.user} visible={b.visible} />
                  {this.props.user.type === 'admin'
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
                          window.location.reload(false); // force a reload, im not sure why it wasn't happening
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBlogs: () => {
      dispatch(getAllBlogs());
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

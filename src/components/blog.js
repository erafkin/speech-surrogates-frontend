/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { getAllBlogs } from '../state/actions';
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
            return (<IndivBlog blog={b} key={b._id} />);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBlogs: () => {
      dispatch(getAllBlogs());
    },
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));

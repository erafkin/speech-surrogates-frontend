/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createBlog } from '../state/actions';

class NewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.blog.title === undefined ? '' : this.props.blog.title,
      body: this.props.blog.body === undefined ? '' : this.props.blog.body,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onFailureCallback = this.onFailureCallback.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleBodyChange = (e) => {
    this.setState({ body: e.target.value });
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  onSuccessCallback = () => {
    this.props.history.push('/blog');
  };

  onFailureCallback = (error) => {
    this.toast.error(JSON.stringify(error));
  };

  submit = () => {
    this.props.createBlog(
      {
        title: this.state.title,
        body: this.state.body,
        author: `${this.props.user.first_name} ${this.props.user.last_name}`,
      },
      this.props.user,
      this.onSuccessCallback,
      this.onFailureCallback,
    );
  }

  render() {
    return (
      <div>
        <p>a new blog post</p>
        <div>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange} />

          <p>Body:</p>
          <input type="text" name="body" value={this.state.body} onChange={this.handleBodyChange} />

          <div className="button" onClick={() => this.submit()} role="button" tabIndex={0}>
            submit
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    blog: state.blog.blog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBlog: (blog, user, success, failure) => {
      dispatch(createBlog(blog, user, success, failure));
    },
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBlog));

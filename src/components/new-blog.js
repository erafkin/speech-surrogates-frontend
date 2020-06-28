/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

import { createBlog, updateBlog } from '../state/actions';
import '../styles/blog.css';
import TextEditor from './text-editor';

class NewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.blog.title === undefined ? '' : this.props.blog.title,
      body: this.props.blog.body === undefined ? '' : this.props.blog.body,
      keywords: this.props.blog.keywords === undefined ? [] : this.props.blog.keywords,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onFailureCallback = this.onFailureCallback.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleBodyChange = (e) => {
    this.setState({ body: e });
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
    if (this.props.blog._id !== undefined) {
      this.props.updateBlog(
        {
          ...this.props.blog,
          title: this.state.title,
          body: this.state.body,
          keywords: this.state.keywords,
        },
        this.props.user,
        this.onSuccessCallback,
        this.onFailureCallback,
      );
    } else {
      this.props.createBlog(
        {
          title: this.state.title,
          body: this.state.body,
          author: `${this.props.user.first_name} ${this.props.user.last_name}`,
          keywords: this.state.keywords,
        },
        this.props.user,
        this.onSuccessCallback,
        this.onFailureCallback,
      );
    }
  }

  handleChange = (newValue) => {
    const newKeywords = [];
    if (newValue === null) {
      this.setState({
        keywords: [],
      });
    } else {
      newValue.forEach((val) => {
        newKeywords.push(val.value);
      });
      this.setState({
        keywords: newKeywords,
      });
    }
  };

  render() {
    const keywordOptions = [];
    this.props.keywords.forEach((word) => {
      keywordOptions.push({
        value: word.name,
        label: word.name,
      });
    });

    const values = [];
    this.state.keywords.forEach((word) => {
      values.push({
        value: word,
        label: word,
      });
    });
    return (
      <div className="container">
        <div>
          <p>Title:</p>
          <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange} className="title" />

          <p>Body:</p>
          <TextEditor body={this.state.body} handleBodyChange={this.handleBodyChange} />
          <br />
          <p>Keywords:</p>
          <CreatableSelect
            isMulti
            onChange={this.handleChange}
            options={keywordOptions}
            value={values}
          />
          <br />

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
    keywords: state.blog.keywords,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBlog: (blog, user, success, failure) => {
      dispatch(createBlog(blog, user, success, failure));
    },
    updateBlog: (blog, user, success, failure) => {
      dispatch(updateBlog(blog, user, success, failure));
    },
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBlog));

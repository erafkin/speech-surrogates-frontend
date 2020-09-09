/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ROUTES } from '../constants/index';
import {
  getAllBlogs, updateBlog, setBlog, getAllKeywords, commentBlog,
} from '../state/actions';
import IndivBlog from './indiv-blog';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      comment: '',

    };
    this.changeKeyword = this.changeKeyword.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
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

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  }


  render() {
    return (
      <div className="container">
        {(this.props.user.type === 'admin' || this.props.user.type === 'contributor')
          ? (
            <div className="keywords">
              <NavLink to={ROUTES.NEW_BLOG}>
                <Button>
                  new post
                </Button>
              </NavLink>
              <p>Keywords:</p>
              {this.props.keywords.map((kw) => {
                return (
                  <div onClick={() => { this.changeKeyword(kw.name); }}
                    role="button"
                    tabIndex={0}
                    key={kw.name}
                    style={{ textDecoration: 'underline', color: 'blue' }}
                  >
                    {kw.name}
                  </div>
                );
              })}
            </div>

          )
          : (
            <div className="keywords">
              <p>Keywords:</p>
              {this.props.keywords.map((kw) => {
                if (kw.postCount !== 0) {
                  return (
                    <div onClick={() => { this.changeKeyword(kw.name); }}
                      role="button"
                      tabIndex={0}
                      key={kw.name}
                      style={{ textDecoration: 'underline', color: 'blue' }}

                    >
                      {kw.name}
                    </div>

                  );
                } else {
                  return <div />;
                }
              })}
            </div>
          )
          }

        <div className="postContainer">

          {this.state.keyword === '' ? <div />
            : (
              <div>
                <p style={{ display: 'inline-block', margin: '5px' }}>Keyword selected: {this.state.keyword}</p>
                <Button onClick={() => this.changeKeyword('')}>
                  clear
                </Button>
              </div>
            )

          }
          {this.props.blogs.length === 0 ? <h1>Loading blog...</h1> : <div />}
          {this.props.blogs.map((b) => {
            if (this.state.keyword === '' || b.keywords.includes(this.state.keyword)) {
              if ((this.props.user.type === 'admin' || this.props.user.type === 'contributor') || b.visible) {
                return (
                  <div key={`${b._id}main`} className="post">

                    <IndivBlog blog={b} key={b._id} user={this.props.user} visible={b.visible} changeKeyword={this.changeKeyword} />
                    {(this.props.user.type === 'admin' || this.props.user.type === 'contributor')
                      ? (
                        <div key={`${b._id}div`}>
                          <NavLink to={ROUTES.NEW_BLOG} onClick={() => { this.props.setBlog(b); }}>
                            <Button>
                              Edit post
                            </Button>
                          </NavLink>
                          <span>&nbsp;</span>
                          <Button
                            variant={b.visible ? 'danger' : 'success'}
                            onClick={() => {
                              this.props.updateBlog(
                                { ...b, visible: !b.visible },
                                this.props.user,
                              );
                            }}
                          >
                            {b.visible ? 'Hide post' : 'Show post'}
                          </Button>

                        </div>
                      )
                      : <div key={`${b._id}div`} />
                      }
                    <p>Comment:</p>
                    <textarea type="text" name="comment" value={this.state.comment} onChange={this.handleCommentChange} className="comment" />
                    <Button
                      onClick={() => {
                        const newComments = b.comments;
                        let name = 'Anonymous';
                        if (Object.keys(this.props.user).length !== 0) {
                          name = `${this.props.user.first_name} ${this.props.user.last_name}`;
                        }
                        newComments.splice(0, 0, {
                          author: name,
                          body: this.state.comment,
                          date: Date.now(),
                          visible: true,
                        });
                        this.props.commentBlog({
                          ...b,
                          comments: newComments,
                        },
                        this.props.user);
                      }}
                    >
                      Submit
                    </Button>
                    {b.comments.map((comment, index) => {
                      if ((this.props.user.type === 'none' || Object.keys(this.props.user).length === 0) && comment.visible) {
                        return (
                          <div key={comment.body} className="comment-container">
                            <p>{comment.author}</p>
                            <p className="date">{new Date(comment.date).toDateString()}</p>
                            <p>{comment.body}</p>
                          </div>
                        );
                      } else if (this.props.user.type === 'contributor' || this.props.user.type === 'admin') {
                        return (
                          <div>
                            <div key={comment.body} className="comment-container" id="admin">
                              <p>{comment.author}</p>
                              <p className="date">{new Date(comment.date).toDateString()}</p>
                              <p>{comment.body}</p>
                            </div>
                            <div onClick={() => {
                              b.comments.splice(index, 1, { ...comment, visible: !comment.visible });
                              this.props.updateBlog(b,
                                this.props.user);
                            }}
                              role="button"
                              tabIndex={0}
                              className="button"
                            >
                              {comment.visible ? 'Hide comment' : 'Show comment'}
                            </div>
                          </div>
                        );
                      } else {
                        return <div key={comment.body} />;
                      }
                    })}
                  </div>


                );
              } else return (<div key={`${b._id}div`} />);
            } else return (<div key={`${b._id}div`} />);
          })
          }
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
    commentBlog: (b, u) => {
      dispatch(commentBlog(b, u));
    },
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));

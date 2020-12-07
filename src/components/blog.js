/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { ROUTES } from '../constants/index';
import {
  getAllBlogs, updateBlog, setBlog, getAllKeywords, commentBlog, getBlogCount,
} from '../state/actions';
import IndivBlog from './indiv-blog';

const Blog = (props) => {
  const [keyword, changeKeyword] = useState('');
  const [comment, changeComment] = useState('');
  const [page, changePage] = useState(1);
  const [currBlogs, changeCurrBlogs] = useState(props.blogs);

  if (props.blogs.length === 0) {
    props.getAllBlogs();
  }
  if (props.keywords.length === 0) {
    props.getAllKeywords();
  }
  useEffect(() => {
    changeCurrBlogs(props.blogs);
  }, [props.blogs]);

  useEffect(() => {
    if (keyword === '') {
      changeCurrBlogs(props.blogs);
    } else {
      const newCurrBlogs = props.blogs.filter(b => b.keywords.includes(keyword));
      changeCurrBlogs(newCurrBlogs);
    }
  }, [keyword]);


  const fillPaginationItems = () => {
    const active = page;
    const items = [];
    items.push(
      <Pagination.First key={-1} onClick={() => { changePage(1); }} />,
    );
    items.push(
      <Pagination.Prev key={0} onClick={() => { if (active !== 1) changePage(active - 1); }} />,

    );
    for (let number = 1; number <= currBlogs.length; number += 1) {
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => { changePage(number); }}>
          {number}
        </Pagination.Item>,
      );
    }
    items.push(
      <Pagination.Next key={props.blogCount + 1} onClick={() => { if (active !== props.blogCount) changePage(active + 1); }} />,

    );
    items.push(
      <Pagination.Last key={props.blogCount + 2} onClick={() => { changePage(currBlogs.length); }} />,
    );
    return items;
  };

  const displayBlogPost = (post) => {
    if (keyword === '' || post.keywords.includes(keyword)) {
      if ((props.user.type === 'admin' || props.user.type === 'contributor') || post.visible) {
        return (
          <div key={`${post._id}main`} className="post">
            <IndivBlog blog={post} key={post._id} user={props.user} visible={post.visible} changeKeyword={changeKeyword} />
            {(props.user.type === 'admin' || props.user.type === 'contributor')
              ? (
                <div key={`${post._id}div`}>
                  <NavLink to={ROUTES.NEW_BLOG} onClick={() => { props.setBlog(post); }}>
                    <Button>
                      Edit post
                    </Button>
                  </NavLink>
                  <span>&nbsp;</span>
                  <Button
                    variant={post.visible ? 'danger' : 'success'}
                    onClick={() => {
                      props.updateBlog(
                        { ...post, visible: !post.visible },
                        props.user,
                      );
                    }}
                  >
                    {post.visible ? 'Hide post' : 'Show post'}
                  </Button>

                </div>
              )
              : <div key={`${post._id}div`} />
              }
            <p>Comment:</p>
            <textarea type="text" name="comment" value={comment} onChange={e => changeComment(e.target.value)} className="comment" />
            <Button
              onClick={() => {
                const newComments = post.comments;
                let name = 'Anonymous';
                if (Object.keys(props.user).length !== 0) {
                  name = `${props.user.first_name} ${props.user.last_name}`;
                }
                newComments.splice(0, 0, {
                  author: name,
                  body: comment,
                  date: Date.now(),
                  visible: true,
                });
                props.commentBlog({
                  ...post,
                  comments: newComments,
                },
                props.user);
              }}
            >
              Submit
            </Button>
            {post.comments.map((c, index) => {
              if ((props.user.type === 'none' || Object.keys(props.user).length === 0) && c.visible) {
                return (
                  <div key={c.body} className="comment-container">
                    <p>{changeComment.author}</p>
                    <p className="date">{new Date(c.date).toDateString()}</p>
                    <p>{c.body}</p>
                  </div>
                );
              } else if (props.user.type === 'contributor' || props.user.type === 'admin') {
                return (
                  <div>
                    <div key={c.body} className="comment-container" id="admin">
                      <p>{c.author}</p>
                      <p className="date">{new Date(c.date).toDateString()}</p>
                      <p>{changeCurrBlogs.body}</p>
                    </div>
                    <div onClick={() => {
                      post.comments.splice(index, 1, { ...c, visible: !c.visible });
                      props.updateBlog(post,
                        props.user);
                    }}
                      role="button"
                      tabIndex={0}
                      className="button"
                    >
                      {c.visible ? 'Hide comment' : 'Show comment'}
                    </div>
                  </div>
                );
              } else {
                return <div key={c.body} />;
              }
            })}
          </div>


        );
      } else return (<div key={`${post._id}div`} />);
    } else return (<div key={`${post._id}div`} />);
  };
  return (
    <div className="container">
      {(props.user.type === 'admin' || props.user.type === 'contributor')
        ? (
          <div className="keywords">
            <NavLink to={ROUTES.NEW_BLOG}>
              <Button>
                new post
              </Button>
            </NavLink>
            <p>Keywords:</p>
            {props.keywords.map((kw) => {
              return (
                <div onClick={() => { changeKeyword(kw.name); }}
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
            {props.keywords.map((kw) => {
              if (kw.postCount !== 0) {
                return (
                  <div onClick={() => { changeKeyword(kw.name); }}
                    role="button"
                    tabIndex={0}
                    key={kw.name}
                    style={{ textDecoration: 'underline', color: 'blue' }}
                  >
                    {kw.name}
                  </div>

                );
              } else {
                return <div key={kw.name} />;
              }
            })}
          </div>
        )
          }

      <div className="postContainer">

        {keyword === '' ? <div />
          : (
            <div>
              <p style={{ display: 'inline-block', margin: '5px' }}>Keyword selected: {keyword}</p>
              <Button onClick={() => changeKeyword('')}>
                clear
              </Button>
            </div>
          )

          }
        {currBlogs.length === 0 ? <h1>Loading blog...</h1> : displayBlogPost(currBlogs[page - 1])}
        <br />
        <br />
        <Pagination>{fillPaginationItems()}</Pagination>
        <br />
        <br />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    blogs: state.blog.allBlogs,
    blog: state.blog.blog,
    blogCount: state.blog.blogCount,
    keywords: state.blog.keywords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogCount: () => {
      dispatch(getBlogCount());
    },
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

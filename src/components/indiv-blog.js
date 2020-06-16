import React from 'react';
import '../styles/navbar.css';

const IndivBlog = (props) => {
  return (
    <div className="navbar">
      <h1>{props.blog.title}</h1>
      <h2>{props.blog.author}</h2>
      {(props.user.type === 'admin' || props.user.type === 'contributor') ? <p>Post visible: {JSON.stringify(props.visible)}</p> : <div />}
      <h3>{new Date(props.blog.date).toDateString()}</h3>
      <p>{props.blog.body}</p>
    </div>
  );
};

export default IndivBlog;

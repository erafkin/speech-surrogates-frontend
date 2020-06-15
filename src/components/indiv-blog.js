import React from 'react';
import '../styles/navbar.css';


const IndivBlog = (props) => {
  return (
    <div className="navbar">
      <h1>{props.blog.title}</h1>
      <h3>{props.blog.author}</h3>
      <h3>{new Date(props.blog.date).toDateString()}</h3>

      <p>{props.blog.body}</p>
    </div>
  );
};

export default IndivBlog;

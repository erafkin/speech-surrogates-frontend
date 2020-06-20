import React from 'react';
import '../styles/navbar.css';

const IndivBlog = (props) => {
  return (
    <div className="navbar">
      <h1>{props.blog.title}</h1>
      <h2>{props.blog.author}</h2>
      {(props.user.type === 'admin' || props.user.type === 'contributor') ? <p>Post visible: {JSON.stringify(props.visible)}</p> : <div />}
      <h3>{new Date(props.blog.date).toDateString()}</h3>
      <div>Keywords: {props.blog.keywords.map((word) => {
        return (
          <div onClick={() => { props.changeKeyword(word); }}
            role="button"
            tabIndex={0}
            key={word}
            style={{
              display: 'inline-block', margin: '5px', textDecoration: 'underline', color: 'blue',
            }}
          >
            {word}
          </div>
        );
      })}
      </div>
      <p>{props.blog.body}</p>
    </div>
  );
};

export default IndivBlog;

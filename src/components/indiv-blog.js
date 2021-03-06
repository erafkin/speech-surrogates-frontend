import React from 'react';
import '../styles/navbar.css';

const IndivBlog = (props) => {
  return (
    <div>
      <h2>{props.blog.title}</h2>
      <h3>{props.blog.author}</h3>
      {(props.user.type === 'admin' || props.user.type === 'contributor')
        ? (
          <h4>Post visible: {
      props.visible
        ? <span style={{ color: 'green' }}>true</span>
        : <span style={{ color: 'red' }}>false</span>}
          </h4>
        )
        : <div />}
      <h4 style={{ marginRight: '1vw' }}>{new Date(props.blog.date).toDateString()}</h4>
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
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: props.blog.body }} />

    </div>
  );
};

export default IndivBlog;

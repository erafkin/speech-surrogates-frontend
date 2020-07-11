/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import home from '../assets/home.jpg';
import '../styles/home.css';

const Home = (props) => {
  return (
    <div>
      <div>
        <h1 className="homeTitle">Speech Surrogates</h1>

        <img src={home} alt="balafon" className="homeImage" />
      </div>

    </div>
  );
};

export default Home;

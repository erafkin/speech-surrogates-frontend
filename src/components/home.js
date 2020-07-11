/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import home from '../assets/home.jpg';
import '../styles/home.css';

const Home = (props) => {
  return (
    <div>
      <div>
        <div className="homeTitleContainer">
          <h1 className="homeTitle">Speech Surrogates</h1>
          <p className="homeSubtitle"> Encoding language through music, whistling, and other modalities</p>
        </div>
        <img src={home} alt="balafon" className="homeImage" />
      </div>
      <div>
        {/* <p>idk some other stuff</p> */}
      </div>

    </div>
  );
};

export default Home;

/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import LanguageNav from './language-nav';


const Home = (props) => {
  return (
    <div>
      <h2>Welcome to the Surrogate Languages website</h2>
      <NavLink to={ROUTES.BLOG}>
        <div className="button">
          blog
        </div>
      </NavLink>
      <h3>Grant Languages</h3>
      <LanguageNav />
    </div>
  );
};

export default Home;

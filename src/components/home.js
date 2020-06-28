/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import LanguageNav from './language-nav';


const Home = (props) => {
  return (
    <div>
      <p>Welcome to the Surrogate Languages website</p>
      <NavLink to={ROUTES.BLOG}>
        <div className="button">
          blog
        </div>
      </NavLink>
      <LanguageNav />
    </div>
  );
};

export default Home;

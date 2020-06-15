/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';


const Home = (props) => {
  return (
    <div>
      <p>Welcome to the Surrogate Languages website</p>
      <NavLink to={ROUTES.BLOG}>
        <div className="button">
          blog
        </div>
      </NavLink>
    </div>
  );
};

export default Home;

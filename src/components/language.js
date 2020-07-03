/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { } from '../state/actions';
import '../styles/navbar.css';
import ReactPlayer from 'react-player';
import ReactHtmlParser from 'react-html-parser';
import { ROUTES } from '../constants';


const LanguagePage = (props) => {
  return (
    <div>
      <h1>{props.match.params.lang_name}</h1>
      {/* eslint-disable-next-line new-cap */}
      <div>{ReactHtmlParser(props.grantLanguage.blurb)}</div>
      {props.grantLanguage.multimedia.map((link) => {
        return (
          <div>
            <ReactPlayer url={link.link} key={link.link} controls />
            {/* eslint-disable-next-line new-cap */}
            <div>{ReactHtmlParser(link.blurb)}</div>
          </div>
        );
      })}
      {props.user.type === 'admin' || props.user.type === 'contributor'
        ? (
          <NavLink to={ROUTES.NEW_LANG}>
            <div className="button">
              Edit Page
            </div>
          </NavLink>
        )
        : <div />
    }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    grantLanguage: state.grantLanguage.grantLanguage,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LanguagePage));

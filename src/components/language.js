/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { } from '../state/actions';
import '../styles/navbar.css';
import ReactPlayer from 'react-player';


const LanguagePage = (props) => {
  return (
    <div>
      <div>{props.match.params.lang_name}</div>
      <div>{props.grantLanguage.blurb}</div>
      {props.grantLanguage.multimedia.map((url) => {
        return (
          <ReactPlayer url={url} key={url} controls />

        );
      })}


    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    grantLanguage: state.grantLanguage.grantLanguage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LanguagePage));

/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import ReactPlayer from 'react-player';
import ReactHtmlParser from 'react-html-parser';
import { ROUTES } from '../constants';
import { getGrantLanguage } from '../state/actions';


class LanguagePage extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.grantLanguage).length === 0) {
      if (this.props.match.params._id !== undefined) {
        this.props.getGrantLanguage(this.props.match.params._id);
      } else {
        const urlArray = window.location.href.split('/');
        const lang = urlArray[urlArray.length - 1];
        this.props.getGrantLanguage(lang);
      }
    }
  }

  render() {
    return (

      <div>
        <h1>{this.props.grantLanguage.title}</h1>
        <div>
          <p>Sections:</p>
          {this.props.grantLanguage.sections !== undefined ? this.props.grantLanguage.sections.map((section) => {
            return (
              <div>
                <a href={`#${section.title}`}>{section.title}</a>
                <br />
              </div>
            );
          }) : <div />}
        </div>
        {this.props.grantLanguage.sections !== undefined ? this.props.grantLanguage.sections.map((section) => {
          return (
            <div id={section.title}>
              <h2>{section.title}</h2>
              {/* eslint-disable-next-line new-cap */}
              <div>{ReactHtmlParser(section.blurb)}</div>
              {section.multimedia.map((link) => {
                return (
                  <div>
                    {/* eslint-disable-next-line new-cap */}
                    <div>{ReactHtmlParser(link.blurb)}</div>
                    <ReactPlayer url={link.link} key={link.link} controls />
                  </div>
                );
              })}
            </div>
          );
        }) : <div />}

        {this.props.user.type === 'admin' || this.props.user.type === 'contributor'
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
  }
}

const mapStateToProps = (state) => {
  return {
    grantLanguage: state.grantLanguage.grantLanguage,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGrantLanguage: (id) => {
      dispatch(getGrantLanguage(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LanguagePage));

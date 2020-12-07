/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import '../styles/blog.css';
import ReactPlayer from 'react-player';
import Button from 'react-bootstrap/Button';
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
        <h1 className="lang-title">{this.props.grantLanguage.name}</h1>
        <div className="keywords">
          {this.props.user.type === 'admin' || this.props.user.type === 'contributor'
            ? (
              <NavLink to={ROUTES.NEW_LANG}>
                <Button>
                  Edit page
                </Button>
              </NavLink>
            )
            : <div />
          }
          <p>Sections:</p>
          {this.props.grantLanguage.sections !== undefined ? this.props.grantLanguage.sections.map((section) => {
            return (
              <div key={section.title}>
                <a href={`#${section.title}`} style={{ textDecoration: 'underline', color: 'blue' }}>{section.title}</a>
                <br />
              </div>
            );
          }) : <div />}
        </div>
        <div className="postContainer">
          {this.props.grantLanguage.sections !== undefined ? this.props.grantLanguage.sections.map((section) => {
            return (
              <div key={section.title}>
                <h2>{section.title}</h2>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: section.blurb }} />
                {section.multimedia.map((link) => {
                  return (
                    <div key={link.link}>
                      {/* eslint-disable-next-line react/no-danger */}
                      <div dangerouslySetInnerHTML={{ __html: link.blurb }} />
                      <ReactPlayer url={link.link} key={link.link} controls />
                    </div>
                  );
                })}
              </div>
            );
          }) : <div />}
        </div>
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

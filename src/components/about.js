import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ROUTES } from '../constants';
import { getAboutPage } from '../state/actions';

class About extends React.Component {
  componentWillMount() {
    if (Object.keys(this.props.about).length === 0) {
      if (this.props.match.params._id !== undefined) {
        this.props.getAboutPage(this.props.match.params._id);
      } else {
        const urlArray = window.location.href.split('/');
        const lang = urlArray[urlArray.length - 1];
        this.props.getAboutPage(lang);
      }
    }
  }

  render() {
    return (
      <div style={{ margin: '2vw' }}>
        {this.props.user.type === 'admin'
          ? (
            <NavLink to={ROUTES.NEW_ABOUT}>
              <Button>
                Edit page
              </Button>
            </NavLink>
          )
          : <div />
          }
        <h1 className="lang-title">{this.props.about.title}</h1>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: this.props.about.blurb }} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    about: state.about.aboutPage,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAboutPage: (id) => {
      dispatch(getAboutPage(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));

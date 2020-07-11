/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { getAllGrantLanguages, setGrantLanguage } from '../state/actions';
import '../styles/navbar.css';


class LanguageNav extends React.Component {
  componentWillMount() {
    this.props.getAllGrantLanguages();
    console.log(this.props.allGrantLanguages);
  }

  render() {
    return (
      <div>
        {this.props.allGrantLanguages.map((lang) => {
          return (
            <div>
              <NavDropdown.Item as={NavLink} to={`/languages/${lang._id}`} key={lang._id} onClick={() => { this.props.setGrantLanguage(lang); }}>
                {lang.name}
              </NavDropdown.Item>
            </div>
          );
        })}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allGrantLanguages: state.grantLanguage.allGrantLanguages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllGrantLanguages: () => {
      dispatch(getAllGrantLanguages());
    },
    setGrantLanguage: (lang) => {
      dispatch(setGrantLanguage(lang));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LanguageNav));

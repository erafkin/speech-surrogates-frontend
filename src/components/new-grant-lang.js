/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { createGrantLanguage, updateGrantLanguage } from '../state/actions';
import '../styles/blog.css';
import TextEditor from './text-editor';


class NewGrantLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.grantLanguage.name === undefined ? '' : this.props.grantLanguage.name,
      blurb: this.props.grantLanguage.blurb === undefined ? '' : this.props.grantLanguage.blurb,
      links: (this.props.grantLanguage.multimedia === undefined || this.props.grantLanguage.multimedia.length === 0) ? [] : this.props.grantLanguage.multimedia,
      newLink: '',
      newLinkBlurb: '',

    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBlurbChange = this.handleBlurbChange.bind(this);
    this.handleLinkBlurbChange = this.handleLinkBlurbChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleLinkChange = (e) => {
    this.setState({ newLink: e.target.value });
  }

  handleBlurbChange = (e) => {
    this.setState({ blurb: e });
  }

  handleLinkBlurbChange = (e) => {
    this.setState({ newLinkBlurb: e });
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onSuccessCallback = () => {
    this.props.history.push('/');
  };

  onFailureCallback = (error) => {
    this.toast.error(JSON.stringify(error));
  };

  submit = () => {
    if (this.props.grantLanguage._id !== undefined) {
      // update page
      console.log(this.state.links);
      this.props.updateGrantLanguage(
        {
          ...this.props.grantLanguage,
          name: this.state.name,
          blurb: this.state.blurb,
          multimedia: this.state.links,
        },
        this.props.user,
        this.onSuccessCallback,
        this.onFailureCallback,
      );
    } else {
      // create page
      this.props.createGrantLanguage(
        {
          name: this.state.name,
          blurb: this.state.blurb,
          multimedia: this.state.links,
        },
        this.props.user,
        this.onSuccessCallback,
        this.onFailureCallback,
      );
    }
  }


  render() {
    const { newLink, newLinkBlurb, links } = this.state;
    return (
      <div className="container">
        <p>Title:</p>
        <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} className="title" />

        <p>Blurb:</p>
        <TextEditor body={this.state.blurb} handleBodyChange={this.handleBlurbChange} />
        <br />
        <p>Multimedia Links:</p>
        {this.state.links.map((link) => {
          return (
            <div key={link.link}>
              <p style={{ display: 'inline-block' }}>{link.link}</p>
              {/* eslint-disable-next-line new-cap */}
              <div>{ReactHtmlParser(link.blurb)}</div>
              <div className="button"
                onClick={() => {
                  const l = [...this.state.links];
                  const l2 = l.filter(x => x !== link);
                  this.setState({ links: l2 });
                }}
                role="button"
                tabIndex={0}
                style={{ display: 'inline-block' }}
              >
                Remove
              </div>
            </div>
          );
        })}
        <input type="text" name="new-link" value={this.state.newLink} onChange={this.handleLinkChange} className="title" />
        <TextEditor body={this.state.newLinkBlurb} handleBodyChange={this.handleLinkBlurbChange} />
        <div className="button"
          role="button"
          tabIndex={0}
          onMouseDown={() => this.setState({
            links: [...links, { link: newLink, blurb: newLinkBlurb }],
            newLink: '',
            newLinkBlurb: '',
          })
          }
        >
          Add
        </div>

        <br />
        <div className="button" onClick={() => { this.submit(); }} role="button" tabIndex={0}>
          submit
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
    createGrantLanguage: (lang, user, success, failure) => {
      dispatch(createGrantLanguage(lang, user, success, failure));
    },
    updateGrantLanguage: (lang, user, success, failure) => {
      dispatch(updateGrantLanguage(lang, user, success, failure));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewGrantLanguage);

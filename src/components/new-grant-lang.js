/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';

import { } from '../state/actions';
import '../styles/blog.css';
import TextEditor from './text-editor';

class NewGrantLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.grantLanguage.name === undefined ? '' : this.props.grantLanguage.name,
      blurb: this.props.grantLanguage.blurb === undefined ? '' : this.props.grantLanguage.blurb,
      links: this.props.grantLanguage.multimedia === undefined ? [] : this.props.grantLanguage.multimedia,
      newLink: '',

    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBlurbChange = this.handleBlurbChange.bind(this);
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

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onSuccessCallback = () => {
    this.props.history.push('/blog');
  };

  onFailureCallback = (error) => {
    this.toast.error(JSON.stringify(error));
  };

  submit = () => {
    if (this.props.blog._id !== undefined) {
      // update page
    } else {
      // create page
    }
  }


  render() {
    const { newLink } = this.state;
    return (
      <div className="container">
        <div>
          <p>Language Name:</p>
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} className="title" />

          <p>Blurb:</p>
          <TextEditor body={this.state.blurb} handleBodyChange={this.handleBlurbChange} />
          <br />
          <p>Multimedia Links:</p>
          {this.state.links.map((link, index) => {
            return (
              <div key={link}>
                <p style={{ display: 'inline-block' }}>{link}</p>
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
                  X
                </div>
              </div>
            );
          })}
          <div>
            <input type="text" name="new-link" value={this.state.newLink} onChange={this.handleLinkChange} className="title" />
            <div className="button"
              onClick={() => {
                this.setState(prevState => ({
                  links: [...prevState.links, newLink],
                }));
              }}
              role="button"
              tabIndex={0}
              style={{ display: 'inline-block' }}
            >
              +
            </div>

          </div>
          <br />
          <div className="button" onClick={() => this.submit()} role="button" tabIndex={0}>
            submit
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grantLanguage: state.grantLanguage.grantLanguage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewGrantLanguage);

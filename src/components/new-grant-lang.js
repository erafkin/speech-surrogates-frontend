/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';

import { createGrantLanguage, updateGrantLanguage } from '../state/actions';
import '../styles/blog.css';
import TextEditor from './text-editor';


class NewGrantLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.grantLanguage.name === undefined ? '' : this.props.grantLanguage.name,
      sections: (this.props.grantLanguage.sections === undefined || this.props.grantLanguage.sections.length === 0) ? [] : this.props.grantLanguage.sections,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBlurbChange = this.handleBlurbChange.bind(this);
    this.handleLinkBlurbChange = this.handleLinkBlurbChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleTitleChange = (e, index) => {
    const { sections } = this.state;
    sections[index].title = e.target.value;
    this.setState({ sections });
  }

  handleBlurbChange = (e, index) => {
    const { sections } = this.state;
    sections[index].blurb = e;
    this.setState({ sections });
  }

  handleLinkBlurbChange = (e, sectionIndex, index) => {
    const { sections } = this.state;
    sections[sectionIndex].multimedia[index].blurb = e;
    this.setState({ sections });
  }

  handleLinkChange = (e, sectionIndex, index) => {
    const { sections } = this.state;
    sections[sectionIndex].multimedia[index].link = e.target.value;
    this.setState({ sections });
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
          sections: this.state.sections,
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
          sections: this.state.sections,
        },
        this.props.user,
        this.onSuccessCallback,
        this.onFailureCallback,
      );
    }
  }


  render() {
    const { sections } = this.state;
    return (
      <div className="container">
        <p>Title:</p>
        <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} className="title" />
        {sections.map((section, index) => {
          return (
            <div key={section.blurb}>
              <p>Section Title:</p>
              <input type="text" name="title" value={section.title} onChange={event => this.handleTitleChange(event, index)} className="title" />
              <p>Section Blurb:</p>
              <TextEditor body={section.blurb} handleBodyChange={this.handleBlurbChange} sectionIndex={index} />
              {section.multimedia.map((link, i) => {
                return (
                  <div key={link.link}>
                    <p>Multimedia Blurb:</p>
                    <TextEditor body={link.blurb} handleBodyChange={this.handleLinkBlurbChange} sectionIndex={index} index={i} />
                    <p>URL:</p>
                    <input type="text" name="link" value={link.link} onChange={event => this.handleLinkChange(event, index, i)} className="title" />
                    <div className="button"
                      onClick={() => {
                        const l = [...sections[index].multimedia];
                        const l2 = l.filter(x => x !== link);
                        sections[index].multimedia = l2;
                        this.setState({ sections });
                      }}
                      role="button"
                      tabIndex={0}
                      style={{ display: 'inline-block' }}
                    >
                      Remove Multimedia
                    </div>
                  </div>
                );
              })}
              <div className="button"
                role="button"
                tabIndex={0}
                onClick={() => {
                  sections[index].multimedia = [...sections[index].multimedia, { blurb: '', link: '' }];
                  this.setState({ sections });
                }}
              >
                Add Multimedia
              </div>
              <div className="button"
                onClick={() => {
                  const s2 = sections.filter(x => x !== section);
                  this.setState({ sections: s2 });
                }}
                role="button"
                tabIndex={0}
                style={{ display: 'inline-block' }}
              >
                Remove Section
              </div>
            </div>
          );
        })}
        <div className="button"
          role="button"
          tabIndex={0}
          onClick={() => {
            this.setState({ sections: [...sections, { title: '', blurb: '', multimedia: [] }] });
          }}
        >
          Add Section
        </div>
        <div className="button" onMouseDown={() => { this.submit(); }} role="button" tabIndex={0}>
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

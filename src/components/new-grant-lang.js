/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { createGrantLanguage, updateGrantLanguage, deleteIndivGrantLang } from '../state/actions';
import '../styles/blog.css';


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
    this.onSuccessCallbackUpdate = this.onSuccessCallbackUpdate.bind(this);
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

  onSuccessCallbackUpdate =() => {
    this.props.history.push(`/languages/${this.props.grantLanguage._id}`);
  }

  onFailureCallback = (error) => {
    this.toast.error(JSON.stringify(error));
  };

  submit = () => {
    if (this.props.grantLanguage._id !== undefined) {
      // update page
      this.props.updateGrantLanguage(
        {
          ...this.props.grantLanguage,
          name: this.state.name,
          sections: this.state.sections,
        },
        this.props.user,
        this.onSuccessCallbackUpdate,
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
      <div className="newPageContainer">
        <p>Title:</p>
        <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} className="title" />
        {sections.map((section, index) => {
          console.log(section);
          return (
            <div key={section.blurb}>
              <p>Section Title:</p>
              <input type="text" name="title" value={section.title} onChange={event => this.handleTitleChange(event, index)} className="title" />
              <p>Section Blurb:</p>
              <SunEditor onChange={e => this.handleBlurbChange(e, index)}
                setContents={section.blurb}
                setOptions={{
                  height: 200,
                  buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock'],
                    ['paragraphStyle', 'blockquote'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor', 'hiliteColor', 'textStyle'],
                    ['removeFormat'],
                    '/', // Line break
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['table', 'link', 'image', 'video', 'audio'], // You must add the 'katex' library at options to use the 'math' plugin.
                    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['preview', 'print'],
                    ['save', 'template'],
                  ],
                }}
              />
              {section.multimedia.map((link, i) => {
                return (
                  <div key={`${section.blurb}link`}>
                    <p>Multimedia Blurb:</p>
                    <SunEditor onChange={e => this.handleLinkBlurbChange(e, index, i)}
                      setContents={link.blurb}
                      setOptions={{
                        height: 100,
                        buttonList: [
                          ['undo', 'redo'],
                          ['font', 'fontSize', 'formatBlock'],
                          ['paragraphStyle', 'blockquote'],
                          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                          ['fontColor', 'hiliteColor', 'textStyle'],
                          ['removeFormat'],
                          '/', // Line break
                          ['outdent', 'indent'],
                          ['align', 'horizontalRule', 'list', 'lineHeight'],
                          ['table', 'link', 'image', 'video', 'audio'], // You must add the 'katex' library at options to use the 'math' plugin.
                          /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                          ['fullScreen', 'showBlocks', 'codeView'],
                          ['preview', 'print'],
                          ['save', 'template'],
                        ],
                      }}
                    />
                    <p>URL:</p>
                    <input type="text" name="link" value={link.link} onChange={event => this.handleLinkChange(event, index, i)} className="title" />
                    <br />
                    <Button variant="danger"
                      onClick={() => {
                        const l = [...sections[index].multimedia];
                        const l2 = l.filter(x => x !== link);
                        sections[index].multimedia = l2;
                        this.setState({ sections });
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      Remove Multimedia
                    </Button>
                  </div>
                );
              })}
              <br />

              <Button variant="success"
                onClick={() => {
                  sections[index].multimedia = [...sections[index].multimedia, { blurb: '', link: '' }];
                  this.setState({ sections });
                }}
              >
                Add Multimedia
              </Button>
              <br />
              <br />

              <Button variant="danger"
                onClick={() => {
                  const s2 = sections.filter(x => x !== section);
                  this.setState({ sections: s2 });
                }}
                style={{ display: 'inline-block' }}
              >
                Remove Section
              </Button>
              <br />
            </div>
          );
        })}
        <br />

        <Button variant="success"
          onClick={() => {
            this.setState({ sections: [...sections, { title: '', blurb: '', multimedia: [] }] });
          }}
        >
          Add Section
        </Button>
        <br />
        <br />
        <Button onMouseDown={() => { this.submit(); }}>
          Submit
        </Button>
        <br />
        <br />
        {this.props.grantLanguage._id !== undefined
          ? (
            <Button onMouseDown={() => { this.props.deleteIndivGrantLang(this.props.grantLanguage, this.onSuccessCallback, this.onFailureCallback); }} variant="danger">
              Delete Page
            </Button>
          ) : <div />
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
    createGrantLanguage: (lang, user, success, failure) => {
      dispatch(createGrantLanguage(lang, user, success, failure));
    },
    updateGrantLanguage: (lang, user, success, failure) => {
      dispatch(updateGrantLanguage(lang, user, success, failure));
    },
    deleteIndivGrantLang: (lang, success, failure) => {
      dispatch(deleteIndivGrantLang(lang, success, failure));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewGrantLanguage);

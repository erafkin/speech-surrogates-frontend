/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { createAboutPage, updateAboutPage, deleteAboutPage } from '../state/actions';
import '../styles/blog.css';

import { ROUTES } from '../constants';

class NewAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blurb: this.props.about.blurb === undefined ? '' : this.props.about.blurb,
      title: this.props.about.title === undefined ? '' : this.props.about.title,
    };
    this.handleBlurbChange = this.handleBlurbChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.onSuccessCallbackUpdate = this.onSuccessCallbackUpdate.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleBlurbChange = (e) => {
    this.setState({ blurb: e });
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  onSuccessCallback = () => {
    this.props.history.push(ROUTES.HOME);
  };

  onSuccessCallbackUpdate =() => {
    this.props.history.push(`/about/${this.props.about._id}`);
  }

  onFailureCallback = (error) => {
    this.toast.error(JSON.stringify(error));
  };

  submit = () => {
    if (this.props.about._id !== undefined) {
      this.props.updateAboutPage(
        {
          ...this.props.about,
          title: this.state.title,
          blurb: this.state.blurb,
        },
        this.props.user,
        this.onSuccessCallbackUpdate,
        this.onFailureCallback,
      );
    } else {
      this.props.createAboutPage(
        {
          title: this.state.title,
          blurb: this.state.blurb,
        },
        this.props.user,
        this.onSuccessCallback,
        this.onFailureCallback,
      );
    }
  }


  render() {
    return (
      <div className="newPageContainer">
        <p>Title:</p>
        <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange} className="title" />
        <p>Body:</p>
        <SunEditor onChange={this.handleBlurbChange}
          setContents={this.state.blurb}
          setOptions={{
            height: 300,
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
        <br />
        <Button className="button" onClick={() => this.submit()}>
          Submit
        </Button>
        {this.props.about._id !== undefined
          ? (
            <Button className="button" onClick={() => this.props.deleteAboutPage(this.props.about, this.onSuccessCallback, this.onFailureCallback)} variant="danger">
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
    about: state.about.aboutPage,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAboutPage: (a, u, s, f) => {
      dispatch(createAboutPage(a, u, s, f));
    },
    updateAboutPage: (a, u, s, f) => {
      dispatch(updateAboutPage(a, u, s, f));
    },
    deleteAboutPage: (page, s, f) => {
      dispatch(deleteAboutPage(page, s, f));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewAbout);

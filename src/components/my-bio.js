/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { updateUser } from '../state/actions';
import '../styles/blog.css';
import { ROUTES } from '../constants';

class MyBio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.user.bio === undefined ? '' : this.props.user.bio,
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleBodyChange = (e) => {
    this.setState({ body: e });
  }

  onSuccessCallback = () => {
    this.props.history.push(ROUTES.BIOS);
  };


  submit = () => {
    console.log(this.state.body);
    this.props.updateUser(
      {
        ...this.props.user,
        bio: this.state.body,
      },
    );
    this.onSuccessCallback();
  }


  render() {
    return (
      <div className="newPageContainer">
        <h3>Format your bio in the box below:</h3>
        <SunEditor onChange={this.handleBodyChange}
          setContents={this.state.body}
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
        />        <br />
        <Button className="button" onClick={() => this.submit()}>
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyBio);

/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { updateUser } from '../state/actions';
import '../styles/blog.css';
import TextEditor from './text-editor';

class MyBio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.user.bio === undefined ? '' : this.props.user.bio,
      first_load: 0,
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.submit = this.submit.bind(this);
  }

  // something weird is happening here...
  static getDerivedStateFromProps(p, state) {
    console.log('!@#$!@#$');
    if (state.first_load < 2) {
      return {
        body: p.user.bio === undefined ? '' : p.user.bio,
        first_load: state.first_load + 1,
      };
    } else {
      return {};
    }
  }

  handleBodyChange = (e) => {
    this.setState({ body: e });
  }

  onSuccessCallback = () => {
    this.props.history.push('/');
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
    console.log(JSON.stringify(this.props.user));
    console.log(JSON.stringify(this.props.user.bio));

    console.log(this.state.body);

    return (
      <div className="newPageContainer">
        <p>Format your bio in the box below:</p>
        <TextEditor body={this.state.body} handleBodyChange={this.handleBodyChange} />
        <br />
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

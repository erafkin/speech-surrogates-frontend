/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { createIndivMapLang, updateIndivMapLang } from '../state/actions';
import '../styles/blog.css';
import TextEditor from './text-editor';


class NewMapEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.indivMapLang.name === undefined ? '' : this.props.indivMapLang.name,
      continent: this.props.indivMapLang.continent === undefined ? '' : this.props.indivMapLang.continent,
      country: this.props.indivMapLang.country === undefined ? '' : this.props.indivMapLang.country,
      instrumentFamily: this.props.indivMapLang.instrumentFamily === undefined ? '' : this.props.indivMapLang.instrumentFamily,
      instrumentType: this.props.indivMapLang.instrumentType === undefined ? '' : this.props.indivMapLang.instrumentType,
      contrastsEncoded: this.props.indivMapLang.contrastsEncoded === undefined ? '' : this.props.indivMapLang.contrastsEncoded,
      depthOfEncoding: this.props.indivMapLang.depthOfEncoding === undefined ? '' : this.props.indivMapLang.depthOfEncoding,
      content: this.props.indivMapLang.content === undefined ? '' : this.props.indivMapLang.content,
      specialization: this.props.indivMapLang.specialization === undefined ? '' : this.props.indivMapLang.specialization,
      comprehension: this.props.indivMapLang.comprehension === undefined ? '' : this.props.indivMapLang.comprehension,
      productivity: this.props.indivMapLang.productivity === undefined ? '' : this.props.indivMapLang.productivity,
      source: this.props.indivMapLang.source === undefined ? '' : this.props.indivMapLang.source,
      mentions: this.props.indivMapLang.mentions === undefined ? '' : this.props.indivMapLang.mentions,
      summary: this.props.indivMapLang.summary === undefined ? '' : this.props.indivMapLang.summary,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange = (type, e) => {
    switch (type) {
      case 'name':
        this.setState({ name: e.target.value });
        break;
      case 'continent':
        this.setState({ continent: e.target.value });
        break;
      case 'country':
        this.setState({ country: e.target.value });
        break;
      case 'instrumentFamily':
        this.setState({ instrumentFamily: e.target.value });
        break;
      case 'instrumentType':
        this.setState({ instrumentType: e.target.value });
        break;
      case 'contrastsEncoded':
        this.setState({ contrastsEncoded: e.target.value });
        break;
      case 'depthOfEncoding':
        this.setState({ depthOfEncoding: e.target.value });
        break;
      case 'content':
        this.setState({ content: e.target.value });
        break;
      case 'specialization':
        this.setState({ specialization: e.target.value });
        break;
      case 'comprehension':
        this.setState({ comprehension: e.target.value });
        break;
      case 'productivity':
        this.setState({ productivity: e.target.value });
        break;
      case 'source':
        this.setState({ source: e.target.value });
        break;
      case 'mentions':
        this.setState({ mentions: e.target.value });
        break;
      default:
        break;
    }
  }

  handleBodyChange = (e) => {
    this.setState({ summary: e });
  }

  onSuccessCallback = () => {
    this.props.history.push('/map');
  };

  onFailureCallback = (error) => {
    this.toast.error(JSON.stringify(error));
  };

  submit = () => {
    const map = {
      name: this.state.name,
      continent: this.state.continent,
      country: this.state.country,
      instrumentFamily: this.state.instrumentFamily,
      instrumentType: this.state.instrumentType,
      contrastsEncoded: this.state.contrastsEncoded,
      depthOfEncoding: this.state.depthOfEncoding,
      content: this.state.content,
      specialization: this.state.specialization,
      comprehension: this.state.comprehension,
      productivity: this.state.productivity,
      source: this.state.source,
      mentions: this.state.mentions,
      summary: this.state.summary,
    };
    console.log(map);
    if (this.props.indivMapLang._id !== undefined) {
      // update page
      this.props.updateIndivMapLang(
        map,
        this.props.user,
        this.onSuccessCallback,
        this.onFailureCallback,
      );
    } else {
      // create page
      this.props.createIndivMapLang(
        map,
        this.props.user,
        this.onSuccessCallback,
        this.onFailureCallback,
      );
    }
  }


  render() {
    const { summary } = this.state;
    return (
      <div className="newPageContainer">
        <p>Language Name:</p>
        <input type="text" name="name" value={this.state.name} onChange={event => this.handleChange('name', event)} className="title" />
        <p>Continent of Origin</p>
        <input type="text" name="title" value={this.state.continent} onChange={event => this.handleChange('continent', event)} className="title" />
        <p>Country of Origin</p>
        <input type="text" name="title" value={this.state.country} onChange={event => this.handleChange('country', event)} className="title" />
        <p>Instrument Family</p>
        <input type="text" name="title" value={this.state.instrumentFamily} onChange={event => this.handleChange('instrumentFamily', event)} className="title" />
        <p>Instrument Type</p>
        <input type="text" name="title" value={this.state.instrumentType} onChange={event => this.handleChange('instrumentType', event)} className="title" />
        <p>Contrasts Encoded</p>
        <input type="text" name="title" value={this.state.contrastsEncoded} onChange={event => this.handleChange('contrastsEncoded', event)} className="title" />
        <p>Depth of Encoding</p>
        <input type="text" name="title" value={this.state.depthOfEncoding} onChange={event => this.handleChange('depthOfEncoding', event)} className="title" />
        <p>Content</p>
        <input type="text" name="title" value={this.state.content} onChange={event => this.handleChange('content', event)} className="title" />
        <p>Specialization</p>
        <input type="text" name="title" value={this.state.specialization} onChange={event => this.handleChange('specialization', event)} className="title" />
        <p>Comprehension</p>
        <input type="text" name="title" value={this.state.comprehension} onChange={event => this.handleChange('comprehension', event)} className="title" />
        <p>Productivity</p>
        <input type="text" name="title" value={this.state.productivity} onChange={event => this.handleChange('productivity', event)} className="title" />
        <p>Summary:</p>
        <TextEditor body={summary} handleBodyChange={this.handleBodyChange} />
        <p>Source</p>
        <input type="text" name="title" value={this.state.source} onChange={event => this.handleChange('source', event)} className="title" />
        <p>Mentions</p>
        <input type="text" name="title" value={this.state.mentions} onChange={event => this.handleChange('mentions', event)} className="title" />
        <br />
        <br />
        <Button onMouseDown={() => { this.submit(); }}>
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    indivMapLang: state.map.indivMapLang,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createIndivMapLang: (m, u, s, f) => {
      dispatch(createIndivMapLang(m, u, s, f));
    },
    updateIndivMapLang: (m, u, s, f) => {
      dispatch(updateIndivMapLang(m, u, s, f));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewMapEntry);

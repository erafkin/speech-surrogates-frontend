/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { createIndivMapLang, updateIndivMapLang, deleteIndivMapLang } from '../state/actions';
import '../styles/blog.css';
import countryCodes from '../constants/country-to-code.json';

class NewMapEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.indivMapLang.language === undefined ? '' : this.props.indivMapLang.language,
      continent: this.props.indivMapLang.continent === undefined ? '' : this.props.indivMapLang.continent,
      country: this.props.indivMapLang.country === undefined ? [] : this.props.indivMapLang.country,
      instrumentFamily: this.props.indivMapLang.instrument_family === undefined ? '' : this.props.indivMapLang.instrument_family,
      instrumentType: this.props.indivMapLang.instrument_type === undefined ? '' : this.props.indivMapLang.instrument_type,
      contrastsEncoded: this.props.indivMapLang.contrasts_encoded === undefined ? '' : this.props.indivMapLang.contrasts_encoded,
      depthOfEncoding: this.props.indivMapLang.depth_of_encoding === undefined ? '' : this.props.indivMapLang.depth_of_encoding,
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

  countries = () => {
    const options = [];
    Object.keys(countryCodes).forEach((country) => {
      options.push({
        value: country,
        label: country,
      });
    });
    return options;
  }

  values = () => {
    const values = [];
    this.state.country.forEach((word) => {
      values.push({
        value: word,
        label: word,
      });
    });
    return values;
  }

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
    if (this.props.indivMapLang._id !== undefined) {
      // update page
      this.props.updateIndivMapLang(
        {
          language: this.state.name,
          continent: this.state.continent,
          country: this.state.country,
          instrument_family: this.state.instrumentFamily,
          instrument_type: this.state.instrumentType,
          contrasts_encoded: this.state.contrastsEncoded,
          depth_of_encoding: this.state.depthOfEncoding,
          content: this.state.content,
          specialization: this.state.specialization,
          comprehension: this.state.comprehension,
          productivity: this.state.productivity,
          source: this.state.source,
          mentions: this.state.mentions,
          summary: this.state.summary,
          _id: this.props.indivMapLang._id,
        },
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

  handleSelectChange = (newValue) => {
    const newCountries = [];
    if (newValue === null) {
      this.setState({
        country: [],
      });
    } else {
      newValue.forEach((val) => {
        newCountries.push(val.value);
      });
      this.setState({
        country: newCountries,
      });
    }
  };

  render() {
    const { summary } = this.state;
    const options = this.countries();
    const values = this.values();
    const continents = [{ value: 'Africa', label: 'Africa' },
      { value: 'Asia', label: 'Asia' },
      { value: 'Australia', label: 'Australia' },
      { value: 'Europe', label: 'Europe' },
      { value: 'North America', label: 'North America' },
      { value: 'South America', label: 'South America' }];
    return (
      <div className="newPageContainer">
        <p>Language Name:</p>
        <input type="text" name="name" value={this.state.name} onChange={event => this.handleChange('name', event)} className="title" />
        <p>Continent of Origin</p>
        <Select
          defaultValue={this.state.continent}
          name="continent"
          options={continents}
          className="basic"
          classNamePrefix="select"
          onChange={event => this.setState({ continent: event.value })}
        />
        <p>Country of Origin</p>
        <Select
          defaultValue={values}
          isMulti
          name="countries"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={this.handleSelectChange}
        />
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
        <SunEditor onChange={this.handleBodyChange}
          setContents={summary}
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
        />        <p>Source</p>
        <input type="text" name="title" value={this.state.source} onChange={event => this.handleChange('source', event)} className="title" />
        <p>Mentions</p>
        <input type="text" name="title" value={this.state.mentions} onChange={event => this.handleChange('mentions', event)} className="title" />
        <br />
        <br />
        <Button onMouseDown={() => { this.submit(); }}>
          Submit
        </Button>
        {this.props.indivMapLang._id !== undefined
          ? (
            <Button onMouseDown={() => { this.props.deleteIndivMapLang(this.props.indivMapLang, this.onSuccessCallback, this.onFailureCallback); }} variant="danger">
              Delete
            </Button>
          ) : <div />
      }

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
    deleteIndivMapLang: (m, s, f) => {
      dispatch(deleteIndivMapLang(m, s, f));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewMapEntry);

/* eslint-disable react/button-has-type */
/* eslint-disable no-param-reassign */
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { createIndivMapLang, updateIndivMapLang, deleteIndivMapLang } from '../state/actions';
import '../styles/blog.css';
import countryCodes from '../constants/country-to-code.json';
import {
  continentValues, comprehensionValues, productivityValues,
} from '../constants/constant_map_params';

class NewMapEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.indivMapLang.language === undefined ? '' : this.props.indivMapLang.language,
      continent: this.props.indivMapLang.continent === undefined ? '' : this.props.indivMapLang.continent,
      country: this.props.indivMapLang.country === undefined ? [] : this.props.indivMapLang.country,
      instrumentName: this.props.indivMapLang.instrument_name === undefined ? '' : this.props.indivMapLang.instrument_name,
      instrumentFamily: this.props.indivMapLang.instrument_family === undefined ? '' : this.props.indivMapLang.instrument_family,
      instrumentType: this.props.indivMapLang.instrument_type === undefined ? '' : this.props.indivMapLang.instrument_type,
      encodingMedium: this.props.indivMapLang.encoding_medium === undefined ? [] : this.props.indivMapLang.encoding_medium,
      contrastsEncoded: this.props.indivMapLang.contrasts_encoded === undefined ? [] : this.props.indivMapLang.contrasts_encoded,
      depthOfEncoding: this.props.indivMapLang.depth_of_encoding === undefined ? [] : this.props.indivMapLang.depth_of_encoding,
      content: this.props.indivMapLang.content === undefined ? [] : this.props.indivMapLang.content,
      specialization: this.props.indivMapLang.specialization === undefined ? [] : this.props.indivMapLang.specialization,
      comprehension: this.props.indivMapLang.comprehension === undefined ? '' : this.props.indivMapLang.comprehension,
      productivity: this.props.indivMapLang.productivity === undefined ? '' : this.props.indivMapLang.productivity,
      currentStatus: this.props.indivMapLang.current_status === undefined ? '' : this.props.indivMapLang.current_status,
      source: this.props.indivMapLang.source === undefined || this.props.indivMapLang.source.length === 0 ? [] : this.props.indivMapLang.source,
      summary: this.props.indivMapLang.summary === undefined ? '' : this.props.indivMapLang.summary,
      entryAuthors: this.props.indivMapLang.entry_authors === undefined ? '' : this.props.indivMapLang.entry_authors,
      isoCode: this.props.indivMapLang.iso_code === undefined ? '' : this.props.indivMapLang.iso_code,
      macrofamily: this.props.indivMapLang.macrofamily === undefined ? '' : this.props.indivMapLang.macrofamily,

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.onSuccessCallback = this.onSuccessCallback.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange = (type, e, index) => {
    const newSources = this.state.source;
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
      case 'instrumentName':
        this.setState({ instrumentName: e.target.value });
        break;
      case 'instrumentFamily':
        this.setState({ instrumentFamily: e.target.value });
        break;
      case 'instrumentType':
        this.setState({ instrumentType: e.target.value });
        break;
      case 'encodingMedium':
        this.setState({ encodingMedium: e.target.value });
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
        if (index === newSources.length) {
          newSources.push(e.target.value);
        } else {
          newSources[index] = e.target.value;
        }
        this.setState({ source: newSources });
        break;
      case 'deleteSource':
        newSources.splice(index, 1);
        this.setState({ source: newSources });
        break;
      case 'addSource':
        newSources.push('');
        this.setState({ source: newSources });
        break;
      case 'entryAuthors':
        this.setState({ entryAuthors: e.target.value });
        break;
      case 'currentStatus':
        this.setState({ currentStatus: e.target.value });
        break;
      case 'macrofamily':
        this.setState({ macrofamily: e.target.value });
        break;
      case 'isoCode':
        this.setState({ isoCode: e.target.value });
        break;
      default:
        break;
    }
  }

  handleMultiSelectChange = (newValue, type) => {
    const newValues = [];
    if (newValue === null) {
      switch (type) {
        case 'content':
          this.setState({
            content: [],
          });
          break;
        case 'specialization':
          this.setState({
            specialization: [],
          });
          break;
        case 'encoding_medium':
          this.setState({
            encodingMedium: [],
          });
          break;
        case 'contrasts_encoded':
          this.setState({
            contrastsEncoded: [],
          });
          break;
        case 'depth_of_encoding':
          this.setState({
            depthOfEncoding: [],
          });
          break;
        case 'instrument_family':
          this.setState({
            instrumentFamily: [],
          });
          break;
        case 'instrument_type':
          this.setState({
            instrumentType: [],
          });
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case 'content':
          newValue.forEach((val) => {
            newValues.push(val.value);
          });
          this.setState({
            content: newValues,
          });
          break;
        case 'specialization':
          newValue.forEach((val) => {
            newValues.push(val.value);
          });
          this.setState({
            specialization: newValues,
          });
          break;
        case 'encoding_medium':
          newValue.forEach((val) => {
            newValues.push(val.value);
          });
          this.setState({
            encodingMedium: newValues,
          });
          break;
        case 'contrasts_encoded':
          newValue.forEach((val) => {
            newValues.push(val.value);
          });
          this.setState({
            contrastsEncoded: newValues,
          });
          break;
        case 'depth_of_encoding':
          newValue.forEach((val) => {
            newValues.push(val.value);
          });
          this.setState({
            depthOfEncoding: newValues,
          });
          break;
        case 'instrument_family':
          newValue.forEach((val) => {
            newValues.push(val.value);
          });
          this.setState({
            instrumentFamily: newValues,
          });
          break;
        case 'instrument_type':
          newValue.forEach((val) => {
            newValues.push(val.value);
          });
          this.setState({
            instrumentType: newValues,
          });
          break;
        default:
          break;
      }
    }
  };

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
      instrumentName: this.state.instrumentName,
      instrumentFamily: this.state.instrumentFamily,
      instrumentType: this.state.instrumentType,
      contrastsEncoded: this.state.contrastsEncoded,
      encodingMedium: this.state.encodingMedium,
      depthOfEncoding: this.state.depthOfEncoding,
      content: this.state.content,
      specialization: this.state.specialization,
      comprehension: this.state.comprehension,
      productivity: this.state.productivity,
      source: this.state.source,
      summary: this.state.summary,
      entryAuthors: this.state.entryAuthors,
      currentStatus: this.state.currentStatus,
      isoCode: this.state.isoCode,
      macrofamily: this.state.macrofamily,
    };
    if (this.props.indivMapLang._id !== undefined) {
      // update page
      this.props.updateIndivMapLang(
        {
          language: this.state.name,
          continent: this.state.continent,
          country: this.state.country,
          instrument_name: this.state.instrumentName,
          instrument_family: this.state.instrumentFamily,
          instrument_type: this.state.instrumentType,
          contrasts_encoded: this.state.contrastsEncoded,
          encoding_medium: this.state.encodingMedium,
          depth_of_encoding: this.state.depthOfEncoding,
          content: this.state.content,
          specialization: this.state.specialization,
          comprehension: this.state.comprehension,
          productivity: this.state.productivity,
          source: this.state.source,
          summary: this.state.summary,
          entry_authors: this.state.entryAuthors,
          current_status: this.state.currentStatus,
          iso_code: this.state.isoCode,
          macrofamily: this.state.macrofamily,
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

  contentValues = () => {
    const values = [];
    this.state.content.forEach((word) => {
      values.push({
        value: word,
        label: word,
      });
    });
    return values;
  }

  specializationValues = () => {
    const values = [];
    this.state.specialization.forEach((word) => {
      values.push({
        value: word,
        label: word,
      });
    });
    return values;
  }

  depthOfEncodingValues = () => {
    const values = [];
    this.state.depthOfEncoding.forEach((word) => {
      values.push({
        value: word,
        label: word,
      });
    });
    return values;
  }

  contrastsEncodedValues = () => {
    const values = [];
    this.state.contrastsEncoded.forEach((word) => {
      values.push({
        value: word,
        label: word,
      });
    });
    return values;
  }

  encodingMediumValues = () => {
    const values = [];
    this.state.encodingMedium.forEach((word) => {
      values.push({
        value: word,
        label: word,
      });
    });
    return values;
  }

  render() {
    const { summary } = this.state;
    const options = this.countries();
    const values = this.values();
    // extra option categories
    // single select:
    // intrument type, intstrument family,
    // multi select
    // content, specialization, encoding medium, contrasts encoded, depth of encoding
    const contentOptions = [];
    const specializationOptions = [];
    const encodingMediumOptions = [];
    const contrastsEncodedOptions = [];
    const depthOfEncodingOptions = [];
    const instrumentFamilyOptions = [];
    const instrumentTypeOptions = [];
    const macrofamilyOptions = [];

    const contentValues = this.contentValues();
    const specializationValues = this.specializationValues();
    const contrastsEncodedValues = this.contrastsEncodedValues();
    const encodingMediumValues = this.encodingMediumValues();
    const depthOfEncodingValues = this.depthOfEncodingValues();

    this.props.parameters.forEach((parameter) => {
      switch (parameter.parameter) {
        case 'instrument_type':
          parameter.values.forEach((value) => {
            instrumentTypeOptions.push({
              value,
              label: value,
            });
          });
          break;
        case 'instrument_family':
          parameter.values.forEach((value) => {
            instrumentFamilyOptions.push({
              value,
              label: value,
            });
          });
          break;
        case 'macrofamily':
          parameter.values.forEach((value) => {
            macrofamilyOptions.push({
              value,
              label: value,
            });
          });
          break;
        case 'content':
          parameter.values.forEach((value) => {
            contentOptions.push({
              value,
              label: value,
            });
          });
          break;
        case 'specialization':
          parameter.values.forEach((value) => {
            specializationOptions.push({
              value,
              label: value,
            });
          });
          break;
        case 'encoding_medium':
          parameter.values.forEach((value) => {
            encodingMediumOptions.push({
              value,
              label: value,
            });
          });
          break;
        case 'contrasts_encoded':
          parameter.values.forEach((value) => {
            contrastsEncodedOptions.push({
              value,
              label: value,
            });
          });
          break;
        case 'depth_of_encoding':
          parameter.values.forEach((value) => {
            depthOfEncodingOptions.push({
              value,
              label: value,
            });
          });
          break;
        default:
          break;
      }
    });
    return (
      <div className="newPageContainer">
        <p>Language Name:</p>
        <input type="text" name="name" value={this.state.name} onChange={event => this.handleChange('name', event)} className="title" />
        <p>Continent of Origin</p>
        <Select
          defaultValue={{ value: this.state.continent, label: this.state.continent }}
          name="continent"
          isClearable
          options={continentValues}
          className="basic"
          classNamePrefix="select"
          onChange={(event) => {
            const value = event === null ? '' : event.value;
            this.setState({ continent: value });
          }
        }
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
        <p>Language Macrofamily</p>
        <CreatableSelect
          onChange={(event) => {
            const value = event === null ? '' : event.value;
            this.setState({ macrofamily: value });
          }}
          options={macrofamilyOptions}
          isClearable
          className="basic"
          classNamePrefix="select"
          defaultValue={{ value: this.state.macrofamily, label: this.state.macrofamily }}
        />
        <p>Language ISO Code</p>
        <input type="text" name="name" value={this.state.isoCode} onChange={event => this.handleChange('isoCode', event)} className="title" />
        <p>Instrument/Surrogate Name:</p>
        <input type="text" name="name" value={this.state.instrumentName} onChange={event => this.handleChange('instrumentName', event)} className="title" />
        <p>Instrument Family</p>
        <CreatableSelect
          onChange={(event) => {
            const value = event === null ? '' : event.value;
            this.setState({ instrumentFamily: value });
          }}
          options={instrumentFamilyOptions}
          isClearable
          className="basic"
          classNamePrefix="select"
          defaultValue={{ value: this.state.instrumentFamily, label: this.state.instrumentFamily }}
        />
        <p>Instrument Type</p>
        <CreatableSelect
          className="basic"
          classNamePrefix="select"
          onChange={(event) => {
            const value = event === null ? '' : event.value;
            this.setState({ instrumentType: value });
          }}
          isClearable
          options={instrumentTypeOptions}
          defaultValue={{ value: this.state.instrumentType, label: this.state.instrumentType }}
        />
        <p>Encoding Medium</p>
        <CreatableSelect
          isMulti
          onChange={e => this.handleMultiSelectChange(e, 'encoding_medium')}
          options={encodingMediumOptions}
          value={encodingMediumValues}
        />
        <p>Contrasts Encoded</p>
        <CreatableSelect
          isMulti
          onChange={e => this.handleMultiSelectChange(e, 'contrasts_encoded')}
          options={contrastsEncodedOptions}
          value={contrastsEncodedValues}
        />
        <p>Depth of Encoding</p>
        <CreatableSelect
          isMulti
          onChange={e => this.handleMultiSelectChange(e, 'depth_of_encoding')}
          options={depthOfEncodingOptions}
          value={depthOfEncodingValues}
        />
        <p>Content</p>
        <CreatableSelect
          isMulti
          onChange={e => this.handleMultiSelectChange(e, 'content')}
          options={contentOptions}
          value={contentValues}
        />
        <p>Specialization</p>
        <CreatableSelect
          isMulti
          onChange={e => this.handleMultiSelectChange(e, 'specialization')}
          options={specializationOptions}
          value={specializationValues}
        />
        <p>Comprehension</p>
        <Select
          defaultValue={{ value: this.state.comprehension, label: this.state.comprehension }}
          name="continent"
          options={comprehensionValues}
          className="basic"
          classNamePrefix="select"
          isClearable
          onChange={(event) => {
            const value = event === null ? '' : event.value;
            this.setState({ comprehension: value });
          }}
        />
        <p>Productivity</p>
        <Select
          defaultValue={{ value: this.state.productivity, label: this.state.productivity }}
          name="continent"
          options={productivityValues}
          className="basic"
          classNamePrefix="select"
          isClearable
          onChange={(event) => {
            const value = event === null ? '' : event.value;
            this.setState({ productivity: value });
          }}
        />
        <p>Current Status</p>
        <input type="text" name="name" value={this.state.currentStatus} onChange={event => this.handleChange('currentStatus', event)} className="title" />
        <p>Bibliography</p>
        {this.state.source.map((source, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <input type="text" name="source" value={this.state.source[index]} onChange={event => this.handleChange('source', event, index)} className="title" />
              <Button variant="danger" onClick={event => this.handleChange('deleteSource', event, index)}>
                Delete Source
              </Button>
            </div>
          );
        })}
        <Button variant="success" onClick={event => this.handleChange('addSource')}>
          Add Source
        </Button>
        <p>Entry Authors</p>
        <input type="text" name="title" value={this.state.entryAuthors} onChange={event => this.handleChange('entryAuthors', event)} className="title" />
        <p>Summary:</p>
        <SunEditor onChange={this.handleBodyChange}
          setContents={summary}
          setOptions={{
            height: 300,
            zIndex: 0,
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
    parameters: state.map.parameters,
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

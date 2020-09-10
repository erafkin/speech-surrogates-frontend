import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactHtmlParser from 'react-html-parser';
import { CSVLink } from 'react-csv';
import { getAllMapLangs, setIndivMapLang } from '../state/actions';
import { CsvHeaders } from '../constants/constant_map_params';
import { ROUTES } from '../constants';

am4core.useTheme(am4themesAnimated);
const countryCodes = require('../constants/country-to-code.json');

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mountedGraph: false,
      showModal: false,
      selectedCountry: {},
      selectedLanguage: {},
      selectedLanguagesSameName: [],
      countryLangs: [],
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.map).length > 0 && !this.state.mountedGraph) {
      this.createMap(this.props.map);
    } else if (this.props.map.length === 0) {
      this.props.getAllMapLangs();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.map).length > 0 && !this.state.mountedGraph) {
      this.createMap(nextProps.map);
    } else if (this.props.map.length === 0) {
      this.props.getAllMapLangs();
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createMap = (passedInMap) => {
    // Create map instance
    const chart = am4core.create('chartdiv', am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodataWorldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    this.chart = chart;
    this.polygonSeries = polygonSeries;

    this.chart.zoomControl = new am4maps.ZoomControl();

    // Make map load polygon (like county names) data from GeoJSON

    polygonSeries.useGeodata = true;

    const countryLangs = {};
    passedInMap.forEach((lang) => {
      lang.country.forEach((country) => {
        if (countryLangs[country] === undefined) {
          countryLangs[country] = {
            countryLangsNameArray: [lang.language],
            countryLangsArray: [lang],
          };
        } else {
          if (!countryLangs[country].countryLangsNameArray.includes(lang.language)) {
            countryLangs[country].countryLangsNameArray.push(lang.language);
          }
          countryLangs[country].countryLangsArray.push(lang);
        }
      });
    });
    const countryData = [];
    Object.keys(countryLangs).forEach((lang) => {
      countryData.push({
        name: lang,
        langNames: countryLangs[lang].countryLangsNameArray.join(', \n'),
        langArray: countryLangs[lang].countryLangsArray,
        id: countryCodes[lang],

      });
    });
    const imageSeriesData = [];
    polygonSeries.data = countryData;
    // the following HOT MESS calculates the average longitude and latitude so i can theoretically drop the point in the center
    // the PROBLEM is that now this is setup to just put it in the center of the biggeset shape (think non adjacent countries like america with alaska and hawaii)
    am4geodataWorldLow.features.forEach((country) => {
      if (countryLangs[country.properties.name]) {
        let latitude = 0;
        let longitude = 0;
        let countryBoundaries = country.geometry.coordinates[0];
        if (country.geometry.coordinates[0].length === 1) {
          country.geometry.coordinates.forEach((island) => {
            // eslint-disable-next-line prefer-destructuring
            if (island[0].length > countryBoundaries.length) countryBoundaries = island[0];
          });
          countryBoundaries.forEach((point) => {
            longitude += point[0];
            latitude += point[1];
          });
          latitude /= countryBoundaries.length;
          longitude /= countryBoundaries.length;
          imageSeriesData.push({
            latitude,
            longitude,
            name: country.properties.name,
            langNames: countryLangs[country.properties.name].countryLangsNameArray.join(', \n'),
            langArray: countryLangs[country.properties.name].countryLangsArray,
          });

          // THIS COMMENTED OUT CODE IS IF WE WANT TO DROP THE DOT IN THE CENTER INCLUDING ALL OF THE LAND FORMS

          // let islandLengthsSums = 0;
          // country.geometry.coordinates.forEach((island) => {
          //   island[0].forEach((point) => {
          //     longitude += point[0];
          //     latitude += point[1];
          //   });
          //   islandLengthsSums += island[0].length;
          // });
          // latitude /= islandLengthsSums;
          // longitude /= islandLengthsSums;
          // imageSeriesData.push({
          //   latitude,
          //   longitude,
          //   name: country.properties.name,
          //   langNames: countryLangs[country.properties.name].countryLangsNameArray.join(', \n'),
          //   langArray: countryLangs[country.properties.name].countryLangsArray,
          // });
        } else {
          countryBoundaries.forEach((point) => {
            longitude += point[0];
            latitude += point[1];
          });
          latitude /= countryBoundaries.length;
          longitude /= countryBoundaries.length;
          imageSeriesData.push({
            latitude,
            longitude,
            name: country.properties.name,
            langNames: countryLangs[country.properties.name].countryLangsNameArray.join(', \n'),
            langArray: countryLangs[country.properties.name].countryLangsArray,
          });
        }
      }
    });

    // Create a circle image in image series template so it gets replicated to all new images
    const imageSeries = chart.series.push(new am4maps.MapImageSeries());
    const imageSeriesTemplate = imageSeries.mapImages.template;
    const circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color('#ff0000');
    circle.stroke = am4core.color('#FFFFFF');
    circle.strokeWidth = 2;
    circle.nonScaling = true;

    // Set property fields
    imageSeriesTemplate.propertyFields.latitude = 'latitude';
    imageSeriesTemplate.propertyFields.longitude = 'longitude';
    imageSeries.data = imageSeriesData;
    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}\n Languages:\n {langNames}';
    circle.tooltipText = '{name}\n Languages:\n {langNames}';
    polygonTemplate.fill = am4core.color('#74B266');
    polygonTemplate.events.on('hit', (event) => {
      const countryName = event.target.dataItem.dataContext.name;
      if (countryLangs[countryName] && countryLangs[countryName].countryLangsArray.length > 1) {
        this.setState({ showModal: true, selectedCountry: event.target.dataItem.dataContext, countryLangs: event.target.dataItem.dataContext.langArray });
        // this.props.history.push(`/map/${countryName}`);
      } else if (countryLangs[countryName] && countryLangs[countryName].countryLangsArray.length === 1) {
        this.setState({
          showModal: true,
          selectedCountry: event.target.dataItem.dataContext,
          selectedLanguage: event.target.dataItem.dataContext.langArray[0],
          countryLangs: event.target.dataItem.dataContext.langArray,
        });
        // this.props.history.push(`/map/${countryName}/${event.target.dataItem.dataContext.langArray[0].language}`);
      }
    });
    imageSeriesTemplate.events.on('hit', (event) => {
      const countryName = event.target.dataItem.dataContext.name;
      if (countryLangs[countryName] && countryLangs[countryName].countryLangsArray.length > 1) {
        this.setState({ showModal: true, selectedCountry: event.target.dataItem.dataContext, countryLangs: event.target.dataItem.dataContext.langArray });
        // this.props.history.push(`/map/${countryName}`);
      } else if (countryLangs[countryName] && countryLangs[countryName].countryLangsArray.length === 1) {
        this.setState({
          showModal: true,
          selectedCountry: event.target.dataItem.dataContext,
          selectedLanguage: event.target.dataItem.dataContext.langArray[0],
          countryLangs: event.target.dataItem.dataContext.langArray,
        });
        // this.props.history.push(`/map/${countryName}/${event.target.dataItem.dataContext.langArray[0].language}`);
      }
    });
  }


  // adapted From https://gist.github.com/towfiqpiash/d6b51e97120adbea5a4581edc6094219
  fixForHtmlInSummary = () => {
    const newMap = [];
    this.props.map.forEach((lang) => {
      const tag = document.createElement('div');
      tag.innerHTML = lang.summary;
      newMap.push({ ...lang, summary: tag.innerText });
    });
    return newMap;
  }


  render() {
    const {
      showModal, selectedCountry, selectedLanguage, countryLangs, selectedLanguagesSameName,
    } = this.state;
    const langsSameName = {};
    const langsDiffName = {};
    if (selectedLanguagesSameName.length === 0) {
      countryLangs.forEach((lang) => {
        if (Object.keys(langsDiffName).includes(lang.language)) {
          if (Object.keys(langsSameName).includes(lang.language)) {
            langsSameName[lang.language] = [lang];
          } else {
            langsSameName[lang.language] = [lang];
            langsSameName[lang.language].push(langsDiffName[lang.language]);
          }
        } else {
          langsDiffName[lang.language] = lang;
        }
      });
    }
    const langsToDisplay = selectedLanguagesSameName.length === 0 ? Object.values(langsDiffName) : selectedLanguagesSameName;
    return (
      <div>
        {this.props.user.type === 'admin' || this.props.user.type === 'contributor'
          ? (
            <NavLink to={ROUTES.NEW_MAP_LANG} onClick={this.props.setIndivMapLang({})}>
              <Button>
                New Map Language
              </Button>
            </NavLink>
          )
          : <div />}
        <CSVLink data={this.fixForHtmlInSummary()} headers={CsvHeaders} filename="speech-surrogates-data.csv">
          <p style={{ textDecoration: 'underline' }}>Download as a CSV</p>
        </CSVLink>
        {/* this renders the map itself */}
        <div id="chartdiv" style={{ width: '70%', height: '500px', marginLeft: '12%' }} />
        <Modal
          show={showModal}
          onHide={() => {
            // this.props.history.push('/map');
            this.setState({
              showModal: false,
              selectedCountry: {},
              selectedLanguage: {},
              selectedLanguagesSameName: [],
            });
          }
        }
        >
          <Modal.Header closeButton>
            {Object.keys(selectedLanguage).length === 0
              ? <Modal.Title>{selectedCountry.name}</Modal.Title>
              : <Modal.Title>{selectedLanguage.language}</Modal.Title>
                }
          </Modal.Header>
          {(Object.keys(selectedLanguage).length === 0)
            ? (
              <Modal.Body>
                {langsToDisplay.map((lang) => {
                  return (
                    <div key={lang._id}
                      style={{ textDecoration: 'underline' }}
                      onClick={() => {
                        if (Object.keys(langsSameName).includes(lang.language)) {
                          this.setState({ selectedLanguagesSameName: langsSameName[lang.language] });
                        } else {
                          this.setState({ selectedLanguage: lang, selectedLanguagesSameName: [] });
                        }
                      }
                    }
                      role="button"
                      tabIndex={0}
                    >
                      {selectedLanguagesSameName.length === 0 ? lang.language : `${lang.language} (${lang.instrument_name})`}
                    </div>
                  );
                })}
              </Modal.Body>
            )
            : (
              <Modal.Body>
                <p><span style={{ fontWeight: '700' }}>Continent: </span><span>{selectedLanguage.continent}</span></p>
                <p><span style={{ fontWeight: '700' }}>Country: </span><span>{selectedLanguage.country.join(', ')}</span></p>
                <p><span style={{ fontWeight: '700' }}>Instrument Name: </span><span>{selectedLanguage.instrument_name}</span></p>
                <p><span style={{ fontWeight: '700' }}>Instrument Family: </span><span>{selectedLanguage.instrument_family}</span></p>
                <p><span style={{ fontWeight: '700' }}>Instrument Type: </span><span>{selectedLanguage.instrument_type}</span></p>
                <p><span style={{ fontWeight: '700' }}>Encoding Medium: </span><span>{selectedLanguage.encoding_mendium}</span></p>
                <p><span style={{ fontWeight: '700' }}>Contrasts Encoded: </span><span>{selectedLanguage.contrasts_encoded}</span></p>
                <p><span style={{ fontWeight: '700' }}>Depth of Encoding: </span><span>{selectedLanguage.depth_of_encoding}</span></p>
                <p><span style={{ fontWeight: '700' }}>Content: </span><span>{selectedLanguage.content}</span></p>
                <p><span style={{ fontWeight: '700' }}>Specialization: </span><span>{selectedLanguage.specialization}</span></p>
                <p><span style={{ fontWeight: '700' }}>Comprehension: </span><span>{selectedLanguage.comprehension}</span></p>
                <p><span style={{ fontWeight: '700' }}>Productivity: </span><span>{selectedLanguage.productivity}</span></p>
                <p><span style={{ fontWeight: '700' }}>Current Status: </span><span>{selectedLanguage.current_status}</span></p>

                <p style={{ fontWeight: '700' }}>Summary:</p>
                {/* eslint-disable-next-line new-cap */}
                <div>{ReactHtmlParser(selectedLanguage.summary)}</div>
                <p><span style={{ fontWeight: '700' }}>Source: </span><span>{selectedLanguage.source}</span></p>
                <p><span style={{ fontWeight: '700' }}>Mentions: </span><span>{selectedLanguage.mentions}</span></p>
                <p><span style={{ fontWeight: '700' }}>Entry Authors: </span><span>{selectedLanguage.entry_authors}</span></p>

                {this.props.user.type === 'admin' || this.props.user.type === 'contributor'
                  ? (
                    <NavLink to={ROUTES.NEW_MAP_LANG} onClick={this.props.setIndivMapLang(selectedLanguage)}>
                      <Button>
                        Edit Language
                      </Button>
                    </NavLink>
                  )
                  : <div />}
              </Modal.Body>
            )
                }

        </Modal>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.map.map,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMapLangs: () => {
      dispatch(getAllMapLangs());
    },
    setIndivMapLang: (map) => {
      dispatch(setIndivMapLang(map));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

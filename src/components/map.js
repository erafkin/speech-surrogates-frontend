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

import { getAllMapLangs, setIndivMapLang } from '../state/actions';
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
          countryLangs[country].countryLangsNameArray.push(lang.language);
          countryLangs[country].countryLangsArray.push(lang);
        }
      });
    });
    const countryData = [];
    Object.keys(countryLangs).forEach((lang) => {
      countryData.push({
        name: lang, langNames: countryLangs[lang].countryLangsNameArray.join(', \n'), langArray: countryLangs[lang].countryLangsArray, id: countryCodes[lang], fill: am4core.color('#74B266'),
      });
    });
    polygonSeries.data = countryData;

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}\n Languages:\n {langNames}';
    polygonTemplate.events.on('hit', (event) => {
      const countryName = event.target.dataItem.dataContext.name;
      if (countryLangs[countryName].countryLangsNameArray.length > 1) {
        this.setState({ showModal: true, selectedCountry: event.target.dataItem.dataContext, countryLangs: event.target.dataItem.dataContext.langArray });
        // this.props.history.push(`/map/${countryName}`);
      } else if (countryLangs[countryName].countryLangsNameArray.length === 1) {
        this.setState({ showModal: true, selectedCountry: event.target.dataItem.dataContext, selectedLanguage: event.target.dataItem.dataContext.langArray[0] });
        // this.props.history.push(`/map/${countryName}/${event.target.dataItem.dataContext.langArray[0].language}`);
      }
    });

    // this makes sure that only countries with a language are colored in
    polygonTemplate.propertyFields.fill = 'fill';
  }


  render() {
    const {
      showModal, selectedCountry, selectedLanguage, countryLangs,
    } = this.state;
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
        <div id="chartdiv" style={{ width: '100%', height: '500px' }} />
        <Modal
          show={showModal}
          onHide={() => {
            // this.props.history.push('/map');
            this.setState({
              showModal: false,
              selectedCountry: {},
              selectedLanguage: {},
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
          {Object.keys(selectedLanguage).length === 0
            ? (
              <Modal.Body>
                {countryLangs.map((lang) => {
                  return (
                    <div key={lang._id} style={{ textDecoration: 'underline' }} onClick={() => this.setState({ selectedLanguage: lang })} role="button" tabIndex={0}>
                      {lang.language}
                    </div>
                  );
                })}

              </Modal.Body>
            )
            : (
              <Modal.Body>
                <p><span style={{ fontWeight: '700' }}>Continent: </span><span>{selectedLanguage.continent}</span></p>
                <p><span style={{ fontWeight: '700' }}>Country: </span><span>{selectedLanguage.country.join(', ')}</span></p>
                <p><span style={{ fontWeight: '700' }}>Instrument Family: </span><span>{selectedLanguage.instrument_family}</span></p>
                <p><span style={{ fontWeight: '700' }}>Instrument Type: </span><span>{selectedLanguage.instrument_type}</span></p>
                <p><span style={{ fontWeight: '700' }}>Contrasts Encoded: </span><span>{selectedLanguage.contrasts_encoded}</span></p>
                <p><span style={{ fontWeight: '700' }}>Depth of Encoding: </span><span>{selectedLanguage.depth_of_encoding}</span></p>
                <p><span style={{ fontWeight: '700' }}>Content: </span><span>{selectedLanguage.content}</span></p>
                <p><span style={{ fontWeight: '700' }}>Specialization: </span><span>{selectedLanguage.specialization}</span></p>
                <p><span style={{ fontWeight: '700' }}>Comprehension: </span><span>{selectedLanguage.comprehension}</span></p>
                <p><span style={{ fontWeight: '700' }}>Productivity: </span><span>{selectedLanguage.productivity}</span></p>
                <p><span style={{ fontWeight: '700' }}>Continent: </span><span>{selectedLanguage.continent}</span></p>
                <p style={{ fontWeight: '700' }}>Summary:</p>
                {/* eslint-disable-next-line new-cap */}
                <div>{ReactHtmlParser(selectedLanguage.summary)}</div>
                <p><span style={{ fontWeight: '700' }}>Source: </span><span>{selectedLanguage.source}</span></p>
                <p><span style={{ fontWeight: '700' }}>Mentions: </span><span>{selectedLanguage.mentions}</span></p>
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

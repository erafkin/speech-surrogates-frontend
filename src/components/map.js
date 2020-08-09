import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Button from 'react-bootstrap/Button';
import { getAllMapLangs } from '../state/actions';
import { ROUTES } from '../constants';

am4core.useTheme(am4themesAnimated);
const countryCodes = require('../constants/country-to-code.json');


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mountedGraph: false,
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
      this.createMap(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createMap = (passedInProps) => {
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
    passedInProps.map.forEach((lang) => {
      if (countryLangs[lang.country] === undefined) {
        countryLangs[lang.country] = [lang.language];
      } else {
        countryLangs[lang.country].push(lang.language);
      }
    });
    const countryData = [];
    console.log(countryLangs);
    Object.keys(countryLangs).forEach((lang) => {
      countryData.push({
        name: lang, langs: countryLangs[lang].join(', \n'), id: countryCodes[lang], fill: am4core.color('#74B266'),
      });
    });
    polygonSeries.data = countryData;
    console.log(countryData);

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}\n Languages:\n {langs}';

    // this makes sure that only countries with a language are colored in
    polygonTemplate.propertyFields.fill = 'fill';
  }


  render() {
    return (
      <div>
        {this.props.user.type === 'admin' || this.props.user.type === 'contributor'
          ? (
            <NavLink to={ROUTES.NEW_MAP_LANG}>
              <Button>
                New Map Language
              </Button>
            </NavLink>
          )
          : <div />}
        <div id="chartdiv" style={{ width: '100%', height: '500px' }} />

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);

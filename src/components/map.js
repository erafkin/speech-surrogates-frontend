import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class Map extends Component {
  componentDidMount() {
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

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}';
    polygonTemplate.fill = am4core.color('#74B266');

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#367B25');

    // TODO: if the country does not have a speech surrogate, then make it gray.
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: '100%', height: '500px' }} />
    );
  }
}

export default Map;

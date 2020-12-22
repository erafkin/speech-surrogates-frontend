import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CSVLink } from 'react-csv';
import { getAllMapLangs, setIndivMapLang } from '../state/actions';
import { CsvHeaders } from '../constants/constant_map_params';
import { ROUTES } from '../constants';

am4core.useTheme(am4themesAnimated);
const countryCodes = require('../constants/country-to-code.json');
const countryCoordinates = require('../constants/country-coordinates.json');

am4core.options.autoDispose = true;

const Map = (props) => {
  const [mountedGraph, setMountedGraph] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [selectedLanguagesSameName, setSelectedLanguagesSameName] = useState([]);
  const [countryLangs, setCountryLangs] = useState([]);
  const [search, setSearch] = useState('');
  const [searchedMap, setSearchedMap] = useState([]);
  const [langDisplayEnum, changeLangDisplayEnum] = useState('MANY LANG');
  const { map } = props;

  const history = useHistory();

  const createMap = (passedInMap) => {
    // Create map instance
    const chart = am4core.create('chartdiv', am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodataWorldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    const ps = chart.series.push(new am4maps.MapPolygonSeries());

    chart.zoomControl = new am4maps.ZoomControl();
    chart.chartContainer.wheelable = false;

    // Make map load polygon (like county names) data from GeoJSON
    ps.useGeodata = true;

    const countryLanguages = {};
    passedInMap.forEach((lang) => {
      lang.country.forEach((country) => {
        if (countryLanguages[country] === undefined) {
          countryLanguages[country] = {
            countryLangsNameArray: [lang.language],
            countryLangsArray: [lang],
          };
        } else {
          if (!countryLanguages[country].countryLangsNameArray.includes(lang.language)) {
            countryLanguages[country].countryLangsNameArray.push(lang.language);
          }
          countryLanguages[country].countryLangsArray.push(lang);
        }
      });
    });
    const countryData = [];
    const imageSeriesData = [];

    Object.keys(countryLanguages).forEach((lang) => {
      countryData.push({
        name: lang,
        langNames: countryLanguages[lang].countryLangsNameArray.join(', \n'),
        langArray: countryLanguages[lang].countryLangsArray,
        id: countryCodes[lang],

      });
      imageSeriesData.push({
        latitude: countryCoordinates[countryCodes[lang]].latitude,
        longitude: countryCoordinates[countryCodes[lang]].longitude,
        name: lang,
        langNames: countryLanguages[lang].countryLangsNameArray.join(', \n'),
        langArray: countryLanguages[lang].countryLangsArray,
      });
    });
    ps.data = countryData;
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
    const polygonTemplate = ps.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}\n Languages:\n {langNames}';
    circle.tooltipText = '{name}\n Languages:\n {langNames}';
    polygonTemplate.fill = am4core.color('#74B266');
    polygonTemplate.events.on('hit', (event) => {
      const countryName = event.target.dataItem.dataContext.name;
      if (countryLanguages[countryName] && countryLanguages[countryName].countryLangsNameArray.length === 1 && event.target.dataItem.dataContext.langArray.length === 1) {
        setSelectedLanguagesSameName([]);
        setSelectedCountry(event.target.dataItem.dataContext);
        setSelectedLanguage(event.target.dataItem.dataContext.langArray[0]);
        setCountryLangs(event.target.dataItem.dataContext.langArray);
        setShowModal(true);
        changeLangDisplayEnum('ONE LANG');
        history.push(`/map/${countryName}/${event.target.dataItem.dataContext.langArray[0].language}/${event.target.dataItem.dataContext.langArray[0].instrument_name}`);
      } else if (countryLanguages[countryName] && countryLanguages[countryName].countryLangsNameArray.length === 1) {
        changeLangDisplayEnum('ONE LANG MANY SUB');
        setSelectedLanguagesSameName(countryLanguages[countryName].countryLangsArray);
        setSelectedCountry(event.target.dataItem.dataContext);
        setCountryLangs(event.target.dataItem.dataContext.langArray);
        setShowModal(true);
        history.push(`/map/${countryName}/${event.target.dataItem.dataContext.langArray[0].language}`);
      } else if (countryLanguages[countryName] && countryLanguages[countryName].countryLangsArray.length > 1) {
        setSelectedLanguagesSameName([]);
        changeLangDisplayEnum('MANY LANG');
        setSelectedCountry(event.target.dataItem.dataContext);
        setCountryLangs(event.target.dataItem.dataContext.langArray);
        setShowModal(true);
        history.push(`/map/${countryName}`);
      }
    });
    imageSeriesTemplate.events.on('hit', (event) => {
      const countryName = event.target.dataItem.dataContext.name;
      if (countryLanguages[countryName] && countryLanguages[countryName].countryLangsNameArray.length === 1 && event.target.dataItem.dataContext.langArray.length === 1) {
        setSelectedLanguagesSameName([]);
        changeLangDisplayEnum('ONE LANG');
        setSelectedCountry(event.target.dataItem.dataContext);
        setSelectedLanguage(event.target.dataItem.dataContext.langArray[0]);
        setCountryLangs(event.target.dataItem.dataContext.langArray);
        setShowModal(true);
        history.push(`/map/${countryName}/${event.target.dataItem.dataContext.langArray[0].language}/${event.target.dataItem.dataContext.langArray[0].instrument_name}`);
      } else if (countryLanguages[countryName] && countryLanguages[countryName].countryLangsNameArray.length === 1) {
        setSelectedLanguagesSameName(event.target.dataItem.dataContext.langArray);
        changeLangDisplayEnum('ONE LANG MANY SUB');
        setSelectedCountry(event.target.dataItem.dataContext);
        setCountryLangs(event.target.dataItem.dataContext.langArray);
        setShowModal(true);
        history.push(`/map/${countryName}/${event.target.dataItem.dataContext.langArray[0].language}`);
      } else if (countryLanguages[countryName] && countryLanguages[countryName].countryLangsArray.length > 1) {
        changeLangDisplayEnum('MANY LANG');
        setSelectedLanguagesSameName([]);
        setSelectedCountry(event.target.dataItem.dataContext);
        setCountryLangs(event.target.dataItem.dataContext.langArray);
        setShowModal(true);
        history.push(`/map/${countryName}`);
      }
    });
    setMountedGraph(true);
  };

  if (Object.keys(map).length > 0 && !mountedGraph) {
    createMap(map);
  } else if (map.length === 0) {
    props.getAllMapLangs();
  }

  // this is for handling routing (back/forward buttons and load at specific url)
  useEffect(() => {
    if (Object.keys(map).length > 0) {
      const urlArray = window.location.href.split('/');
      if (urlArray.length > 4) {
        let country = urlArray[4];
        const countryArray = country.split('%20');
        if (countryArray.length > 1) country = countryArray.join(' ');
        let language = urlArray.length > 5 ? urlArray[5] : null;
        if (language) {
          const languageArray = language.split('%20');
          if (languageArray.length > 1) language = languageArray.join(' ');
        }
        let instrument = urlArray.length > 6 ? urlArray[6] : null;
        if (instrument) {
          const instrumentArray = instrument.split('%20');
          if (instrumentArray.length > 1) instrument = instrumentArray.join(' ');
        }
        const newSelectedCountry = { name: country, langArray: [], country: [] };
        let newSelectedLanguage = {};
        const newSelectedLanguagesSameName = [];
        const newCountryLangs = [];
        if (country) {
          const filteredMap = map.filter(lang => lang.country.includes(country.trim()));
          filteredMap.forEach((lang) => {
            newSelectedCountry.langArray.push(lang);
            newCountryLangs.push(lang);
            if (language && lang.language.trim() === language.trim()) {
              newSelectedLanguagesSameName.push(lang);
              if (instrument) {
                const instrumentList = instrument.split(',');
                let sameInstrumentName = true;
                instrumentList.forEach((inst) => {
                  // if the instrument name does not have a special character
                  if (!inst.includes('%')) {
                    if (!lang.instrument_name.includes(inst.trim())) {
                      sameInstrumentName = false;
                    }
                  }
                });
                if (sameInstrumentName) {
                  newSelectedLanguage = lang;
                }
              }
            } else if (instrument && lang.instrument_name.trim() === instrument.trim()) {
              newSelectedLanguage = lang;
            }
          });
        }

        if (newSelectedLanguagesSameName.length === 1) {
          changeLangDisplayEnum('ONE LANG');
        } else if (newSelectedLanguagesSameName.length > 1) {
          changeLangDisplayEnum('ONE LANG MANY SUB');
        } else {
          changeLangDisplayEnum('MANY LANG');
        }
        setSelectedCountry(newSelectedCountry);
        setCountryLangs(newCountryLangs);
        setSelectedLanguage(newSelectedLanguage);
        setSelectedLanguagesSameName(newSelectedLanguagesSameName);
        if (country) setShowModal(true);
      } else if (showModal) setShowModal(false);
      createMap(map);
    }
  }, [map, history.location]);

  useEffect(() => {
    if (search !== '') {
      document.getElementById('mapSearch').scrollIntoView(true);
    }
  }, [search]);

  // adapted From https://gist.github.com/towfiqpiash/d6b51e97120adbea5a4581edc6094219
  const fixForHtmlInSummary = () => {
    const newMap = [];
    map.forEach((lang) => {
      const tag = document.createElement('div');
      tag.innerHTML = lang.summary;
      newMap.push({ ...lang, summary: tag.innerText });
    });
    return newMap;
  };

  const searchFunction = () => {
    const newMap = [];
    if (search !== '') {
      map.forEach((lang) => {
        let added = false;
        Object.keys(lang).forEach((field) => {
          if (!added && lang[field] !== '' && !Number.isInteger(lang[field])) {
            let lowerCaseFieldContents;
            if (Array.isArray(lang[field])) {
              lowerCaseFieldContents = lang[field].map(f => f.toLowerCase());
            } else {
              const fieldContents = lang[field].split(' ');
              lowerCaseFieldContents = fieldContents.map(f => f.toLowerCase());
            }
            lowerCaseFieldContents.forEach((fieldContent) => {
              if (fieldContent.includes(search.toLowerCase()) && !added) {
                newMap.push(lang);
                added = true;
              }
            });
          }
        });
      });
    }
    setSearchedMap(newMap);
  };
  let langHeader = '';
  const langsSameName = {};
  const langsDiffName = {};
  let langsToDisplay = [];
  if (showModal) {
    if (selectedLanguagesSameName && selectedLanguagesSameName.length === 0) {
      countryLangs.forEach((lang) => {
        if (Object.keys(langsDiffName).includes(lang.language)) {
          if (Object.keys(langsSameName).includes(lang.language)) {
            langsSameName[lang.language].push(lang);
          } else {
            langsSameName[lang.language] = [lang];
            langsSameName[lang.language].push(langsDiffName[lang.language]);
          }
        } else {
          langsDiffName[lang.language] = lang;
        }
      });
    }
    const oneLanguageManyVersions = Object.keys(langsDiffName).length === 1 && Object.values(langsSameName).length > 0 ? Object.values(langsSameName)[0] : Object.values(langsDiffName);
    langsToDisplay = selectedLanguagesSameName.length === 0 ? oneLanguageManyVersions : selectedLanguagesSameName;
    switch (langDisplayEnum) {
      case 'ONE LANG':
        langHeader = selectedLanguage.language;
        break;
      case 'ONE LANG MANY SUB':
        langHeader = selectedLanguagesSameName[0].language;
        break;
      case 'MANY LANG':
        langHeader = selectedCountry.name;
        break;
      default:
        langHeader = selectedCountry.name;
        break;
    }
  }
  return (
    <div style={{ margin: '1vw' }}>
      <div style={{ display: 'inline-block' }}>
        {props.user.type === 'admin' || props.user.type === 'contributor'
          ? (
            <NavLink to={ROUTES.NEW_MAP_LANG} onClick={() => { props.setIndivMapLang({}); }}>
              <Button>
                New Entry
              </Button>
            </NavLink>
          )
          : <div />}
        <CSVLink data={fixForHtmlInSummary()} headers={CsvHeaders} filename="speech-surrogates-data.csv">
          <p style={{ textDecoration: 'underline' }}>Download as a CSV</p>
        </CSVLink>
      </div>

      <div style={{ width: '80%', textAlign: 'center', display: 'inline-block' }}>
        <div style={{ display: 'inline-block' }}>
          <h4>Search:</h4>
        </div>
        <div style={{ display: 'inline-block' }}>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="title"
            onKeyPress={(event) => { if (event.key === 'Enter') { searchFunction(); } }}
          />
          <Button onClick={searchFunction} style={{ margin: '1vw' }}>
            Search
          </Button>
          <Button variant="danger"
            onClick={() => {
              setSearch('');
              setSearchedMap([]);
              window.scrollTo(0, 0);
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <br />

      {/* this renders the map itself */}
      <div id="chartdiv" style={{ width: '90%', height: '550px' }} />
      <Modal
        show={showModal}
        size="lg"
        onHide={() => {
          setSelectedCountry({});
          setSelectedLanguage({});
          setSelectedLanguagesSameName([]);
          setShowModal(false);
          history.push('/map');
        }
        }
      >
        <Modal.Header closeButton>
          {Object.keys(selectedLanguage).length === 0
            ? <Modal.Title>{langHeader}</Modal.Title>
            : <Modal.Title>{selectedLanguage.language}</Modal.Title>
                }
        </Modal.Header>
        {(Object.keys(selectedLanguage).length === 0 && langsToDisplay)
          ? (
            <Modal.Body>
              {langsToDisplay.map((lang) => {
                return (
                  <div key={lang._id}
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                      if (Object.keys(langsSameName).includes(lang.language)) {
                        changeLangDisplayEnum('ONE LANG MANY SUB');
                        setSelectedLanguagesSameName(langsSameName[lang.language]);
                        history.push(`/map/${lang.country[0]}/${lang.language}`);
                      } else {
                        setSelectedLanguagesSameName([]);
                        changeLangDisplayEnum('MANY LANG');
                        setSelectedLanguage(lang);
                        history.push(`/map/${lang.country[0]}/${lang.language}/${lang.instrument_name}`);
                      }
                    }
                    }
                    role="button"
                    tabIndex={0}
                  >
                    {selectedLanguagesSameName.length === 0 && Object.keys(langsDiffName).length > 1 ? lang.language : `${lang.language} (${lang.instrument_name})`}
                  </div>
                );
              })}
            </Modal.Body>
          )
          : (
            <Modal.Body>
              <p><span style={{ fontWeight: '700' }}>Continent: </span><span>{selectedLanguage.continent}</span></p>
              <p><span style={{ fontWeight: '700' }}>Country: </span><span>{selectedLanguage.country ? selectedLanguage.country.join(', ') : ''}</span></p>
              <p><span style={{ fontWeight: '700' }}>Language Macrofamily: </span><span>{selectedLanguage.macrofamily || ''}</span></p>
              <p><span style={{ fontWeight: '700' }}>Language ISO Code: </span><span>{selectedLanguage.iso_code || ''}</span></p>
              <p><span style={{ fontWeight: '700' }}>Instrument Name: </span><span>{selectedLanguage.instrument_name}</span></p>
              <p><span style={{ fontWeight: '700' }}>Instrument Family: </span><span>{selectedLanguage.instrument_family}</span></p>
              <p><span style={{ fontWeight: '700' }}>Instrument Type: </span><span>{selectedLanguage.instrument_type}</span></p>
              <p><span style={{ fontWeight: '700' }}>Encoding Medium: </span><span>{selectedLanguage.encoding_mendium ? selectedLanguage.encoding_mendium.join(', ') : ''}</span></p>
              <p><span style={{ fontWeight: '700' }}>Contrasts Encoded: </span><span>{selectedLanguage.contrasts_encoded ? selectedLanguage.contrasts_encoded.join(', ') : ''}</span></p>
              <p><span style={{ fontWeight: '700' }}>Depth of Encoding: </span><span>{selectedLanguage.depth_of_encoding ? selectedLanguage.depth_of_encoding.join(', ') : ''}</span></p>
              <p><span style={{ fontWeight: '700' }}>Content: </span><span>{selectedLanguage.content ? selectedLanguage.content.join(', ') : ''}</span></p>
              <p><span style={{ fontWeight: '700' }}>Specialization: </span><span>{selectedLanguage.specialization ? selectedLanguage.specialization.join(', ') : ''}</span></p>
              <p><span style={{ fontWeight: '700' }}>Comprehension: </span><span>{selectedLanguage.comprehension}</span></p>
              <p><span style={{ fontWeight: '700' }}>Productivity: </span><span>{selectedLanguage.productivity}</span></p>
              <p><span style={{ fontWeight: '700' }}>Current Status: </span><span>{selectedLanguage.current_status}</span></p>

              <p style={{ fontWeight: '700' }}>Summary:</p>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: selectedLanguage.summary }} />
              <div><span style={{ fontWeight: '700' }}>Bibliography: </span>
                {
                selectedLanguage.source.map((source) => {
                  return (
                    <div key={source}>
                      <span>{source}</span>
                      <br />
                    </div>
                  );
                })
                }
              </div>

              <p><span style={{ fontWeight: '700' }}>Entry Authors: </span><span>{selectedLanguage.entry_authors}</span></p>

              {props.user.type === 'admin' || props.user.type === 'contributor'
                ? (
                  <NavLink to={ROUTES.NEW_MAP_LANG} onClick={() => { props.setIndivMapLang(selectedLanguage); }}>
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
      <div style={{ margin: '2vw', textAlign: 'center' }}
        id="mapSearch"
      >
        {searchedMap.length === 0 ? null
          : (
            <div style={{ textAlign: 'left', marginLeft: '20vw' }}>
              {searchedMap.map((lang) => {
                return (
                  <div key={lang._id}
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowModal(true);
                      setSelectedLanguagesSameName([]);
                      changeLangDisplayEnum('ONE LANG');
                      history.push(`/map/${lang.country[0]}/${lang.language}/${lang.instrument_name}`);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <p>{lang.language} ({lang.instrument_name})</p>
                  </div>
                );
              })}
            </div>
          )
        }
      </div>
    </div>
  );
};

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

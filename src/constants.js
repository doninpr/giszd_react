import wNumb from "wnumb";

export const API_DOMAIN = 'http://2.59.42.199:8888';

export const MAPBOX = {
	API_TOKEN: 'pk.eyJ1IjoiZG9uaW5wciIsImEiOiJjaXVxM3E4OTkwMDAwMm9wczBnYjR4bnJoIn0.7drt92qBRl7KJ6dLg0mrww',
  VIEWPORT: {
    width: '100%',
    height: '100vh',
    latitude: 56.056516,
    longitude: 38.263599,
    zoom: 4,
    mapStyle: 'mapbox://styles/doninpr/ck6vceaxf0aex1iqrd1kjw0q7',
  }
}

export const TIMELINE = {
  range: {min: 1838, max: 1930},
  start: [1927],
  tooltips: true,
  pips: {mode: 'count', values: 10},
  ariaFormat: wNumb({
      decimals: 0
  }),
  format: wNumb({
      decimals: 0,
      suffix: ''
  }),
};


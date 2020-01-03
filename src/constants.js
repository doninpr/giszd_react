import wNumb from "wnumb";

export const VISIBILITY_FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
};

export const MAPBOX = {
	API_TOKEN: 'pk.eyJ1IjoiZG9uaW5wciIsImEiOiJjaXVxM3E4OTkwMDAwMm9wczBnYjR4bnJoIn0.7drt92qBRl7KJ6dLg0mrww',
	MAPS: {
		MAIN: {
			BASE_STYLE: 'mapbox://styles/doninpr/ck4y21ecx1kn11crs1arg03xe',
			START_VIEWPORT: {
				width: '100%',
				height: '100vh',
				latitude: 56.056516,
				longitude: 38.263599,
				zoom: 4,
			}
		}
	}
}

export const TIMELINE = {
  range: {min: 1838, max: 1930},
  start: [1910],
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


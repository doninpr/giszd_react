import React from "react";
import MapBox from "./components/MapBox/MapBox";
import Timeline from "./components/Timeline/timeline";
import { MAPBOX, TIMELINE } from "./constants";
import "./styles.css";

export default function App() {
	return (
		<div className="railroads-app">
			<MapBox mapboxApiAccessToken={ MAPBOX.API_TOKEN } params={ MAPBOX.MAPS.MAIN } />
			<Timeline id={"timeline-slider"} params={TIMELINE} currentYear={TIMELINE.start[0]} />
		</div>
	);
}

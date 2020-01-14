import React from "react";
import { connect } from "react-redux";
import $ from 'jquery';
import MapBox from "./components/MapBox/MapBox";
import Timeline from "./components/Timeline/timeline";
import { MAPBOX, TIMELINE } from "./constants";
import { changeWindowSize } from './redux/actions';
import "./styles.css";

class App extends React.Component {
  	constructor(props) {
  		super(props);
  		this.props = props;

  		this.changeWindowSizeState = props.changeWindowSize;
  	}

  	componentWillMount(){
  		const changeWindowSizeState = () => {
  			const width = $(window).width();
  			const height = $(window).height();
  			this.changeWindowSizeState(width, height);
  		}

  		changeWindowSizeState();

  		const _this = this;
  		$(window).on('resize', function(){
  			changeWindowSizeState();
  		});
	}

  	render() {
  		return (
			<div className="railroads-app">
				<MapBox mapboxApiAccessToken={ MAPBOX.API_TOKEN } />
				<Timeline id={"timeline-slider"} params={TIMELINE} currentYear={TIMELINE.start[0]} />
			</div>
		);
  	}
}

export default connect(
  null,
  { changeWindowSize },
)(App);
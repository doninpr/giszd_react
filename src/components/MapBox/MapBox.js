import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { changeFiltersOnMap, mapboxViewportChange } from '../../redux/actions';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._map = React.createRef();
  }

  updateViewport = viewport => {
  	this.props.mapboxViewportChange(viewport);
    this.setState({viewport});
  };

  setTimelineFilter = ({layer = 'localrailways', year}) => {
  	this._map.getMap().setFilter(layer, [
	    "all",
	    ["<", ["get", "year"], +year]
	  ]);
    this.props.changeFiltersOnMap();
  }

  render() {
    if(this._map && this.props.isFiltersChanged){
      this.setTimelineFilter({ year: +this.props.currentYear });
    }

    return (
      <ReactMapGL
        ref={map => this._map = map}
        mapboxApiAccessToken = { this.props.mapboxApiAccessToken }
        {...this.props.viewport}
        onViewportChange={(viewport) => this.updateViewport(viewport)}
        onLoad={() => this.setTimelineFilter({ year: +this.props.currentYear })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
  	viewport: state.mapbox.viewport,
    isFiltersChanged: state.mapFilters.isFiltersChanged,
    currentYear: state.timeline.currentYear,
  };
};

export default connect(
  mapStateToProps,
  { changeFiltersOnMap, mapboxViewportChange },
)(MapBox);
import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { changeFiltersOnMap, mapboxViewportChange, mapboxReady } from '../../redux/actions';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._map = React.createRef();
  }

  getMergedFilters = (layer, filter) => {
    const currentFilters = this._map.getMap().getFilter(layer);

    console.log(layer, currentFilters);

    let newFilters = [
      "all",
    ];

    if(currentFilters !== undefined && currentFilters[0] === "all"){
      newFilters = this.getClearedFilters(layer, filter[1][1]);
    }

    if(currentFilters !== undefined && currentFilters[0] !== "all"){
      newFilters.push(currentFilters);
    }

    newFilters.push(filter);

    return newFilters;
  }

  getClearedFilters = (layer, param) => {
    const currentFilters = this._map.getMap().getFilter(layer);

    const clearedFilters = _.filter(currentFilters, obj => {
      return !(obj[1][1] === param);
    });

    return clearedFilters;
  }

  updateViewport = viewport => {
  	this.props.mapboxViewportChange(viewport);
    this.setState({viewport});
  };

  setYearFilter = (layer, year, condition = "<=") => {
    const mergedFilters = this.getMergedFilters(layer, [condition, ["get", "open_date"], +year]);
  	this._map.getMap().setFilter(layer, mergedFilters);
  }

  setEndYearFilter = (layer, year) => {
    const mergedFilters = this.getMergedFilters(layer, ["<=", ["get", "end_date"], +year]);
    this._map.getMap().setFilter(layer, mergedFilters);
  }

  setCurrentRailwayFilter = (layer, railwayId) => {
    const mergedFilters = this.getMergedFilters(layer, ["match", ["get", "railway_id"], [railwayId], true, false]);
    this._map.getMap().setFilter(layer, mergedFilters);
  }

  setYearForStationsFilter = (layer, year) => {
    const mergedFilters = this.getMergedFilters(layer, ["<=", ["get", "year"], +year]);
    this._map.getMap().setFilter(layer, mergedFilters);
  }

  setYearFiltersToLayers = (year) => {
    this.setYearFilter('selected-local-railway', year);
    this.setYearFilter('selected-railway', year);
    this.setYearFilter('local-railways-building', (year + 1), "==");
    this.setYearFilter('local-railways-builded', year, "==");
    this.setYearFilter('local-railways-small', year);
    this.setYearFilter('local-railways-large', year);

    this.setYearForStationsFilter('stations', year);

    this.setCurrentRailwayFilter('selected-railway', 1829);

    this.props.changeFiltersOnMap();
  }


  mapboxReady = () => {
    this.props.mapboxReady();
    this.setYearFiltersToLayers(+this.props.currentYear)
  }

  render() {
    if(this._map && this.props.isFiltersChanged){
      this.setYearFiltersToLayers(+this.props.currentYear);
    }

    return (
      <ReactMapGL
        ref={map => this._map = map}
        mapboxApiAccessToken = { this.props.mapboxApiAccessToken }
        {...this.props.viewport}
        onViewportChange={(viewport) => this.updateViewport(viewport)}
        onLoad={() => this.mapboxReady()}
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
  { changeFiltersOnMap, mapboxViewportChange, mapboxReady },
)(MapBox);
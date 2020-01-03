import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { changeFiltersOnMap } from '../../redux/actions';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._map = React.createRef();
    this.changeFiltersOnMap = this.props.changeFiltersOnMap;
    this.state = {
      mapboxApiAccessToken: this.props.mapboxApiAccessToken,
      viewport: this.props.params.START_VIEWPORT,
      mapStyle: this.props.params.BASE_STYLE,
    };
  }

  updateViewport = viewport => {
    viewport.mapStyle = this.state.mapStyle;
    this.setState({viewport});
  };

  render() {
    if(this._map.current !== null && this.props.isFiltersChanged){
      console.log(this.props.currentYear);
      this._map.getMap().setFilter('localrailways', [
        "all",
        ["<", ["get", "year"], +this.props.currentYear]
      ]);

      this.props.changeFiltersOnMap();
    }
    return (
      <ReactMapGL
        ref={map => this._map = map}
        mapboxApiAccessToken = { this.state.mapboxApiAccessToken }
        {...this.state.viewport}
        onViewportChange={(viewport) => this.updateViewport(viewport)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isFiltersChanged: state.mapFilters.isFiltersChanged,
    currentYear: state.timeline.currentYear
  };
};

export default connect(
  mapStateToProps,
  { changeFiltersOnMap },
)(MapBox);
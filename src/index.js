import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Component} from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends Component {

  state = {
    viewport: {
      width: 800,
      height: 600,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL mapboxApiAccessToken={'pk.eyJ1IjoiYWxkcmVzIiwiYSI6ImNqcjF2c2V0dTBnaDc0MnJwbmNjczM2ZTgifQ.VNyQzIrHBcpPlUcNbSpYyA'} 
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

ReactDOM.render(
    <Map />,
    document.getElementById('root')
  );
  
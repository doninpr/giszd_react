import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import turf from "turf";
import ReactMapGL, { Popup, NavigationControl } from 'react-map-gl';
import {
  changeFiltersOnMap,
  mapboxViewportChange,
  mapboxReady,
  fetchPhotos,
  fetchMapobjects,
  addPhotopointsToMap,
  addMapobjectsToMap,
  showPopupPhoto,
  hidePopupPhoto,
  showPopupMapobject,
  hidePopupMapobject,
  hideAllPopups,
  showPopupRailroad,
  hidePopupRailroad,
  fetchRailway,
  doFlyTo,
  railwaySelected,
  setDefaultFlyTo,
  showModal,
  fetchAndShowAlbumByImageId,
} from '../../redux/actions';
import { Button } from 'react-bootstrap';
import photopointImg from '../MapBox/images/photopoint.png';
import mapobjectFactoryImg from '../MapBox/images/factory.png';
import mapobjectWorkshopImg from '../MapBox/images/workshop.png';
import mapobjectRoadImg from '../MapBox/images/road.png';
import expandImg from '../MapBox/images/expand.png';
import ModalMapobjectContent from '../Modals/ModalContents/Mapobject/Mapobject';
import "./styles.css";
import 'mapbox-gl/dist/mapbox-gl.css';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    
    this._onClick = this._onClick.bind(this);
    this.props = props;
    this._map = React.createRef();
  }

  showStorytellingActions = (id) => {
    this.props.fetchRailway(id);
  }

  getMergedFilters = (layer, filter) => {
    const currentFilters = this._map.getMap().getFilter(layer);

    let newFilters = [
      "all",
    ];

    if(currentFilters !== undefined && currentFilters[0] === "all"){
      newFilters = this.getClearedFilters(layer, filter[1][1]);
    }

    if(currentFilters !== undefined && currentFilters[0] !== "all" && filter[1][1] !== currentFilters[1][1]){
      newFilters.push(currentFilters);
    }

    newFilters.push(filter);

    return newFilters;
  }

  expandPhoto = (id) => {
    this.props.fetchAndShowAlbumByImageId(id);
    this.props.hideAllPopups();
  }

  getClearedFilters = (layer, param) => {
    const currentFilters = this._map.getMap().getFilter(layer);

    const clearedFilters = _.filter(currentFilters, obj => {
      return Array.isArray(obj[1][1]) && Array.isArray(param) ? !(obj[1][1][1] === param[1]) : !(obj[1][1] === param);
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
    const mergedFilters = this.getMergedFilters(layer, ["any", ["!", ["has", "end_date"]], [">", ["get", "end_date"], +year] ]);
    this._map.getMap().setFilter(layer, mergedFilters);
  }

  setCurrentRailwayFilter = (layer, railwayId) => {
    const mergedFilters = this.getMergedFilters(layer, ["match", ["get", "railway_id"], [railwayId], true, false]);
    this._map.getMap().setFilter(layer, mergedFilters);
  }

  setCurrentLocalRailwayFilter = (layer, id) => {
    const mergedFilters = this.getMergedFilters(layer, ["match", ["get", "id"], [id], true, false]);
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

    this.setEndYearFilter('local-railways-small', year);
    this.setEndYearFilter('local-railways-large', year);

    this.setYearForStationsFilter('stations', year);

    if(this._map.getMap().getLayer('mapobjects') !== undefined){
      this.setYearFilter('mapobjects', year);
    }

    this.props.changeFiltersOnMap();
  }

  addLayer = (geojson, icon, layerId) => {
    this._map.getMap().addLayer({
      'id': layerId,
      'type': 'symbol',
      'source': {
        'type': 'geojson',
        'data': geojson
      },
      'layout': {
        'icon-image': icon,
      }
    });
  }

  _onClick(event) {

    this.props.hideAllPopups();

    const targetLayer = event.features[0] && event.features[0].layer.id;

    if(targetLayer === "photopoints"){
      this.props.showPopupPhoto({
        id: event.features[0].properties.id,
        coords: event.features[0].geometry.coordinates,
        image: event.features[0].properties.crop_image,
        description: event.features[0].properties.description,
      });
    }
    if(targetLayer === "mapobjects"){
      this.props.showPopupMapobject({
        coords: event.features[0].geometry.coordinates,
        title: event.features[0].properties.title,
        category_name: event.features[0].properties.category_name,
        id: event.features[0].properties.id,
        open_date: event.features[0].properties.open_date,
        end_date: event.features[0].properties.end_date,
        images: JSON.parse(event.features[0].properties.images),
      });
    }
    if(targetLayer === "local-railways-large" || targetLayer === "local-railways-small" || targetLayer === "local-railways-builded" || targetLayer === "stations"){
      const featureKey = _.findKey(event.features, (obj) => {
        return (obj.layer.id === "local-railways-large" || obj.layer.id === "local-railways-small" || obj.layer.id === "local-railways-builded");
      });

      if(featureKey !== undefined){
        this.props.showPopupRailroad({
          coords: event.lngLat,
          ...event.features[featureKey].properties,
        });
      }
    }
  }

  mapboxReady = () => {
    this.props.mapboxReady();
    this.setYearFiltersToLayers(+this.props.currentYear)

    this.props.fetchPhotos();
    this.props.fetchMapobjects();
  }

  doFlyTo = (props) => {
    this._map.getMap().flyTo({
      zoom: props.zoom,
      pitch: props.pitch,
      bearing: props.bearing,
      center: props.center,
    });

    this.props.doFlyTo();
  }

  addPointIcon = (img, name) => {
    const those = this;
    this._map.getMap().loadImage(img, function(error, image) {
      if (error) throw error;
      if (!those._map.getMap().hasImage(name)) those._map.getMap().addImage(name, image);
    });
  }

  addPhotopointsLayer = () => {
    const features = _.map(this.props.photopoints.list, obj => {
      return {
        'type': 'Feature',
        'geometry': obj.geometry,
        'properties': {
          'id': obj.id,
          'description': obj.description,
          'crop_image': obj.crop_image.img_600,
        }
      };
    });

    const photopointsGeojson = {
      'type': 'FeatureCollection',
      'features': features,
    };

    this.addPointIcon(photopointImg, 'photopoint');
    this.addLayer(photopointsGeojson, 'photopoint', "photopoints");

    this.props.addPhotopointsToMap();
  }

  addMapobjectsLayer = () => {
    const features = _.map(this.props.mapobjects.list, obj => {
      return {
        'type': 'Feature',
        'geometry': obj.geometry,
        'properties': {
          'category_id': obj.category.id,
          'category_name': obj.category.title,
          'description': obj.description,
          'id': obj.id,
          'title': obj.title,
          'railway': obj.railway,
          'end_date': obj.year_end,
          'open_date': obj.year_start,
          'images': obj.image,
        }
      };
    });

    const photopointsGeojson = {
      'type': 'FeatureCollection',
      'features': features,
    };


    this.addPointIcon(mapobjectFactoryImg, 'mapobjects-factory');
    this.addPointIcon(mapobjectWorkshopImg, 'mapobjects-workshop');
    this.addPointIcon(mapobjectRoadImg, 'mapobjects-road');

    const mapobjectsIconsStyle = [
      "match",
      ["get", "category_id"],
      [1],
      "mapobjects-factory",
      [2],
      "mapobjects-workshop",
      [3],
      "mapobjects-road",
      "mapobjects-factory"
    ];

    this.addLayer(photopointsGeojson, mapobjectsIconsStyle, "mapobjects");
    this.props.addMapobjectsToMap();

    this.setYearFilter('mapobjects', +this.props.currentYear);
  }

  render() {

    if(this.props.defaultFlyTo === null && this.props.isStorytellingShown){
      const bboxArray = turf.bbox( turf.lineString(this.props.railwayToShow.extent.coordinates[0]) );
      const bbox = [ [bboxArray[0],bboxArray[1]], [bboxArray[2], bboxArray[3]] ];

      let defaultFlyTo = this._map.getMap().cameraForBounds(bbox, {
        padding: {top: 30, bottom: 30, left: 30, right: 30}
      });

      if(defaultFlyTo.zoom < 4){
        defaultFlyTo.zoom = 4;
      }

      //defaultFlyTo.pitch = 60;

      this.props.setDefaultFlyTo(defaultFlyTo);
    }

    if(this.props.selects.isUpdate){
      this.setCurrentRailwayFilter('selected-railway', +this.props.selects.selectedRailway);
      this.setCurrentLocalRailwayFilter('selected-local-railway', +this.props.selects.selectedLocalRailway);
      this.props.railwaySelected();
    }

    if(this.props.flyTo.isUpdate){
      this.doFlyTo(this.props.flyTo);
    }

    if(!this.props.photopoints.isAddedOnMap && this.props.photopoints.isFinished){
      this.addPhotopointsLayer();
    }

    if(!this.props.mapobjects.isAddedOnMap && this.props.mapobjects.isFinished){
      this.addMapobjectsLayer();
    }

    if(this._map && this.props.isFiltersChanged){
      this.setYearFiltersToLayers(+this.props.currentYear);
    }

    return (
      <ReactMapGL
        id={"map"}
        ref={map => this._map = map}
        mapboxApiAccessToken = { this.props.mapboxApiAccessToken }
        {...this.props.viewport}
        onViewportChange={(viewport) => {
          if(!this.props.isStorytellingShown){
            this.updateViewport(viewport);
          }
        }}
        onLoad={() => this.mapboxReady()}
        onClick={event => this._onClick(event)}
        clickRadius={7}
        minZoom={4}
      >
        {!this.props.isStorytellingShown &&
          <div class="navControl">
            <NavigationControl />
          </div>
        }
        {this.props.popups.photo.isShow &&
          <Popup
            latitude={this.props.popups.photo.coords[1]}
            longitude={this.props.popups.photo.coords[0]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => this.props.hidePopupPhoto()}
            anchor="bottom"
          >
            <div class="photopoint_content">
              <img className={'photo'} src={"http://2.59.42.199:8888" + this.props.popups.photo.image} />
              <div class="photo_desc_wrap">
                <div class="photo_desc">
                  {this.props.popups.photo.description}
                </div>
              </div>
              <div className={'expand-photo'} onClick={() => this.expandPhoto(this.props.popups.photo.id)} ><img src={expandImg} /></div>
            </div>
          </Popup>
        }
        {this.props.popups.railroad.isShow &&
          <Popup
            className={this.props.isStorytellingShown ? "hidden-popup" : ""}
            latitude={this.props.popups.railroad.coords[1]}
            longitude={this.props.popups.railroad.coords[0]}
            closeButton={false}
            closeOnClick={false}
            onClose={() => this.props.hidePopupRailroad()}
            anchor="bottom"
          >
            <div class="railroad_content">
              <div class="railway-header active">
                <div class="railway-header-left railway-header-control hidden"></div>
                <div class="railway-header-center">{this.props.popups.railroad.open_date} г.</div>
                <div class="railway-header-right railway-header-control hidden"></div>
              </div>
              <div class="railway-content">
                <div class="railway-content-header">{this.props.popups.railroad.title}</div>
                <div class="railway-content-railway">
                  <div class="railway-content-railway-old hidden">
                    <span>до null г.:</span>
                    null ж.д.
                  </div>
                  <div class="railway-content-railway-new">{this.props.popups.railroad.railway_name}</div>
                  <Button variant="primary" size="sm" onClick={() => this.showStorytellingActions(this.props.popups.railroad.railway_id)}>Подробнее</Button>
                </div>
                <div class="railway-content-width">
                  <div class="railway-content-width-header">Ширина колеи:</div>
                  <div class="railway-content-width-new">{this.props.popups.railroad.gauge_width} мм.</div>
                </div>
                <div class="railway-content-length">
                  <div class="railway-content-length-header">Протяжённость:</div>
                  <div class="railway-content-length-new">{(+this.props.popups.railroad.length_meter/1000).toFixed(2)} км.</div>
                </div>
              </div>
            </div>
          </Popup>
        }
        {this.props.popups.mapobject.isShow &&
          <Popup
            latitude={this.props.popups.mapobject.coords[1]}
            longitude={this.props.popups.mapobject.coords[0]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => this.props.hidePopupMapobject()}
            anchor="bottom"
          >
            <div class="mapobject_content">
              <div class="mapobject_type">{this.props.popups.mapobject.category_name}</div>
              <div class="mapobject_heading">{this.props.popups.mapobject.title}</div>
              <div class="mapobject_dates">
                <div class="mapobject_dates-start">Построено в: <span>{this.props.popups.mapobject.open_date} г.</span></div>
                {this.props.popups.mapobject.end_date !== 'null' &&
                  <div class="mapobject_dates-end">Существовало до: <span>{this.props.popups.mapobject.end_date} г.</span></div>
                }
              </div>
              <div class="mapobject_buttons">
                <div class="mapobject_button-wrap">
                  <div
                    class="mapobject_button"
                    onClick={
                      () => this.props.showModal({
                        header: this.props.popups.mapobject.title,
                        content: ModalMapobjectContent,
                        params: { id: this.props.popups.mapobject.id }
                      })
                    }
                  >Подробнее</div>
                </div>
                {false &&
                  <div class="mapobject_button-wrap">
                    <div class="mapobject_button">Вложения</div>
                  </div>
                }
              </div>
            </div>
          </Popup>
        }
      </ReactMapGL>
    );
  }
}

const mapStateToProps = state => {
  return {
    window: state.window,
  	viewport: state.mapbox.viewport,
    selects: state.mapbox.selects,
    isFiltersChanged: state.mapFilters.isFiltersChanged,
    currentYear: state.timeline.currentYear,
    photopoints: state.mapData.photopoints,
    mapobjects: state.mapData.mapobjects,
    popups: state.popups,
    railwayToShow: state.storytelling.railwayToShow,
    defaultFlyTo: state.storytelling.defaultFlyTo,
    isStorytellingShown: state.storytelling.isShown,
    flyTo: state.mapbox.flyTo,
  };
};

export default connect(
  mapStateToProps,
  {
    changeFiltersOnMap,
    mapboxViewportChange,
    mapboxReady,
    fetchPhotos,
    fetchMapobjects,
    addPhotopointsToMap,
    addMapobjectsToMap,
    showPopupPhoto,
    hidePopupPhoto,
    showPopupMapobject,
    hidePopupMapobject,
    hideAllPopups,
    showPopupRailroad,
    hidePopupRailroad,
    fetchRailway,
    doFlyTo,
    railwaySelected,
    setDefaultFlyTo,
    showModal,
    fetchAndShowAlbumByImageId,
  },
)(MapBox);




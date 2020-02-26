import React from "react";
import { connect } from "react-redux";
import $ from 'jquery';
import MapBox from "./components/MapBox/MapBox";
import Timeline from "./components/Timeline/timeline";
import ButtonsBar from "./components/ButtonsBar/ButtonsBar";
import SearchBar from "./components/SearchBar/SearchBar";
import Storytelling from "./components/Storytelling/Storytelling";
import AlbumComponent from "./components/AlbumComponent/AlbumComponent";
import ModalComponent from "./components/Modals/ModalComponent/ModalComponent";
import { MAPBOX, TIMELINE } from "./constants";
import { changeWindowSize } from './redux/actions';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import faviconImg from '../src/favicon.png';
import faviconBigImg from '../src/favicon-big.png';
import MetaTags from 'react-meta-tags';
import { YMInitializer } from 'react-yandex-metrika';

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
        <MetaTags>
          <title>И.Р.Ж.Д.: История железных дорог России</title>
          <meta name="description" content="Итерактивная карта развития железных дорог России (1838 - 1930 гг.). Электронная энциклопедия по истории железных дорог с исторической информацией, мануфактурными объектами и архивными фотографиями железных дорог России." />
          <meta property="og:title" content="История железных дорог России" />
          <meta property="og:image" content={faviconBigImg} />
          <link rel="icon" href={faviconImg} />
          <link rel="apple-touch-icon" href={faviconBigImg} />
        </MetaTags>
        <div id="map-container">
          <MapBox mapboxApiAccessToken={ MAPBOX.API_TOKEN } />
          {!this.props.isStorytellingShown &&
            <div>
              <Timeline id={"timeline-slider"} params={TIMELINE} currentYear={TIMELINE.start[0]} />
              <ButtonsBar />
              <SearchBar />
            </div>
          }
        </div>
        <ModalComponent />
        {this.props.isStorytellingShown &&
          <Storytelling />
        }
        {this.props.isAlbumShown &&
          <AlbumComponent />
        }
        <YMInitializer accounts={[57685279]} options={{webvisor: true}} />
			</div>
		);
  	}
}

const mapStateToProps = state => {
  return {
    window: state.window,
    isStorytellingShown: state.storytelling.isShown,
    isAlbumShown: state.album.isShown,
  };
};

export default connect(
  mapStateToProps,
  { changeWindowSize },
)(App);
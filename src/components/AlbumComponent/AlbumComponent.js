import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/open-animation.css';
import closeImg from '../AlbumComponent/images/close.png';
import sourceImg from '../AlbumComponent/images/link.png';
import { hideAlbum, fetchRailway } from '../../redux/actions';
import { Button } from 'react-bootstrap';
import "./styles.css";

class AlbumComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  backToRailway = (id) => {
    this.props.fetchRailway(id);
    this.props.hideAlbum();
  }

  render() {
    return (
      <div id={'albumComponent'}>
        {this.props.album.railway !== null &&
          <div className={'back-to-railway'} onClick={() => this.backToRailway(this.props.album.railway)}>← О дороге</div>
        }
        <div className={'close-album'} onClick={this.props.hideAlbum}><img src={closeImg} /></div>
        <AwesomeSlider
          animation="openAnimation"
          fillParent={true}
        >
          {this.props.album &&
            _.map(this.props.album.image, (image, key) =>{
              return (
                <div key={key} data-src={"http://2.59.42.199:8888" + image.crop_image.img_1024} >
                  {image.description &&
                    <div className={"image-caption-block"}>
                      <div className={"image-caption"}>{image.description}</div>
                    </div>
                  }
                  {image.sourse &&
                    <div className={"image-source-block"}>
                      <div className={"image-source"}>
                        <Button size={'sm'} href={image.sourse.url} target={'_blank'}>
                          <img src={sourceImg} /> Источник
                        </Button>
                      </div>
                    </div>
                  }
                </div>
              );
            })
          }
        </AwesomeSlider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    album: state.album.album,
    isShown: state.album.isShown,
  };
};

export default connect(
  mapStateToProps,
  { hideAlbum, fetchRailway },
)(AlbumComponent);
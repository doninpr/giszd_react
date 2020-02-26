import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import $ from "jquery";
import scrollama from 'scrollama';
import { Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { setFlyTo, hideStorytelling, setYear, showAlbum, selectRailroad } from '../../redux/actions';
import arrowDownImg from '../Storytelling/images/down-arrow.png';
import "./styles.css";
import 'animate.css/animate.min.css';

class Storytelling extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.scroller = scrollama();
  }

  componentDidMount() {
    this.scroller
    .setup({
        step: '.step',
        offset: 0.5,
        progress: true
    })
    .onStepEnter(response => {
      const centerCoords = ($(response.element).data("coords-lon") === undefined || $(response.element).data("coords-lat") === undefined) ? null : [+$(response.element).data("coords-lon"), +$(response.element).data("coords-lat")];

      const eventYear = this.props.railwayData.end_date; //$(response.element).data("year") ||

      let flyToOptions = null;

      if( centerCoords === null ) {
        flyToOptions = this.props.defaultFlyTo;
      } else {
        flyToOptions = {
          center: centerCoords,
          zoom: +$(response.element).data("zoom"),
          pitch: +$(response.element).data("pitch"),
          bearing: +$(response.element).data("bearing"),
        };
      }

      this.props.setYear(+eventYear);
      this.props.setFlyTo(flyToOptions);
      $(response.element).addClass('active');
    })
    .onStepExit(response => {
      $(response.element).removeClass('active');
    });
  }

  albumClick = (album) => {
    this.props.showAlbum(album);
  }

  //data-year="1855" data-scrollama-index="0" data-zoom="5" data-coords-lon="35.200" data-coords-lat="57.678" data-pitch="0" data-bearing="0"

  render() {
    this.scroller.resize();


    if(this.props.mapSelects.selectedRailway === 0){
      this.props.selectRailroad(this.props.railwayData.id);
    }

    const descriptions = this.props.railwayData.description && this.props.railwayData.description.split("<!split>");
    const bgImage = this.props.railwayData.image[0] && this.props.railwayData.image[0].crop_image.img_1024;

    return (
      <div id="storytellingTemplate">
        <div id="story">
          <div class="story-block" id="storyHeader" style={{ backgroundImage: 'url("http://2.59.42.199:8888'+ bgImage +'")' }}>
            <Row>
              <Col md={8}>
                {this.props.window.width <= 768 &&
                  <Row>
                  <Col md={10} className="story-close-button story-close-button-mobile"><Button onClick={() => {
                    this.props.setYear(+this.props.lastYear);
                    this.props.hideStorytelling();
                  }}>Закрыть</Button></Col>
                </Row>
                }
                <Row>
                  <Col md={11} className="story-heading">
                    <h2>{this.props.railwayData.title} железная дорога</h2>
                  </Col>
                </Row>
                <Row>
                  <Col md={11} className="story-sidebar-block">
                    <Row>
                      <Col className="sidebar-block-heading" md={12}>
                        <p>Фотоальбомы:</p>
                      </Col>
                      <Col className="sidebar-block-content" md={12}>
                        {this.props.railwayData.album.length === 0 &&
                          <p variant="link">Нет фотографий</p>
                        }
                        {this.props.railwayData.album.length > 0 &&
                          <Row>
                            {this.props.railwayAlbums.length === 0 &&
                              <Col style={{ textAlign: 'center' }}>
                                <Spinner animation="border" />
                              </Col>
                            }
                            {this.props.railwayAlbums.length !== 0 &&
                              _.map(this.props.railwayAlbums, (album, key) => {
                                return (
                                  <Col md={4} key={key}>
                                    <div
                                      className={'album-block'}
                                      style={{ backgroundImage: 'url("http://2.59.42.199:8888'+ album.image[0].crop_image.img_300 +'")' }}
                                      onClick={() => this.albumClick(album)}
                                    >
                                      <Row>
                                        <Col>
                                          <div className={'album-block-title'}>{album.title}</div>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Col>
                                );
                              })
                            }
                          </Row>
                        }
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md={11} className={'story-warning-message-block'}>
                    <Alert className={'story-warning-message'} variant={"warning"}>
                      Портал в режиме бета-тестирования.
                    </Alert>
                    <Alert className={'story-warning-message'} variant={"warning"}>
                      Администрация регулярно проверяет и обновляет информацию. Если вы заметили ошибку, сообщите нам: railroadsmap@gmail.com
                    </Alert>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                {this.props.window.width > 768 &&
                  <Row>
                    <Col md={10} className="story-close-button story-close-desktop"><Button onClick={() => {
                      this.props.setYear(+this.props.lastYear);
                      this.props.hideStorytelling();
                    }}>Закрыть</Button></Col>
                  </Row>
                }
                <Row className="story-sidebar">
                  <Col md={10} className="story-sidebar-block">
                    <Row>
                      <Col className="sidebar-block-half" md={12} lg={6}>
                        <p className={'storytelling-block-heading'}>Год основания:</p>
                        <div>{this.props.railwayData.open_date} г.</div>
                      </Col>
                      <Col className="sidebar-block-half" md={12} lg={6}>
                        <p className={'storytelling-block-heading'}>Протяженность:</p>
                        {this.props.railwayData.length_for_years &&
                          _.map(this.props.railwayData.length_for_years, (o, key) => {
                            return (
                              <div className={'length-element'} key={key}>
                                <span>{key} г.:</span> {(+o/1000).toFixed(2)} км.
                              </div>
                            );
                          })
                        }
                      </Col>
                    </Row>
                  </Col>
                  <Col md={10} className="story-sidebar-block">
                    <Row>
                      <Col className="sidebar-block-heading" md={12}>
                        <p>Подвижной состав:</p>
                      </Col>
                      <Col className="sidebar-block-content" md={12}>
                        <Button variant="link">В разработке</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            
          </div>
          <div class="animated infinite bounce history-arrow"><p>История</p><img src={arrowDownImg} /></div>
          <div className={descriptions.length === 1 || this.props.window.width <= 768 ? "full" : "lefty"} id="storytellingFeatures">
          {descriptions &&
            _.map(descriptions, (block, index) => {
              const year = block.indexOf('<!year=') !== -1 ? block.substring(block.indexOf('<!year=')+7, block.indexOf('<!year=')+11) : null;
              const text = block.replace(/<!year=....>/g,"").replace(/\n/g,'<br />');

              return (
                <div id={"storytelling-block-"+index} class="step" key={index} data-year={+year}>
                  {year &&
                    <div class="story-year">{year} г.</div>
                  }
                  <div class="story-block">
                    <div class="story-block-inner">
                      <p dangerouslySetInnerHTML={{__html: text}} />
                    </div>
                  </div>
                </div>
              );
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    window: state.window,
    railwayData: state.storytelling.railwayToShow,
    railwayAlbums: state.storytelling.albums,
    defaultFlyTo: state.storytelling.defaultFlyTo,
    currentYear: state.timeline.currentYear,
    lastYear: state.timeline.lastYear,
    mapSelects: state.mapbox.selects,
  };
};

export default connect(
  mapStateToProps,
  { setFlyTo, hideStorytelling, setYear, showAlbum, selectRailroad },
)(Storytelling);
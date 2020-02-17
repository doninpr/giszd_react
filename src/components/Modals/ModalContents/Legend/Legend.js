import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { Row, Col } from 'react-bootstrap';
//import { тут можно импортировать те или иные события для вызова } from '../../redux/actions';
import photoImg from '../Legend/images/photo.png';
import roadImg from '../Legend/images/road.png';
import factoryImg from '../Legend/images/factory.png';
import pairImg from '../Legend/images/pair.png';
import dashRoadImg from '../Legend/images/legend_dash-road.png';
import dotRoadImg from '../Legend/images/legend_dot-road.png';
import selectedLocalRoadImg from '../Legend/images/legend_selected-local-road.png';
import selectedRoadImg from '../Legend/images/legend_selected-road.png';
import smallRoadImg from '../Legend/images/legend_small-road.png';
import basicRoadImg from '../Legend/images/legend_basic-road.png';
import boundaryImg from '../Legend/images/legend_boundary.png';
import stationImg from '../Legend/images/station_point.png';
import "./styles.css";

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    return (
      <div className="modal-legend">
        <Row>
          <Col md={6} className="legend-element">
            <img className='icon' src={photoImg} />
            <span>Фотографии</span>
          </Col>
          <Col md={6} className="legend-element">
            <img className='icon' src={factoryImg} />
            <span>Заводы</span>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="legend-element">
            <img className='icon' src={pairImg} />
            <span>Мастерские</span>
          </Col>
          <Col md={6} className="legend-element">
            <img className='icon' src={roadImg} />
            <span>Промышленные ЖД</span>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="legend-element">
            <img className='icon' src={basicRoadImg} />
            <span>ЖД широкой колеи</span>
          </Col>
          <Col md={6} className="legend-element">
            <img className='icon' src={smallRoadImg} />
            <span>ЖД узкой колеи</span>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="legend-element">
            <img className='icon' src={dotRoadImg} />
            <span>Строящаяся ЖД</span>
          </Col>
          <Col md={6} className="legend-element">
            <img className='icon' src={dashRoadImg} />
            <span>Построенная ЖД</span>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="legend-element">
            <img className='icon' src={selectedRoadImg} />
            <span>Выделенная ЖД</span>
          </Col>
          <Col md={6} className="legend-element">
            <img className='icon' src={selectedLocalRoadImg} />
            <span>Выделенный участок ЖД</span>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="legend-element">
            <img className='icon' src={stationImg} />
            <span>Станции</span>
          </Col>
        </Row>
        <Row>
          <Col className="legend-element">
            <img className='icon' src={boundaryImg} />
            <span>Территория России</span>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(
  mapStateToProps,
  {  },
)(Legend);
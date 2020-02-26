import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
//import { тут можно импортировать те или иные события для вызова } from '../../redux/actions';
import visibleImg from '../Filters/images/visible.png';
import unvisibleImg from '../Filters/images/unvisible.png';
import "./styles.css";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    return (
      <div>
        <Row className={'filters-heading'} style={{ marginTop: 'auto' }}>
          <Col>
            В разработке
          </Col>
        </Row>
        {false &&
          <div className="modal-filters">
            <Row className={'filters-heading'} style={{ marginTop: 'auto' }}>
              <Col>
                Слои:
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" variant="success" className={'filter-button filter-button-visible'} block><img className={'modal-filter-img filter-img-visible'} src={visibleImg} /><img className={'modal-filter-img filter-img-unvisible'} src={unvisibleImg} /> Станции</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" variant="outline-success" className={'filter-button filter-button-unvisible'} block><img className={'modal-filter-img filter-img-visible'} src={visibleImg} /><img className={'modal-filter-img filter-img-unvisible'} src={unvisibleImg} /> Фотографии</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" block><img className={'modal-filter-img'} src={visibleImg} /> Мануфактуры</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" block><img className={'modal-filter-img'} src={visibleImg} /> Промышленные ЖД</Button>
              </Col>
            </Row>
            <Row className={'filters-heading'}>
              <Col>
                Ширина колеи ЖД:
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" block><img className={'modal-filter-img'} src={visibleImg} /> Узкоколейные ЖД</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" block><img className={'modal-filter-img'} src={visibleImg} /> Ширококолейные ЖД</Button>
              </Col>
            </Row>
            <Row className={'filters-heading'}>
              <Col>
                Тип ЖД:
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" block><img className={'modal-filter-img'} src={visibleImg} /> Частная</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" block><img className={'modal-filter-img'} src={visibleImg} /> Казенная/Государственная</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" block><img className={'modal-filter-img'} src={visibleImg} /> Военная</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="sm" block><img className={'modal-filter-img'} src={visibleImg} /> Неизвестно</Button>
              </Col>
            </Row>
          </div>
        }
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
)(Filters);
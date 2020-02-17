import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { Row, Col } from 'react-bootstrap';
import _ from "lodash";
//import { тут можно импортировать те или иные события для вызова } from '../../redux/actions';
import checkboxImg from '../Mapstyle/images/check-box.png';
import "./styles.css";

class Mapstyle extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    return (
      <div class="popover-mapstyle">
        <p>В разработке</p>
        <Row>
          <Col>
            <div class="mapstyle_style mapstyle1 checked">
              <img src={checkboxImg} />
            </div>
          </Col>
          <Col>
            <div class="mapstyle_style mapstyle2">
              <img src={checkboxImg} />
            </div>
          </Col>
          <Col>
            <div class="mapstyle_style mapstyle3">
              <img src={checkboxImg} />
            </div>
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
)(Mapstyle);
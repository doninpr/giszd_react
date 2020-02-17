import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { ButtonToolbar, Button, OverlayTrigger } from 'react-bootstrap';
import aboutUsImg from '../ButtonsBar/images/about_us.png';
import filterImg from '../ButtonsBar/images/filter.png';
import legendImg from '../ButtonsBar/images/legend.png';
import stylesImg from '../ButtonsBar/images/styles.png';
import { showModal } from '../../redux/actions';
import ModalAboutContent from '../Modals/ModalContents/About/About';
import ModalLegendContent from '../Modals/ModalContents/Legend/Legend';
import PopoverComponent from '../Popovers/PopoverComponent/PopoverComponent';
import PopoverMapstyleContent from '../Popovers/Contents/Mapstyle/Mapstyle';
import PopoverFiltersContent from '../Popovers/Contents/Filters/Filters';

import "./styles.css";

class ButtonsBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div class="buttonsBar">
        <Button size="sm" value={1} onClick={() => this.props.showModal({ header: "О проекте", content: ModalAboutContent })} ><img src={aboutUsImg} /></Button>
        <Button size="sm" value={2} onClick={() => this.props.showModal({ header: "Условные обозначения", content: ModalLegendContent, size: 'md' })} ><img src={legendImg} /></Button>
        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={
            <PopoverComponent header="Фильтры">
              <PopoverFiltersContent />
            </PopoverComponent>
          }
        >
          <Button size="sm" value={3} ><img src={filterImg} /></Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={
            <PopoverComponent header="Цвет карты">
              <PopoverMapstyleContent />
            </PopoverComponent>
          }
        >
          <Button size="sm" value={4} ><img src={stylesImg} /></Button>
        </OverlayTrigger>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    window: state.window,
  };
};

export default connect(
  mapStateToProps,
  { showModal }
)(ButtonsBar);
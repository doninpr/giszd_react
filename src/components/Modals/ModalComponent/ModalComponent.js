import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { Modal, Button } from 'react-bootstrap';
import { hideModal } from '../../../redux/actions';
import "./styles.css";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const ModalContent = this.props.content;
    const params = this.props.params;

    return (
      <div class="modalComponent">
        <Modal
          show={this.props.isShown}
          onHide={this.props.hideModal}
          size={this.props.size || "lg"}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.header}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {ModalContent &&
              <ModalContent params={params} />
            }
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onClick={this.props.hideModal}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isShown: state.modal.isShown,
    header: state.modal.header,
    content: state.modal.content,
    size: state.modal.size,
    params: state.modal.params,
  };
};

export default connect(
  mapStateToProps,
  { hideModal },
)(ModalComponent);
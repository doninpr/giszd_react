import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { showAlbum } from '../../../../redux/actions';
import "./styles.css";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  albumClick = (images) => {
    const album = {
      id: 0,
      title: 'Вложения',
      railway: null,
      image: images,
    };
    this.props.showAlbum(album);
  }

  render() {

    const currentObject = _.find(this.props.mapobjects, (obj) => {
      return obj.id === this.props.params.id;
    });

    return (
      <div>
        <Row>
          <Col>
            <div class="modal-mapobject_dates">
                <div class="modal-mapobject_date">Построено в: <span>{currentObject.year_start} г.</span></div>
                {currentObject.year_end !== null &&
                  <div class="modal-mapobject_date">Существовало до: <span>{currentObject.year_end} г.</span></div>
                }
            </div>
          </Col>
          {currentObject.image.length > 0 &&
            <Col>
              <div
                className={'album-block'}
                style={{ backgroundImage: 'url("http://2.59.42.199:8888'+ currentObject.image[0].crop_image.img_300 +'")' }}
                onClick={() => this.albumClick(currentObject.image)}
              >
                <Row>
                  <Col>
                    <div className={'album-block-title'}>{"Вложения"}</div>
                  </Col>
                </Row>
              </div>
            </Col>
          }
        </Row>
        <Row className={'mapobject-descr'}>
          <Col>
            <p dangerouslySetInnerHTML={{ __html: currentObject.description.replace(/\n/g,'<br />')}} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mapobjects: state.mapData.mapobjects.list,
  };
};

export default connect(
  mapStateToProps,
  { showAlbum },
)(About);
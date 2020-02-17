import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { Button } from 'react-bootstrap';
import _ from "lodash";
//import { тут можно импортировать те или иные события для вызова } from '../../redux/actions';
import "./styles.css";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    return (
      <div>
        В разработке
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
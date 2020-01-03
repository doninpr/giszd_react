import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { setYear } from "../../redux/actions";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./styles.css";

const Timeline = ({ id, params, currentYear, setYear }) => {
  return (
      <Nouislider
        id={id}
        {...params}
        onChange={(year) => setYear(year[0])}
      />
  );
};

const mapStateToProps = state => {
  return { currentYear: state.currentYear };
};

export default connect(
  mapStateToProps,
  { setYear }
)(Timeline);
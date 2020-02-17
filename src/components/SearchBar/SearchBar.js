import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { InputGroup, FormControl } from 'react-bootstrap';
import searchImg from '../SearchBar/images/search.svg';
import _ from "lodash";
//import { тут можно импортировать те или иные события для вызова } from '../../redux/actions';
import "./styles.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    return (
      <div class="searchBar">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default"><img src={searchImg} /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="default" aria-describedby="inputGroup-sizing-default" placeholder="Поиск по станциям и ЖД" />
        </InputGroup>
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
)(SearchBar);
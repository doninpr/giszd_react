import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { InputGroup, FormControl } from 'react-bootstrap';
import searchImg from '../SearchBar/images/search.svg';
import _ from "lodash";
import { Row, Col, Tabs, Tab, Spinner } from 'react-bootstrap';
import { fetchSearch, hideSearchResults, fetchRailway, mapboxViewportChange } from '../../redux/actions';
import closeImg from '../SearchBar/images/close.png';
import "./styles.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  search = (event) => {
    const query = event.currentTarget.value;

    if(query.length >= 3){
      this.props.fetchSearch(query);
    }
  }



  render() {

    return (
      <div>
        <div class="searchBar">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default"><img src={searchImg} /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label="default" aria-describedby="inputGroup-sizing-default" onInput={this.search} onFocus={this.search} placeholder="Поиск по станциям и ЖД" />
          </InputGroup>
        </div>
        {this.props.searchResults.isShown &&
          <div className={"search-results"}>
            <div className={'close-search'} onClick={this.props.hideSearchResults}><img src={closeImg} /></div>
            <Row>
              <Col>
                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-search">
                  <Tab eventKey="home" title={"Железные дороги" }>
                    {this.props.searchResults.railways.isLoading &&
                      <div className={'search-loading'}>
                        <Spinner animation="border" variant="secondary" />
                      </div>
                    }
                    {!this.props.searchResults.railways.isLoading && this.props.searchResults.railways.results.length > 0 &&
                      _.map(this.props.searchResults.railways.results, (result, key) => {
                        return (
                          <Row key={key}>
                            <Col sm={12}>
                              <div onClick={() => this.props.fetchRailway(result.id)} className={'search-result-element'} >{result.title}</div>
                            </Col>
                          </Row>
                        );
                      })
                    }
                    {this.props.searchResults.railways.results.length === 0 &&
                      <div className={'search-empty'}>
                        <p>Нет результатов</p>
                      </div>
                    }
                  </Tab>
                  <Tab eventKey="profile" title="Станции">
                    {this.props.searchResults.stations.isLoading &&
                      <div className={'search-loading'}>
                        <Spinner animation="border" variant="secondary" />
                      </div>
                    }
                    {!this.props.searchResults.stations.isLoading && this.props.searchResults.stations.results.length > 0 &&
                      _.map(this.props.searchResults.stations.results, (result, key) => {
                        return (
                          <Row key={key}>
                            <Col sm={12}>
                              <div
                                onClick={
                                  () => this.props.mapboxViewportChange({
                                    zoom: 12,
                                    longitude: result.geometry.coordinates[0],
                                    latitude: result.geometry.coordinates[1],
                                  })
                                }
                                className={'search-result-element'}
                              >{result.title}</div>
                            </Col>
                          </Row>
                        );
                      })
                    }
                    {this.props.searchResults.stations.results.length === 0 &&
                      <div className={'search-empty'}>
                        <p>Нет результатов</p>
                      </div>
                    }
                  </Tab>
                </Tabs>
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
    searchResults: state.search,
  };
};

export default connect(
  mapStateToProps,
  { fetchSearch, hideSearchResults, fetchRailway, mapboxViewportChange },
)(SearchBar);
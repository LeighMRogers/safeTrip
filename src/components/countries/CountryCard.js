import React, { Component } from 'react';
import CountryManager from '../../modules/CountryManager'

class CountryCard extends Component {

  handleDelete = id => {
    CountryManager.delete(id)
    .then(() => this.props.getData());
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h3><span className="card-countryName"> {this.props.data.countrycode.name}</span></h3>
          <p>Advisory Score: {this.props.data.countrycode.advisory.score}</p>
          <p>Advisory Message:{this.props.data.countrycode.advisory.message}</p>
          <p>Updated:{this.props.data.countrycode.advisory.updated}</p>
          {/* <button type="button" onClick={() => this.props.handleDelete(this.props..id)}>Delete Country</button> */}
        </div>
      </div>
    );
  }
}

export default CountryCard;
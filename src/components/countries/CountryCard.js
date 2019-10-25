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
          <h3>I'm a country card!</h3>
          <h3><span className="card-countryName"> {this.props.country.name}</span></h3>
          <p>Advisory Score: {this.props.country.advisory.score}</p>
          { this.props.country.advisory.message !== "" ?
            <p>Advisory Message:{this.props.country.advisory.message}</p>
            : <p>There is currently not an advisory message for {this.props.country.name}</p>
          }
          <p>Last Updated:{this.props.country.advisory.updated}</p>

          <button type="button" onClick={() => this.props.handleDelete(this.props.country.iso_alpha2)}>Delete Country</button>
        </div>
      </div>
    );
  }
}

export default CountryCard;
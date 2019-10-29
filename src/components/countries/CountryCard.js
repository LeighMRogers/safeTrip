import React, { Component } from 'react';
import ItineraryCountryManager from '../../modules/ItineraryCountryManager';
import ItineraryEditForm from '../itineraries/ItineraryEditForm';

class CountryCard extends Component {

  state = {
    formType: ""
  }
  componentDidMount = () => {
    this.setState({formType: this.props.formType})
  }
  handleDelete = () => {
    ItineraryCountryManager.delete(this.props.relatedCountryId)
    .then(() => this.props.getData());
  }

  render() {
  console.log("form type", this.props.formType)
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
          { this.state.formType ?
            <button type="button" onClick={() => this.handleDelete()}>Delete Country</button>
            : ""
          }
        </div>
      </div>
    );
  }
}

export default CountryCard;
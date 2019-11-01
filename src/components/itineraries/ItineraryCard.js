import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItineraryManager from '../../modules/ItineraryManager'
import CountryManager from '../../modules/CountryManager';
import ItineraryCountryManager from '../../modules/ItineraryCountryManager';

class ItineraryCard extends Component {

  state = {
    countryResults: [],
    country: ""
  }

  handleDelete = id => {
    ItineraryManager.delete(id)
    .then(() => this.props.getData());
  }

  componentDidMount() {
    let newStateArray = [];
    let newState = {};
    ItineraryCountryManager.getRelated(this.props.itineraryId)
      .then((relatedCountries) => {
        let promiseArray = relatedCountries.map(relatedCountry => {
        return CountryManager.getCountry(relatedCountry.countryCode)
        .then(country => {
          newStateArray.push(country.data[relatedCountry.countryCode]);
          })
        })
        Promise.all(promiseArray).then(() => {
          newState.countryResults = this.state.countryResults.concat(newStateArray)
          this.setState(newState)
        })
      })
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h3 className="card-header">{this.props.itinerary.itineraryName}</h3>
          <div className="card-body">
            {
                this.state.countryResults.map(newCountry => (
                  <h5
                  className="card-title"
                  key={newCountry.iso_alpha2}>Traveling to: {newCountry.name}</h5>
                ))
            }
            <p >Travel Dates: {this.props.itinerary.startDate} to {this.props.itinerary.endDate}</p>
            <p>Note: {this.props.itinerary.note}</p>

            <Link to={`/${this.props.itineraryId}`}>
              <button type="button" className="btn btn-primary">Details</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ItineraryCard;
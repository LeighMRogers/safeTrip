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
          <h2><span className="card-countryName"> Itinerary Card
          </span></h2>
          <h3>{this.props.itinerary.itineraryName}</h3>
          <p>{this.props.itinerary.itineraryDate}</p>
          {
              this.state.countryResults.map(newCountry => (
                <p key={newCountry.iso_alpha2}>{newCountry.name}</p>
              ))
            }
          <p>{this.props.itinerary.note}</p>

          <Link to={`/${this.props.itineraryId}`}><button>Details</button></Link>
        </div>
      </div>
    );
  }
}

export default ItineraryCard;
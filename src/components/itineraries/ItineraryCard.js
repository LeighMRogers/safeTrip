import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItineraryManager from '../../modules/ItineraryManager'
import CountryManager from '../../modules/CountryManager';
import ItineraryCountryManager from '../../modules/ItineraryCountryManager';

class ItineraryCard extends Component {

  state = {
    country: ""
  }

  handleDelete = id => {
    ItineraryManager.delete(id)
    .then(() => this.props.getData());
  }

  componentDidMount() {
    ItineraryCountryManager.getRelated(this.props.itinerary.id)
    .then((relatedCountries) => {
      relatedCountries.forEach(relatedCountry => {
      CountryManager.getCountry(relatedCountry.countryCode)
      .then(country => {
        console.log("itinerary card countryCode", relatedCountry.countryCode)
        this.setState({
          country: country.data[relatedCountry.countryCode].name
          });
        })
      })
    })
  }

  render() {
    console.log("first itinerary", this.props)
    return (
      <div className="card">
        <div className="card-content">
          <h2><span className="card-countryName"> Itinerary Card
          </span></h2>
          <h3>{this.props.itinerary.itineraryName}</h3>
          <p>{this.props.itinerary.itineraryDate}</p>
          <p>{this.state.country}</p>
          <p>{this.props.itinerary.note}</p>

          <Link to={`/${this.props.itineraryId}`}><button>Details</button></Link>
        </div>
      </div>
    );
  }
}

export default ItineraryCard;
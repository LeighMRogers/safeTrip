import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItineraryManager from '../../modules/ItineraryManager'
import CountryManager from '../../modules/CountryManager';

class ItineraryCard extends Component {

  state = {
    country: ""
  }

  handleDelete = id => {
    ItineraryManager.delete(id)
    .then(() => this.props.getData());
  }

  componentDidMount() {
    CountryManager.getCountry(this.props.itinerary.countryCode)
    .then(country => {
      this.setState({
        country: country.data[this.props.itinerary.countryCode].name
      });
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
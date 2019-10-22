import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItineraryManager from '../../modules/ItineraryManager'

class ItineraryCard extends Component {

  handleDelete = id => {
    ItineraryManager.delete(id)
    .then(() => this.props.getData());
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
          <p>{this.props.itinerary.note}</p>

          <Link to={`/${this.props.itineraryId}`}><button>Details</button></Link>
        </div>
      </div>
    );
  }
}

export default ItineraryCard;
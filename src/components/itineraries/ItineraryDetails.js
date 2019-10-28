import React, { Component } from 'react';
import ItineraryManager from '../../modules/ItineraryManager';
import CountryManager from '../../modules/CountryManager';
import ItineraryCountryManager from '../../modules/ItineraryCountryManager'
import CountryCard from '../countries/CountryCard'

class ItineraryDetails extends Component {

  state = {
      countryResults: [],
      itineraryName: "",
      itineraryDate: "",
      countryCode: null,
      country: "",
      note:"",
      userId: "",
      loadingStatus: true,
  }

  handleDelete = () => {
    console.log(this.props.itineraryId)
    //invoke the delete function in ItineraryManger and re-direct to the itinerary list.
    this.setState({loadingStatus: true})
    ItineraryManager.delete(this.props.itineraryId)
    .then(() => this.props.history.push("/"))
  }

  getCountryName() {
    CountryManager.getCountry(this.state.countryCode)
    .then(country => {
      console.log(country.data[this.state.countryCode].name);
      this.setState({
        country: country.data[this.state.countryCode].name
      });
    })
  }

  componentDidMount(){
    let newStateArray = [];
    let newState = {};
    console.log("ItineraryDetail: ComponentDidMount");
    //get(id) from ItineraryManager and hang on to the data; put it into state
    ItineraryManager.get(this.props.itineraryId)
    .then((itinerary) => {
      console.log("itinerary", itinerary)
        newState.itineraryName = itinerary.itineraryName
        newState.itineraryDate = itinerary.itineraryDate
        newState.note = itinerary.note
        newState.userId = this.state.userId
        newState.loadingStatus = false
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
    })
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
            <h3><span style={{ color: 'darkslategrey' }}>{this.state.itineraryName}</span></h3>
            <p>Date: {this.state.itineraryDate}</p>
            {/* <p>Countries: {this.state.country}</p> */}
            {
              this.state.countryResults.map(newCountry => (
              <CountryCard
                  country={newCountry}
                  key={newCountry.iso_alpha2}
              />
              ))
            }
            <p>Note: {this.state.note}</p>

            <button type="button" onClick={() => {this.props.history.push(`/${this.props.itineraryId}/edit`)}}>Edit Itinerary</button>
            <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete Itinerary</button>
        </div>
      </div>
    );
  }
}

export default ItineraryDetails;

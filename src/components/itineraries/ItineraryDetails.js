import React, { Component } from 'react';
import ItineraryManager from '../../modules/ItineraryManager';
import CountryManager from '../../modules/CountryManager';
import ItineraryCountryManager from '../../modules/ItineraryCountryManager'

class ItineraryDetails extends Component {

  state = {
      itineraryName: "",
      itineraryDate: "",
      countryCode: "",
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
    console.log("ItineraryDetail: ComponentDidMount");
    //get(id) from EmployeeManager and hang on to the data; put it into state
    ItineraryManager.get(this.props.itineraryId)
    .then((itinerary) => {
      console.log("itinerary", itinerary)
      this.setState({
        itineraryName: itinerary.itineraryName,
        itineraryDate: itinerary.itineraryDate,
        countryCode: itinerary.countryCode,
        country: itinerary.country,
        note: itinerary.note,
        userId: this.state.userId,
        loadingStatus: false
      });
    })
    ItineraryCountryManager.getRelated(this.props.itineraryId)
    .then((relatedCountries) => {
      relatedCountries.forEach(relatedCountry => {
      CountryManager.getCountry(relatedCountry.countryCode)
      .then(country => {
        this.setState({
          country: country.data[relatedCountry.countryCode].name
          });
        })
      })
    })
    // .then(() => {
    //   this.getCountryName();
    //   })
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
            <h3><span style={{ color: 'darkslategrey' }}>{this.state.itineraryName}</span></h3>
            <p>Date: {this.state.itineraryDate}</p>
            <p>Countries: {this.state.country}</p>
            {/* <p>Advisory Score: {this.props.data.countrycode.advisory.score}</p> */}
            <p>Note: {this.state.note}</p>
            <button type="button" onClick={() => {this.props.history.push(`/${this.props.itineraryId}/edit`)}}>Edit Itinerary</button>
            <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete Itinerary</button>
        </div>
      </div>
    );
  }
}

export default ItineraryDetails;

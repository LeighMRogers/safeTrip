import CountryCard from '../countries/CountryCard'
import React, { Component } from 'react';
import ItineraryManager from '../../modules/ItineraryManager';

class ItineraryDetails extends Component {

  state = {
      itineraryName: "",
      itineraryDate: "",
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

  componentDidMount(){
    console.log("ItineraryDetail: ComponentDidMount");
    //get(id) from EmployeeManager and hang on to the data; put it into state
    ItineraryManager.get(this.props.itineraryId)
    .then((itinerary) => {
      this.setState({
        itineraryName: itinerary.itineraryName,
        itineraryDate: itinerary.itineraryDate,
        note: itinerary.note,
        userId: this.state.userId,
        loadingStatus: false
      });
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
            <h3><span style={{ color: 'darkslategrey' }}>{this.state.itineraryName}</span></h3>
            <p>Date: {this.state.itineraryDate}</p>
            {/* <p>Countries: {this.props.data.countrycode.name}</p> */}
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

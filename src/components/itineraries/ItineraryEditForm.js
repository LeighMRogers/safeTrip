import React, { Component } from "react"
import ItineraryManager from "../../modules/ItineraryManager"

class ItineraryEditForm extends Component {
    //set the initial state
    state = {
        itineraryId: "",
        itineraryName: "",
        itineraryDate: "",
        countrySearch: "",
        note:"",
        userId: "",
        loadingStatus: true,
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    getData = () => {
		let userId = this.props.getUser()
		ItineraryManager.getAll(userId).then(itineraries => {
			this.setState({
				itineraries: itineraries,
				user: userId
			});
		});
	};

    updateItinerary = evt => {
        console.log("event", evt)
      evt.preventDefault()
      this.setState({ loadingStatus: true });
      const editedItinerary = {
        itineraryName: this.state.itineraryName,
        itineraryDate: this.state.itineraryDate,
        countrySearch: this.state.countrySearch,
        note: this.state.note,
        userId: this.state.userId
      };

      ItineraryManager.update(this.state.itineraryId, editedItinerary)
    //   .then(() => this.props.getData())
      .then(() => this.props.history.push("/"))
    }

    componentDidMount() {
      ItineraryManager.get(this.props.match.params.itineraryId)
      .then(itinerary => {
          this.setState({
            itineraryId: itinerary.id,
            itineraryName: itinerary.itineraryName,
            itineraryDate: itinerary.itineraryDate,
            countrySearch: itinerary.countrySearch,
            note: itinerary.note,
            userId: itinerary.userId,
            loadingStatus: false
          });
      });
    }

    render() {
      return (
        <>
        <form>
          <fieldset>
            <div className="formgrid">
              <input
                type="text"
                required
                className="form-control"
                placeholder='Itinerary name'
                onChange={this.handleFieldChange}
                id="itineraryName"
                value={this.state.itineraryName}
              />

              <input
                type="date"
                required
                className="form-control"
                placeholder='Date'
                onChange={this.handleFieldChange}
                id="itineraryDate"
                value={this.state.itineraryDate}
              />

              <input
                type="text"
                required
                className="form-control"
                placeholder='Search for countries'
                onChange={this.handleFieldChange}
                id="countrySearch"
                value={this.state.countrySearch}
              />

              <input
                type="text"
                required
                className="form-control"
                placeholder='Write a note'
                onChange={this.handleFieldChange}
                id="note"
                value={this.state.note}
              />

            </div>
            <div className="alignRight">
              <button
                type="button"
                onClick={this.updateItinerary}
                className="btn btn-primary"
              >Update Itinerary</button>
            </div>
          </fieldset>
        </form>
        </>
      );
    }
}

export default ItineraryEditForm
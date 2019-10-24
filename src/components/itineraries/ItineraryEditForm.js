import React, { Component } from "react"
import ItineraryManager from "../../modules/ItineraryManager"
import CountryManager from '../../modules/CountryManager'

class ItineraryEditForm extends Component {
    //set the initial state
    state = {
        itineraryName: "",
        itineraryDate: "",
        countrySearch: "",
        note:"",
        userId: "",
        countryCode: "",
        country: "",
        loadingStatus: true,
    }

    handleCountrySearch = searchTerm => {
        CountryManager.getAllCountries()
        .then((allCountries) => {
          Object.keys(allCountries.data).forEach((key) => {
            if (allCountries.data[key].name === searchTerm) {
                this.setState({countryCode: allCountries.data[key].iso_alpha2})
            }
          })
        })
        .then(() => {
            this.getCountryName();
        })
      }

    getCountryName() {
        CountryManager.getCountry(this.state.countryCode)
        .then(country => {
          this.setState({
            country: country.data[this.state.countryCode].name
          });
        })
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
        countryCode: this.state.countryCode,
        country: this.state.country,
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
            countryCode: itinerary.countryCode,
            country: itinerary.country,
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
                id="country"
                value={this.state.country}
              />
              <button type="button" onClick={() => this.handleCountrySearch(this.state.country)}>Add Country to Itinerary</button>

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
import React, { Component } from "react"
import ItineraryManager from "../../modules/ItineraryManager"
import CountryManager from '../../modules/CountryManager'
import ItineraryCountryManager from '../../modules/ItineraryCountryManager'
import CountryCard from '../countries/CountryCard'

class ItineraryEditForm extends Component {
    //set the initial state
    state = {
        countryResults: [],
        itineraryId: "",
        itineraryName: "",
        itineraryDate: "",
        countrySearch: "",
        note:"",
        userId: "",
        countryCode: null,
        country: "",
        loadingStatus: true,
    }

    handleCountrySearch = searchTerm => {
        let editedStateArray = [];
        CountryManager.getAllCountries()
        .then((allCountries) => {
          Object.keys(allCountries.data).forEach((key) => {
            if (allCountries.data[key].name === searchTerm) {
                //pushes the country object to the newStateArray array.
                editedStateArray.push(allCountries.data[key])
                //this sets the state of the searched countries and finds its matching object in the API.
                this.setState({countryResults: this.state.countryResults.concat(editedStateArray)})
            }
          })
        })
    }

    getCountryName() {
        CountryManager.getCountry(this.state.countryCode)
        .then(country => {
        console.log("country name", country)
          this.setState({
            country: country.data[this.state.countryCode].name,
            countryCode: country.data[this.state.countryCode].iso_alpha2
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

    updateItinerary = () => {
        console.log("country code state", this.state.countryCode)
        console.log("updated itinerary name", this.state.itineraryName)
        this.setState({ loadingStatus: true });
        const editedItinerary = {
          itineraryName: this.state.itineraryName,
          itineraryDate: this.state.itineraryDate,
          note: this.state.note,
          userId: this.state.userId
        };
        console.log("country state", this.state.itineraryId)
      ItineraryManager.update(this.state.itineraryId, editedItinerary)
      // Call the itinerary manager and create new relationship object to capture country data on a new join table in database.
      .then(() => {
        this.state.countryResults.forEach(country => {
          let editedCountryItinerary = {
            itineraryId: this.state.itineraryId,
            countryCode: country.iso_alpha2,
            countryName: country.name,
          }
          console.log("edited country itinerary", editedCountryItinerary)
          ItineraryCountryManager.update(this.state.relatedCountry, editedCountryItinerary)
        })
      })
      .then(() => this.getData())
      .then(() => this.props.history.push("/"))
    }

    componentDidMount() {
      let newStateArray = [];
      let newState = {};
      ItineraryManager.get(this.props.match.params.itineraryId)
      .then(itinerary => {
          console.log("itinerary name changes to:", itinerary.itineraryName)
          console.log("itinerary manager", itinerary)
          this.setState({
            itineraryId: itinerary.id,
            itineraryName: itinerary.itineraryName,
            itineraryDate: itinerary.itineraryDate,
            note: itinerary.note,
            userId: itinerary.userId,
            loadingStatus: false
          });
      })
      .then(() => {
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
              <button type="button" onClick={() => {
                {this.handleCountrySearch(this.state.country)}
              }}>Add Country to Itinerary</button>
              {
              this.state.countryResults.map(newCountry => (
                <CountryCard
                    country={newCountry}
                    key={newCountry.iso_alpha2}
                />
                ))
              }
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
                onClick={() => {
                  {this.updateItinerary()}
                }}
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
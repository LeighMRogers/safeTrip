import React, { Component } from "react"
import ItineraryManager from "../../modules/ItineraryManager"
import CountryManager from '../../modules/CountryManager'
import ItineraryCountryManager from '../../modules/ItineraryCountryManager'
import CountryCard from '../countries/CountryCard'
import "react-datepicker/dist/react-datepicker.css";

class ItineraryEditForm extends Component {
    //set the initial state
    state = {
        countryResults: [],
        searchResults: [],
        itineraryId: "",
        itineraryName: "",
        startDate: "",
        endDate: "",
        countrySearch: "",
        relatedCountryId: "", //get rid of this after lunch!
        note:"",
        userId: "",
        countryCode: null,
        country: "",
        loadingStatus: true,
        formType: true
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
                this.setState({searchResults: this.state.searchResults.concat(editedStateArray)})
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

    handleDelete = (event) => {
      // if country is in the countryResults Array, delete from itineraryCountries in JSON
      if (this.state.countryResults.some(country => country.iso_alpha2 === event.target.id)) {
        console.log("delete is true")
        ItineraryCountryManager.delete(this.state.relatedCountryId)
      .then(() => this.getNewCountryData());
      // if country is in the SearchResults array, remove from searchResults in state.
      } else if (this.state.searchResults.some(country => country.iso_alpha2 === event.target.id)) {
        let newStateArray = this.state.searchResults.filter(country => country.iso_alpha2 !== event.target.id)
        this.setState({searchResults: newStateArray})
      }
    }

    getNewCountryData = () => {
      let newStateArray = [];
      let newState = {};
      ItineraryCountryManager.getRelated(this.props.match.params.itineraryId)
      .then((relatedCountries) => {
      let promiseArray = relatedCountries.map(relatedCountry => {
      return CountryManager.getCountry(relatedCountry.countryCode)
      .then(country => {
        this.setState({relatedCountryId: relatedCountry.id})
        newStateArray.push(country.data[relatedCountry.countryCode]);
        })
      })
      Promise.all(promiseArray).then(() => {
        newState.countryResults = newStateArray
        this.setState(newState)
      })
    })
    }

    getData = () => {
		let userId = this.props.getUser()
		ItineraryManager.getAll(userId).then(itineraries => {
			this.setState({
				itineraries: itineraries,
				userId: userId
			});
		});
	};

    updateItinerary = (evt) => {
      console.log("update itinerary called!")
      evt.preventDefault();
        const editedItinerary = {
          itineraryName: this.state.itineraryName,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          note: this.state.note,
          userId: this.state.userId
        };
      ItineraryManager.update(this.props.match.params.itineraryId, editedItinerary)
      .then(() => {
          // loop through countryResults with forEach and call the CountryManager.getCountry. For each country, check to see if it's in the database. If country is NOT in countryItinerary, then add it.
          this.state.searchResults.forEach((searchedCountry) => {
            if (!this.state.countryResults.includes(searchedCountry)) {
              let newCountryItinerary = {
                itineraryId: this.props.match.params.itineraryId,
                countryCode: searchedCountry.iso_alpha2,
                countryName: searchedCountry.name
              }
              ItineraryCountryManager.post(newCountryItinerary)
            }
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
        newState.itineraryName = itinerary.itineraryName
        newState.startDate = itinerary.startDate
        newState.endDate = itinerary.endDate
        newState.note = itinerary.note
        newState.userId = this.props.getUser()
        newState.loadingStatus = false

      })
        ItineraryCountryManager.getRelated(this.props.match.params.itineraryId)
        .then((relatedCountries) => {
        let promiseArray = relatedCountries.map(relatedCountry => {
        return CountryManager.getCountry(relatedCountry.countryCode)
        .then(country => {
          this.setState({relatedCountryId: relatedCountry.id})
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
        <>
        <div className="form-group">
          <form>
            <fieldset>
              <div className="formgrid">
                <h3>Edit Itinerary</h3>
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
                    className="form-control"
                    required
                    onChange={this.handleFieldChange}
                    id="startDate"
                    placeholder="Select start range"
                    value={this.state.startDate}

                />
                <input
                    type="date"
                    className="form-control"
                    required
                    onChange={this.handleFieldChange}
                    id="endDate"
                    placeholder="Select end date"
                    value={this.state.endDate}
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
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {{this.handleCountrySearch(this.state.country)}}}>Add Country to Itinerary</button>
                {
                this.state.searchResults.map(newCountry => (
                  <CountryCard
                      formType={this.state.formType}
                      country={newCountry}
                      key={newCountry.iso_alpha2}
                      handleDelete={this.handleDelete}
                  />
                  ))
                }
                {
                this.state.countryResults.map(newCountry => (
                  <CountryCard
                      formType={this.state.formType}
                      country={newCountry}
                      key={newCountry.iso_alpha2}
                      relatedCountryId={this.state.relatedCountryId}
                      getNewCountryData={this.getNewCountryData}
                      handleDelete={this.handleDelete}
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
                  onClick={(evt) => {{this.updateItinerary(evt)}}}
                  className="btn btn-primary"
                >Update Itinerary</button>
              </div>
            </fieldset>
          </form>
        </div>
        </>
      );
    }
  }

export default ItineraryEditForm
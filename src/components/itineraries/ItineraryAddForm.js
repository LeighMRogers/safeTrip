import React, { Component } from 'react';
import ItineraryManager from '../../modules/ItineraryManager';
import CountryManager from '../../modules/CountryManager'
import CountryCard from '../countries/CountryCard'
import ItineraryCountryManager from '../../modules/ItineraryCountryManager'


const userObj = sessionStorage.getItem("credentials")
class ItinararyAddForm extends Component {
    state = {
        countryResults: [],
        itineraryName: "",
        startDate: "",
        endDate: "",
        countrySearch: "",
        note:"",
        userId: "",
        relatedCountryId: "",
        countryCode: null,
        country: "",
        loadingStatus: true,
        formType: false
    }

    handleCountrySearch = searchTerm => {
        let newStateArray = [];
        CountryManager.getAllCountries()
        .then((allCountries) => {
          Object.keys(allCountries.data).forEach((key) => {
            if (allCountries.data[key].name === searchTerm) {
                //pushes the country object to the newStateArray array.
                newStateArray.push(allCountries.data[key])
                //this sets the state of the searched countries and finds its matching object in the API.
                this.setState({countryResults: this.state.countryResults.concat(newStateArray)})
            }
          })
        })
      }

    getCountryName() {
        CountryManager.getCountry(this.state.countryCode.iso_alpha2)
        .then(country => {
          this.setState({
            country: country.data[this.state.countryCode.iso_alpha2].name
          });
        })
      }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create itinarary object, invoke the ItineraryManager post method, and redirect to the full animal list
    */
    addNewItinerary = evt => {
        evt.preventDefault();
        if (this.state.itineraryName === "" || this.state.startDate === "" || this.state.endDate === "") {
            window.alert("Please input an itinerary name and dates");
        } else {
            this.setState({ loadingStatus: true });
            const itinerary = {
                itineraryName: this.state.itineraryName,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                note: this.state.note,
                userId: parseInt(this.props.user)
            };
            console.log("brand new itinerary obj", this.props.user)

            // Call the itinerary manager and create new relationship object to capture country data on a new join table in database.
            ItineraryManager.post(itinerary)
            .then((createdItinerary) => {
                this.state.countryResults.forEach(country => {
                    let newCountryItinerary = {
                        itineraryId: createdItinerary.id,
                        countryCode: country.iso_alpha2,
                        countryName: country.name
                    }
                    ItineraryCountryManager.post(newCountryItinerary)
                })
            })
            .then(() => this.props.getData())
            .then(() => this.props.history.push("/"));
            document.querySelector("#itineraryName").value = "";
            document.querySelector("#startDate").value = "";
            document.querySelector("#endDate").value = "";
            document.querySelector("#countrySearch").value = "";
            document.querySelector("#note").value = "";
        }
    };

    render(){

        return(
            <>
            <form>
                <h3>Add Itinerary</h3>
                <fieldset>
                    <div className="formgrid">
                        <input
                            className="form-control"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="itineraryName"
                            placeholder="Itinerary name"
                        />
                        <label>Start Date</label>
                        <input
                            className="form-control"
                            type="date"
                            required
                            onChange={this.handleFieldChange}
                            id="startDate"
                            placeholder="Select start range"
                        />
                        <label>End Date</label>
                        <input
                            className="form-control"
                            type="date"
                            required
                            onChange={this.handleFieldChange}
                            id="endDate"
                            placeholder="Select end date"
                        />
                        <input
                            className="form-control"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="countrySearch"
                            placeholder="Search Countries"
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.handleCountrySearch(this.state.countrySearch)}>Add Country to Itinerary</button>
                        {
                            this.state.countryResults.length > 0 ?
                            this.state.countryResults.map(newCountry => (
                            <CountryCard
                                formType={this.state.formType}
                                country={newCountry}
                                key={newCountry.countryCode}
                            />
                            ))
                            : null
                        }
                        <input
                            className="form-control"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="note"
                            placeholder="Add an itinerary note"
                        />
                    </div>
                    <div className="alignRight">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this.addNewItinerary}>Add Itinerary
                        </button>
                    </div>
                </fieldset>
            </form>
        </>
        )
    }
}

export default ItinararyAddForm
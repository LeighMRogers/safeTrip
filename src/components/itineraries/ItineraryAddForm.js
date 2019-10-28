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
        itineraryDate: "",
        countrySearch: "",
        note:"",
        userId: "",
        countryCode: null,
        country: "",
        loadingStatus: true,
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
        if (this.state.itineraryName === "" || this.state.itineraryDate === "") {
            window.alert("Please input an itinerary name and date");
        } else {
            this.setState({ loadingStatus: true });
            const itinerary = {
                itineraryName: this.state.itineraryName,
                itineraryDate: this.state.itineraryDate,
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
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="itineraryName"
                        placeholder="Itinerary name"
                        />
                        <input
                        type="date"
                        required
                        onChange={this.handleFieldChange}
                        id="itineraryDate"
                        placeholder="Date"
                        />
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="countrySearch"
                        placeholder="Search Countries"
                        />
                        <button type="button" onClick={() => this.handleCountrySearch(this.state.countrySearch)}>Add Country to Itinerary</button>
                        {
                            this.state.countryResults.length > 0 ?
                            this.state.countryResults.map(newCountry => (
                            <CountryCard
                                country={newCountry}
                                key={newCountry.countryCode}
                            />
                            ))
                            : null
                        }
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="note"
                        placeholder="Add an itinerary note"
                        />
                    </div>
                    <div className="alignRight">
                        <button
                        type="button"
                        onClick={this.addNewItinerary}
                        >Add Itinerary</button>
                    </div>
                </fieldset>
            </form>
        </>
        )
    }
}

export default ItinararyAddForm
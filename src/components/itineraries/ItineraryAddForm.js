import React, { Component } from 'react';
import ItineraryManager from '../../modules/ItineraryManager';
import CountryManager from '../../modules/CountryManager'

const userObj = sessionStorage.getItem("credentials")
class ItinararyAddForm extends Component {
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
                this.setState({countryCode: allCountries.data[key]})
            }
          })
        })
        .then(() => {
            this.getCountryName();
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
                countryCode: this.state.countryCode.iso_alpha2,
                country: this.state.country,
                note: this.state.note,
                userId: parseInt(this.props.user)
            };
            console.log("brand new itinerary obj", this.props.user)

            // Create the employee and redirect user to employee list
            ItineraryManager.post(itinerary)
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
                        <button type="button" onClick={() => this.handleCountrySearch(this.state.countrySearch)}>Find All Countries</button>
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
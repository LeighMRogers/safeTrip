import React, { Component } from 'react';
import ItineraryCountryManager from '../../modules/ItineraryCountryManager';
import "../../App.css"

class CountryCard extends Component {

  state = {
    formType: ""
  }

  cardDisplay = () => {
    if (this.props.country.advisory.score < 3) {
      return ("greenCard")
    } else if (this.props.country.advisory.score >= 3 && this.props.country.advisory.score < 5) {
      return ("yellowCard")
    } else if (this.props.country.advisory.score === 5) {
      return ("redCard")
    }
  }

  componentDidMount = () => {
    this.setState({formType: this.props.formType})
  }
  handleDelete = () => {
    ItineraryCountryManager.delete(this.props.relatedCountryId)
    .then(() => this.props.getNewCountryData());
  }

  render() {
    return (
      <section className="card">
        <div id={this.cardDisplay()}>
          <div className="card-content">
            <h3 className="card-header"><span> {this.props.country.name}</span></h3>
            <div className="card-body">
              <h4>Advisory Score: {this.props.country.advisory.score}</h4>
              { this.props.country.advisory.message !== "" ?
                <p>Advisory Message: {this.props.country.advisory.message}</p>
                : <p>There is currently not an advisory message for {this.props.country.name}</p>
              }
              <p>Last Updated: {this.props.country.advisory.updated}</p>
              { this.state.formType ?
                <button type="button" onClick={() => this.handleDelete()}>Delete Country</button>
                : ""
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CountryCard;
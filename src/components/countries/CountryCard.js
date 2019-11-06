import React, { Component } from 'react';
import "../../App.css"
import moment from 'moment'

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
              <p>Last Updated: {moment(this.props.country.advisory.updated).fromNow()}</p>
              { this.state.formType ?
                <button
                  className="btn btn-light"
                  type="button"
                  id={this.props.country.iso_alpha2}
                  onClick={(event) => this.props.handleDelete(event)}>Delete Country</button>
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
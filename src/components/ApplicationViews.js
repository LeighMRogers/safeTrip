import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import ItineraryList from './itineraries/ItineraryList'
import ItineraryDetails from './itineraries/ItineraryDetails'
import ItineraryEditForm from './itineraries/ItineraryEditForm'
import CountryCard from './countries/CountryCard'

class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    return <ItineraryList
                        user={this.props.userId}
                        {...props}
                        getUser={this.props.getUser}/>
                }} />
                <Route exact path="/:itineraryId(\d+)" render={(props) => {
                    return <ItineraryDetails
                        itineraryId={parseInt(props.match.params.itineraryId)} 
                        {...props} />
                }} />
                <Route path="/:itineraryId(\d+)/edit" render={props => {
                    return <ItineraryEditForm {...props} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews
import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import ItineraryList from './itineraries/ItineraryList'
import Login from './auth/Login'
import Register from './auth/Register'
import About from './about/About'
import ItineraryDetails from './itineraries/ItineraryDetails'

class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    return <ItineraryList user={this.props.userId}{...props}/>
                }} />
                <Route exact path="/login" render={props => {
                    return <Login user={this.props.userId}{...props}/>
                }} />
                <Route exact path="/register" render={props => {
                    return <Register user={this.props.userId} {...props}/>
                }} />
                <Route exact path="/about" render={props => {
                    return <About user={this.props.userId} {...props}/>
                }} />
                <Route exact path="/:itineraryId(\d+)" render={(props) => {
                    return <ItineraryDetails itineraryId={parseInt(props.match.params.itineraryId)} {...props} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews
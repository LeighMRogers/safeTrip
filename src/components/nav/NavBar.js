import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Nav } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css";


class NavBar extends Component {

    handleLogout = () => {
        this.props.clearUser();
    }

    render() {
        return (
            <Nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">Safe Trip</Link>
                {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                        <Link className="nav-link" to="/">My Itineraries <span className="sr-only">(current)</span></Link>
                    {(this.props.user) ?
                        <Link className="nav-link" to="/login">Login</Link>
                        : null}
                        <>
                        {/* <Link className="nav-link" to="/about">About</Link> */}
                        <span className="nav-link" onClick={this.handleLogout}>Logout</span>
                        </>
                {/* </div> */}
            </Nav>
        )
    }
}

export default NavBar

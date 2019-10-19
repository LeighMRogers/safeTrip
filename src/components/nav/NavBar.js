import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import AuthManager from '../../modules/AuthManager';

class NavBar extends Component {

    handleLogout = () => {
        this.props.clearUser();
        // this.props.history.push('/');
    }

    render() {
        return (
            <header>
                <h1 className="titlePage">Safe Trip<br />
                </h1>
            <nav>
                <ul className="container">
                    <li><Link className="nav-link" to="/">Itinerary List</Link></li>
                    {(this.props.user) ?
                    <li><Link className="nav-link" to="/login">Login</Link></li>
                    : null}
                    <>
                    <li><Link className="nav-link" to="/about">About</Link></li>
                    <li><span className="nav-link" onClick={this.handleLogout}>Logout</span></li>
                    </>
                </ul>
            </nav>
            </header>
        )
    }
}

export default NavBar
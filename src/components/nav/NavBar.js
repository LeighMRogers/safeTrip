import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Nav } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css";


class NavBar extends Component {

    handleLogout = () => {
        this.props.clearUser();
    }

    render() {
        return (
            // <header>
            //     <h1 className="logo">Safe Trip</h1>
            //     <nav className="navContainer">
            //         <ul className="navList">
            //             <li><Link className="nav-link" to="/">Itinerary List</Link></li>
            //             {(this.props.user) ?
            //             <li><Link className="nav-link" to="/login">Login</Link></li>
            //             : null}
            //             <>
            //             <li><Link className="nav-link" to="/about">About</Link></li>
            //             <li><span className="nav-link" onClick={this.handleLogout}>Logout</span></li>
            //             </>
            //         </ul>
            //     </nav>
            // </header>

            <Nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Safe Trip</Link>
                {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    {(this.props.user) ?
                        <Link className="nav-link" to="/login">Login</Link>
                        : null}
                        <>
                        <Link className="nav-link" to="/about">About</Link>
                        <span className="nav-link" onClick={this.handleLogout}>Logout</span>
                        </>
                {/* </div> */}
            </Nav>
        )
    }
}

export default NavBar

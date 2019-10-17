import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return(
            <>
            <h1>Nav Bar</h1>
            {/* <nav>
                <ul className='nav'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/about'>
                            <button className='navBtn'>About</button>
                        </Link>
                    </li>
                </ul>
            </nav> */}
            </>
        )
    }
}

export default withRouter(NavBar)
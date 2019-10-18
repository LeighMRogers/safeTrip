import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import AuthManager from '../../modules/AuthManager';

class NavBar extends Component {

    state = {
		userName: ''
	};

	handleLogout = () => {
		this.props.clearUser();
		this.props.history.push('/');
	};

	componentDidMount() {
		AuthManager.getUserById(this.props.activeUser).then(data => {
			this.setState({
				userName: data.name
			});
		});
	}

    render() {
        return(
            <>
            <h1>Nav Bar</h1>
            <nav>
                <ul className='nav'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/about'>About</Link></li>
                    <li><Link className='logout' to='/login'>Logout</Link>
                    </li>
                </ul>
            </nav>
            </>
        )
    }
}

export default withRouter(NavBar)
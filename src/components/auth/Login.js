import React, { Component } from 'react';
// import Register from '../auth/Register';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    // Set initial state
	state = {
		userName: '',
		password: '',
		hideReg: true
	};

	showLogin = () => {
		this.setState({ hideReg: false });
	};

	hideReg = () => {
		this.setState({ hideReg: true });
	};

    // Update state whenever an input field is edited
	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	// handleLogin = e => {
	// 	e.preventDefault();
	// 	let userName = this.state.userName;
	// 	let password = this.state.password;
	// 	AuthManager.getUser(userName).then(response => {
	// 		if (response.length === 0) {
	// 			alert('Please enter a valid User Name.');
	// 		} else if (response.length === 1 && response[0].password !== password) {
	// 			alert('Password is incorrect, please try again.');
	// 			// starting the if statement to check for empty fields//
	// 		} else if (password === '') {
	// 			alert('Please fill the Password Form');
	// 		} else if (userName === '') {
	// 			alert('Please enter a valid email address');
	// 		} else if (response[0].password === password) {
	// 			//response[0].id is the ID of the user you logged in with,
	// 			//in case of "Steve" it would be "1"
	// 			this.props.setUser(response[0].id);
	// 			this.props.history.push(`/`);
	// 		}
	// 	});
	// };

    render() {
        console.log("is the log in form triggered")
        return (
          <form onSubmit={this.handleLogin}>
            <fieldset>
                <h3>Please sign in</h3>
                <div className="formgrid">
                    <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="Email address"
                        required="" autoFocus="" />
                    <label htmlFor="inputEmail">Email address</label>
                    <input onChange={this.handleFieldChange} type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                    <label htmlFor="inputPassword">Password</label>
                </div>
                <button type="submit">
                    Sign in
                </button>
            </fieldset>
          </form>
        )
      }
}

export default withRouter(Login);

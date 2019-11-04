import React, { Component } from 'react';
import AuthManager from '../../modules/AuthManager';
import { Form } from 'reactstrap'

class Login extends Component {
	// Set initial state
	state = {
		userName: '',
		password: '',
        // hideReg: true
	};

	// showLogin = () => {
	// 	this.setState({ hideReg: false });
	// };

	// hideReg = () => {
	// 	this.setState({ hideReg: true });
	// };

	// Update state whenever an input field is edited
	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log("handling login field change", this.handleFieldChange)
	};

	handleLogin = (e) => {
        console.log("login button has been clicked")
        e.preventDefault()
        AuthManager.getUserData("users").then((users) => {
            let singleUser = users.find(
                user =>
                    user.password.toLowerCase() === this.state.password.toLowerCase() &&
                    user.userName.toLowerCase() === this.state.userName.toLowerCase()
            );
            console.log(singleUser);
            if (this.state.userName === "") {
                window.alert("Please enter user name")
            } else if (this.state.password === "") {
                window.alert("Please enter password")
            } else if (singleUser) {
                this.props.setUser(singleUser);
            } else {
                window.alert("User name and password do not match")
            }
        })
        console.log("handling login", this.handleLogin)
    }

	render() {
        return (
            <>
            <section className="login-body">
            <div className="form-group">
                <div className="login-container">
                    <h3 className="logRegTitle">Login</h3>
                    <Form onSubmit={this.handleLogin}>
                        <input onChange={this.handleFieldChange}
                            className="form-control"
                            required=""
                            autoFocus=""
                            placeholder="User name"
                            name="username"
                            id="userName"/>
                        <input onChange={this.handleFieldChange}
                            className="form-control"
                            type="password"
                            required=""
                            name="password"
                            id="password"
                            placeholder="Password" />
                        <button className="btn btn-primary" type="submit">Log In</button>
                    </Form>
                </div>
             </div>
             </section>
            </>
        );
    }
}

export default Login;
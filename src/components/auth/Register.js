import React, { Component } from 'react';
import AuthManager from '../../modules/AuthManager';

class Register extends Component {

    // Set initial state
    state = {
      name: "",
      userName: "",
      password: "",
      email: ""
    };

    handleFieldChange = (event) => {
      const stateToChange = {}
      stateToChange[event.target.id] = event.target.value
      this.setState(stateToChange)
      console.log("handling registration field change", this.handleFieldChange)
    }

    handleRegister = (e) => {
      e.preventDefault()
      AuthManager.getUserData().then((users) => {
        let validate = users.find(user => user.email.toLowerCase() === this.state.email.toLowerCase())

        if (this.state.name === "") {
          window.alert("Please enter a name")
        } else if (this.state.email === "") {
          window.alert("Please enter an email address")
        } else if (this.state.password === "") {
          window.alert("Please enter a password")
        } else if (validate) {
          window.alert("Email address already exists")
        } else {
          let newUser = {
            name: this.state.name,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
          };
          console.log("new user obj", newUser)
          AuthManager.createUser(newUser)
            .then((createdUser) => {
              //This determines which page you land on upon registration
              this.props.setUser(createdUser)
              console.log("created user", createdUser)
            }
            )
        }
      }
      )
      console.log("handling registration", this.handleRegister)
    }

    render() {
      console.log("registration return")
      return (
        <>
          <div className="logRegForm">
            <h3 className="logRegTitle">Register</h3>
            <form onSubmit={this.handleRegister}>
                <input onChange={this.handleFieldChange} type="name"
                  id="name"
                  placeholder="Name"
                  required="" autoFocus="" />
                <input onChange={this.handleFieldChange}
                  id="userName"
                  placeholder="User name"
                  required="" autoFocus="" />
                <input onChange={this.handleFieldChange} type="email"
                  id="email"
                  placeholder="Email address"
                  required="" autoFocus="" />
                <input onChange={this.handleFieldChange} type="password"
                  id="password"
                  placeholder="Password"
                  required="" />
              <button className="submit" type="submit">Register</button>
            </form>
          </div>
        </>
      )
    }
  }
  export default Register;
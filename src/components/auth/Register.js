import React, { Component } from 'react';
import AuthManager from '../../modules/AuthManager';
import { Form } from "reactstrap"

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
      return (
        <>
          <section className="register-body">
          <div className="form-group">
            <div className="register-container">
              <h3 className="logRegTitle">Register</h3>
              <Form onSubmit={this.handleRegister}>
                  <input onChange={this.handleFieldChange}
                    className="form-control"
                    type="name"
                    id="name"
                    placeholder="Name"
                    required="" autoFocus="" />
                  <input onChange={this.handleFieldChange}
                    className="form-control"
                    id="userName"
                    placeholder="User name"
                    required="" autoFocus="" />
                  <input onChange={this.handleFieldChange}
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="Email address"
                    required="" autoFocus="" />
                  <input onChange={this.handleFieldChange}
                    className="form-control"
                    type="password"
                    id="password"
                    placeholder="Password"
                    required="" />
                <button className="btn btn-primary" type="submit">Register</button>
              </Form>
              </div>
          </div>
          </section>
        </>
      )
    }
  }
  export default Register;
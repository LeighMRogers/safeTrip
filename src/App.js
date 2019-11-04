import React, { Component } from "react";
import ApplicationViews from "../src/components/ApplicationViews";
import NavBar from "./components/nav/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/about/About"
import "./App.css"

class App extends Component {
  state = {
    user: false
  }
  // Check if credentials are in session storage
  //returns true/false
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  getUser = () => {
    return sessionStorage.getItem("credentials")
  }

  setUser = (authObj) => {
    /*
      For now, just store the email and password that
      the customer enters into local storage.
    */
    sessionStorage.setItem(
      "credentials",
      JSON.stringify(authObj.id)
    )
    this.setState({
      user: this.isAuthenticated()
    });
    console.log("auth object", authObj)
  }

  clearUser = () => {
    sessionStorage.clear()
    this.setState({
      user: this.isAuthenticated()
    });
  }
  componentDidMount() {
    this.setState({
      user: this.isAuthenticated()
    })
  }

  render() {
    return (
      <React.Fragment>
      {(this.state.user) ?
      <>
        <NavBar clearUser={this.clearUser} />
        <ApplicationViews getUser={this.getUser}/>
      </>
      :<>
       <div className="logRegContainer">
        <About />
        <div className="landing-form-flex">
          <Login setUser={this.setUser}/>
          <Register setUser={this.setUser} />
        </div>
       </div>
      </>}
      </React.Fragment>
    );
  }
}

export default App;
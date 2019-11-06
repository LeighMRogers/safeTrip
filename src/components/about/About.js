import React, { Component } from 'react';


class About extends Component {
    render() {
		return (
            <>
            <section className="about-container">
                  <h1 className="loginLogo">Safe Trip</h1>
                  <div className="airplane">
                        <img
                              src="/images/plane-icon.svg"
                              alt="airplane icon"
                              height="auto"
                              width="150px"/>
                  </div>
                  <div className="about-text">
                        <p>An app for global travelers to create itineraries that automatically display the latest real-time travel advisories on any country.</p>
                  </div>
            </section>
            </>
		);
	}
}

export default About
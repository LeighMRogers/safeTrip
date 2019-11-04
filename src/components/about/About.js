import React, { Component } from 'react';


class About extends Component {
    render() {
		return (
            <>
            <section className="about-body">
                  <section className="about-container">
                        <h1 className="loginLogo">Safe Trip</h1>
                        <div className="airplane">
                              <img
                                    src="/images/plane-icon.svg"
                                    alt="airplane icon"
                                    height="auto"
                                    width="150px"/>
                        </div>
                        <p>An app for global travelers to create itineraries that automatically display the latest real-time travel advisories on any country.</p>
                  </section>
            </section>
            </>
		);
	}
}

export default About
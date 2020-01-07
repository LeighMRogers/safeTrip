# Safe Trip: An App for Travelers

### Creator
Leigh Rogers, Nashville Software School Front-End Capstone

## Project Overview

After a natural or human-made disaster, humanitarian aid workers often provide relief or development to people in some of the most unstable and unsafe places in the world, often at the last minute. Because of these challenges, they often lack access to information they need to keep themselves and their aid recipients safe. Casual tourists also want to stay safe in a foreign country or research the safety of a country as they plan travel.

To solve these issues, this app provides users with real-time travel advisories for any country. It also seeks to serve as a portal for creating itineraries for trips that include country advisories. These itineraries are postable, editable, and deletable.

## Challenge Statement

How might we inform global travelers of country-specific safety advisories during trip planning and travel?

## Research Plan

Part of my design process is researching what a typical user has already at their disposal to answer the problem this product is trying to solve. That includes outlining goals of the project based on user experience:

![Capstone Initial Wireframe](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/CapstoneResearch1.jpg)

### Users and Customers

The ideal user would be any of the following:

* Aid Workers
* Photojournalists
* Adventurous Travelers
* Government workers
* Businesspeople
* Students

### Resources

Users would use the following to research safety information on a particular country:

* Phones
* Computers
* Handwritten notes
* Travel magazines
* Newspapers
* Institutions, like government, educational, or programmatic organizations that specialize in international travel
* People who are from or who have been to a particular region before

### Environments

Discovery of country-specific research can happen anywhere, but the primary locations a user would search for country-specific travel content and trip planning would be:

1. At home, in advance of travel during trip-planning process.
2. In country, to investigate updated travel advisories dependent on situations on the ground.

These two contexts helped influence the app's functionality and design needs. For example, at home, a user would likely be researching travel itineraries on a desktop computer, and in country it would likely be on a mobile device. Since mobile is an ever-growing primary digital interface, I made sure Safe Trip had a "mobile first" design, but still had good usability on a desktop.

### Competition/Inspiration

* US State Department's [Smart Traveler App](https://apps.apple.com/us/app/smart-traveler/id442693988)
* [Guidebook App](https://guidebook.com)

## Personas

Creating this app always stemmed from my background working at global aid organizations, and the first types of people I thought of who would likely need and use a tool like Safe Trip are my colleagues who did the hard work of traveling overseas to places most would say are too dangerous, not typical tourist destinations, but where people go anyway after a disaster strikes. Two types of people I knew would need an app like this were aid workers and photographers capturing images of the work on the ground.

![Safe Trip App Persona Aid Worker](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/MargotCapstonePersona.png)

![Safe Trip App Persona Photojournalist](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/PaulJeffreyPersona.png)

## Journey Map

![Capstone Mockup](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/SafeTripJourneyMap.jpg)

## Mockups

![Capstone Mockup](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/capstoneWireframe1.jpg)

![Capstone Mockup](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/capstoneWireframe2.jpg)

## Ideation and Usability Testing

When conceptualizing the app, I wanted to ensure I was creating something that would have a clear purpose and serve a current need. I polled former colleagues at a relief organization and they validated the need for a travel app that builds itineraries with recurringly updated country advisories.

Later, I sent images of lo-fi mockups to them. Their main feedback: Searching for countries was within the context of building itineraries, so having a separate country search was redundant. Upon development, I made sure the calls to action were clear: create itineraries and add countries to them, not the other way around.

## Design system

Safe Trip uses [Reactstrap](https://reactstrap.github.io/) as its design foundations for styling forms, cards, input fields, and buttons. This app purposely does not incorporate too many design elements like icons, illustrations, modals, color palettes, or typefaces because they were not missed during user testing.

### Color palette
The main design color palette consists of Google-like look/feel from Reactstrap: their "Primary" color of blue, light gray, and white. All interactive elements have this color scheme in order to make user interaction as seamless and distractionless as possible.

![My Itineraries](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/SafeTripMyItineraries.png)

![Itinerary Cards](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/SafeTripItineraryCards.png)

There are some other colors to appear on the app:

A light blue navigation and airplane logo symbolize the blue skies of air travel.

![Safe Trip Landing Page](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/SafeTripLanding.png)

On country details, country cards are colored based on the advisory score: less than a score of 3 is green, 3 or greater but less than 5 is yellow, and 5 is red. For each color I selected a lightly saturated version so viewing these stark colors is easier on the eye.

![Country Details Green](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/SafeTripCountryDetailsGreen.png)

![Edit Form](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/SafeTripEditFormYellow.png)

![Country Details Red](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/SafeTripCountryDetailsRed.png)

### Typography
The feature font for the logo was [Racing Sans One](https://fonts.google.com/specimen/Racing+Sans+One), and the body font is a basic sans-serif. I used these particular fonts because

* Racing Sans One represented a font that was on the move, like a traveler, with its forward-angled italics.
* A sans-serif font is perfect for readability and legibility, especially smaller text.

### How to Run this App

#### Follow these steps exactly

1. `clone` this repository.
2. `cd` into the directory it creates.
3. Make a `database.json` file in the `api` directory.
4. Run `npm install` and wait for all dependencies to be installed.
5. Run `npm start` to verify that installation was successful.

### Entity Relationship Diagram

Below outlines the relationship between entities in the app:

![Safe Trip App ERD](https://github.com/LeighMRogers/safe-trip-capstone/blob/master/public/images/Front-EndCapstoneUpdated.png "Safe Trip App ERD")

import React, { Component } from 'react';
// import ItineraryManager from '../../modules/ItineraryManager';
// import ItineraryCard from './ItineraryCard';
// import ItineraryAddForm from '../itineraries/ItineraryAddForm';

class ItineraryList extends Component {
	//define what this component needs to render
	state = {
		itineraries: []
	};

	// componentDidMount() {
	// 	this.getData();
	// }

	// getData = () => {
	// 	ItineraryManager.getItineraries(this.props.activeUser).then(itineraries => {
	// 		this.setState({
	// 			itineraries: itineraries
	// 		});
	// 	});
	// };

	render() {
		return (
            <h1>ItineraryList</h1>
			// <div className='mainContainer'>
			// 	<div className='sectionHeader'>
			// 		<h1>NEWS</h1>

			// 		<AddItineraryForm getData={this.getData} />
			// 	</div>
			// 	{this.state.itineraries.map(itinerary => (
			// 		<ItineraryCard
			// 			key={itinerary.id}
			// 			itinerary={itinerary}
			// 			{...this.props}
			// 			getData={this.getData}
			// 		/>
			// 	))}
			// </div>
		);
	}
}

export default ItineraryList;

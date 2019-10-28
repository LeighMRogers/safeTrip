import React, { Component } from 'react';
import ItineraryManager from '../../modules/ItineraryManager';
import ItineraryCard from './ItineraryCard';
import ItineraryAddForm from '../itineraries/ItineraryAddForm';

class ItineraryList extends Component {
	//define what this component needs to render
	state = {
		itineraries: [],
		user: ""
	};

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		let userId = this.props.getUser()
		ItineraryManager.getAll(userId).then(itineraries => {
			this.setState({
				itineraries: itineraries,
				user: userId
			});
		});
	};

	render() {
		return (
            <>
			<div className='mainContainer'>
				<div className='sectionHeader'>
					<h1>Itineraries</h1>

                    <ItineraryAddForm
                        getData={this.getData}
						{...this.props}
						user={this.state.user} />
				</div>
				{this.state.itineraries.map(itinerary => (
					<ItineraryCard
                        key={itinerary.id}
                        itineraryId={itinerary.id}
						itinerary={itinerary}
						{...this.props}
						getData={this.getData}
					/>
				))}
			</div>
            </>
		);
	}
}

export default ItineraryList;

import React, { Component } from 'react';
import { Consumer } from '../../Context.js';
import House from './House.js'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Forbidden from '../layout/Forbidden'

class MyHouses extends Component {

	constructor() {
		super();
		// currentUser: { }
	}
	render() {
		return (
			<Consumer>
				{value => {
					const { HouseList, currentUser } = value;
					// CHECK USER LOGIN OR NOT
					//  nested objects - and by default user detail store at index [0]
					if (currentUser.length === 0) {
						return (
							<Forbidden />
						);
					} else {
						// const myHouses = HouseList.filter((house)=>{
						//     house.user == value["currentUser"][0].user);
						// Someone help me to do this by map and filter
						const myHouses = [];
						let i = 0;
						for (i = 0; i < HouseList.length; i++) {
							if (HouseList[i].user === value["currentUser"][0].user_id) {
								myHouses.push(HouseList[i]);
							}
						}
						return (
							<React.Fragment>
								<h1>My Houses</h1>
								<Link to="/addHouse">
									<Button
										variant="raised" color="primary">Add Property
                  </Button>
								</Link>
								<div className="row">
									{myHouses.map(house => (
										<House key={house.id}
											houseDetail={house}
											value={value}
											myHouses={myHouses}>
										</House>
									))}
								</div>
							</React.Fragment>
						);
					}
				}
				}
			</Consumer>
		);
	}
}
export default MyHouses;

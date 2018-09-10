import React, { Component } from 'react'
import axios from 'axios'
import Booking from './Booking'
import moment from 'moment'

class MyBookings extends Component {

	constructor() {
		super();
		this.state = {
			currentUser: {},
			myBookings: [],
			futureStay: [], //bookings that not checkin yet
			currentStay: [], // still in the accomm
			pastStay: [], // already check in
			earliestBooking: {}
		}
	}

	getBookings = (userID, bookingList) => {
		let res = [];
		for (let i = 0; i < bookingList.length; i++) {
			if (userID === bookingList[i].booker) {
				res.push(bookingList[i]);
			}
		}
		this.setState({ myBookings: res });
	}

	// separate future, past, current booking into diffent array and set state
	separateFutureCurrentPast = () => {
		let tempFutureStay = [], tempCurrentStay = [], tempPastStay = [];
		let now = moment();
		const { myBookings, futureStay } = this.state;
		for (let i = 0; i < myBookings.length; i++) {
			if (now.isBefore(moment(myBookings[i].date_start))) {
				tempFutureStay.push(myBookings[i]);
			}
			if (now.isAfter(moment(myBookings[i].date_start) && now.isBefore(myBookings[i].date_start))) {
				tempCurrentStay.push(myBookings[i]);
			}
			if (now.isAfter(moment(myBookings[i].date_end))) {
				tempPastStay.push(myBookings[i]);
			}
		}

		if (futureStay.length === 0 && tempFutureStay.length > 0) {
			const earliestBooking = this.findEarliest(tempFutureStay);
			this.setState({
				futureStay: tempFutureStay,
				currentStay: tempCurrentStay,
				pastStay: tempPastStay,
				earliestBooking: earliestBooking
			})
		}
	}

	// find min start date in the bookings
	findEarliest = (dates) => {
		let earliestBookingTime = moment(dates[0].date_start).diff(moment());
		let earliestBooking;
		for (let i = 0; i < dates.length; i++) {
			let diff = moment(dates[i].date_start).diff(moment(), 'minutes');
			if (diff < earliestBookingTime) {
				earliestBooking = dates[i];
			}
		}
		return earliestBooking;
	}

	async componentDidMount() {
		localStorage.getItem('currentUser')
			&& this.setState({
				currentUser: JSON.parse(localStorage.getItem('currentUser'))
			});;

		// Get all bookings and find that current user booked
		const res2 = await axios.get('https://localhost:8000/booking/');
		this.getBookings(this.state.currentUser[0].user_id, res2.data);
		this.separateFutureCurrentPast();
	}
	render() {
		const { myBookings, futureStay, currentStay, pastStay, earliestBooking } = this.state;

		return (
			<React.Fragment>
				<center><h1>Next Stay</h1></center>
				<div>
					<center>
						{futureStay.length !== 0 ?
							<Booking key={earliestBooking.id} booking={earliestBooking}></Booking>
							: <h1>There is not future bookings</h1>
						}
					</center>
				</div>
				<center><h1>Incoming</h1></center>
				<div className="row">
					{futureStay.length !== 0 ?
						futureStay.map((booking) => {
							return (
								<div key={booking.id} style={{ padding: '1rem' }}>
									<Booking key={booking.id} booking={booking} futureStay={futureStay} pastStay={pastStay} currentStay={currentStay} earliestBooking={earliestBooking}></Booking>
								</div>
							);
						})
						: <h1>There is not future bookings</h1>
					}
				</div>

				<div className="row">
					{currentStay.length !== 0 ?
						<h1>Current</h1>
						: null
					}
				</div>

				<div className="row">
					{pastStay.length !== 0 ?
						<h1>Past</h1>
						: null
					}
				</div>
				<center><h1> All My Bookings</h1></center>
				<div className="row">
					{myBookings.map((booking) => {
						return (
							<div key={booking.id} style={{ padding: '1rem' }}>
								<Booking key={booking.id} booking={booking} futureStay={futureStay} pastStay={pastStay} currentStay={currentStay} ></Booking>
							</div>
						);
					})}
				</div>
			</React.Fragment>
		);
	}
}

export default MyBookings;
import React, { Component } from 'react'
import axios from 'axios'
import Booking from './Booking'
import moment from 'moment'
// import Popup from "reactjs-popup";

import '../../Styles/Popup.css'

import isEmpty from '../../utils/isEmpty.js';

// Rating
// import Rating from 'react-rating'
// import like from '../../assets/img/icons/like.png'
// import like_empty from '../../assets/img/icons/like_empty.png'

class MyBookings extends Component {

	constructor() {
		super();
		this.state = {
			currentUser: {},
			myBookings: [],
			futureStay: [], //bookings that not checkin yet
			currentStay: [], // still in the accomm
			pastStay: [], // already check in
			earliestBooking: {},
			requireReviewList : []
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
			if (diff < earliestBookingTime) earliestBooking = dates[i];
		}
		return earliestBooking;
	}

	requireReview = async (pastStay) => {
		let isReviewed = false,
				tempRequireReviewList = [],
				tempPastStay = [];

		const { requireReviewList } = this.state,
					// { booking } = this.props,
					currentUser = JSON.parse(localStorage.getItem('currentUser'));

		// const accommodationIDs = [];
		for( let i = 0; i < pastStay.length; i++){
			const res = await axios.get(`https://localhost:8000/accommodationHosting/${pastStay[i].hosting}/`);
			pastStay[i].accommodation = res.data.accommodation;
			tempPastStay.push(pastStay[i]);
		}
		console.log("TEMPAST STAY: ", tempPastStay);
		for(let i = 0; i < tempPastStay.length; i++){
			let reviews = [];
			await axios.get(`https://localhost:8000/accommodation/${tempPastStay[i].accommodation}/reviews/`)
												.then( response => {
													reviews = response.data
												})
												.catch(error => {
													reviews = [];
												})


			for(let j = 0; j < reviews.length; j++){
				// console.log("CP: ", tempPastStay[i].accommodation, reviews[j].accommodation)
				if(tempPastStay[i].accommodation === reviews[j].accommodation && tempPastStay[i].id === reviews[j].booking && reviews[j].user === currentUser[0].user_id){
					// tempRequireReviewList.push(tempPastStay[i]);
					isReviewed = true;
				}
			}
			if(isReviewed === false){
				tempRequireReviewList.push(tempPastStay[i]);
				console.log("ADDDD: ", tempPastStay[i]);
			}
			else {isReviewed = false;}
		}

		console.log("TEMEEEE: ", tempRequireReviewList);
		tempRequireReviewList = tempRequireReviewList.concat(requireReviewList);
		this.setState({requireReviewList: tempRequireReviewList})
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
		this.requireReview(this.state.pastStay);
	}
	render() {
		const { myBookings, futureStay, currentStay, pastStay, earliestBooking, currentUser, requireReviewList } = this.state;
		// this.getReviewRequiredList(pastStay);
		return (
			<React.Fragment>
				<center>
					{!isEmpty(earliestBooking) ?
						<div>
							<center><h1>Next Stay</h1></center>
							<Booking key={earliestBooking.id} booking={earliestBooking}></Booking>
						</div>
						: null
					}
				</center>
				<center>
					{!isEmpty(pastStay[0]) ?
						<div key={pastStay[0].id}>
							<center><h1>Recent Stay</h1></center>
							<Booking key={pastStay[0].id} booking={pastStay[0]} requireReviewItem={requireReviewList[0]}></Booking>
						</div>
						: null
					}
				</center>
				{futureStay.length !== 0 ? <center><h1>Incoming</h1></center> : null}
				<div className="row">
					{futureStay.length !== 0 ?
						futureStay.map((booking) => {
							return (
								<div key={booking.id}>
									<div style={{ padding: '1rem' }}>
										<center>
											<Booking key={booking.id} booking={booking}  earliestBooking={earliestBooking}></Booking>
										</center>
									</div>
								</div>
							);
						})
						: null
					}
				</div>
				<div className="row">
					{currentStay.length !== 0 ?
						<h1>Current</h1>
						: null
					}
				</div>

				{pastStay.length !== 0 ? <center><h1>In The Past</h1></center> : null}
				<div className="row">
					{pastStay.length !== 0 ?
						pastStay.map((booking) => {
							return (
								<div key={booking.id}>
									<div key={booking.id} style={{ padding: '1rem' }}>
										<center>
											<Booking key={booking.id} booking={booking}></Booking>
										</center>
									</div>
								</div>
							);
						})
						: null
					}
				</div>
				<center><h1>All Bookings</h1></center>
				<div className="row">
					{myBookings.length !== 0 ?
						myBookings.map((booking) => {
							return (
								<div key={booking.id} style={{ padding: '1rem' }}>
									<center>
										<Booking key={booking.id} booking={booking} pastStay={pastStay} currentUser={currentUser}></Booking>
									</center>
								</div>
							);
						})
					: <p>You have not booked any accommodation with us</p>
					}
				</div>
			</React.Fragment>
		);
	}
}
export default MyBookings;
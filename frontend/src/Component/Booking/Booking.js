import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../Context.js';
import { withStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardMedia, CardActions } from '../../../node_modules/@material-ui/core'

import Card from "Component/Card/Card.jsx";
import CardBody from "Component/Card/CardBody.jsx";
import CardHeader from "Component/Card/CardHeader.jsx";
import CardFooter from "Component/Card/CardFooter.jsx";
import carouselStyle from "assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx";
import Carousel from "react-slick";
// import {Link} from 'react-router-dom'
import moment from 'moment'
import AllHosting from '../Function/AllHosting.js';

// Pop up
import Popup from "reactjs-popup";

// Rating
import Rating from 'react-rating'
import like from '../../assets/img/icons/like.png'
import like_empty from '../../assets/img/icons/like_empty.png'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

let settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
};

class Booking extends Component {

    constructor(){
				super();
				this.state = {
					images: [],
					currentAccommodationID : -1,
					requireReviewList : []
				}
    }

    handleDelete = async (id) => {
        await axios.delete(`https://localhost:8000/booking/${id}/`);
        alert("Delete successfully - reload page");
    }

// find this accomm's images
	findImagesByAccommID = (images, accommID)=> {
		const retImages = [];
		for( let i = 0; i < images.length; i++){
			if(accommID === images[i].accommodation){
				retImages.push(images[i]);
			}
		}
		return retImages;
	}

	requireReview = async () => {
		let user_id,
				isReviewed = false,
				tempRequireReviewList = [];
		const { currentAccommodationID, requireReviewList } = this.state,
					{ booking } = this.props,
					currentUser = JSON.parse(localStorage.getItem('currentUser')),
					res = await axios.get(`https://localhost:8000/accommodation/${currentAccommodationID}/reviews/`),
					reviews = res.data;
		if( currentUser !== null &&  currentUser.length > 0 ){
			user_id = currentUser[0].user_id;
		}
		console.log("REVIEW LiST: ", reviews);

		for(let i = 0; i < reviews.length; i++){
			if(reviews[i].user === currentUser[0].user_id && reviews.accommodation === currentAccommodationID){
				isReviewed = true;
			}
		}
		if(isReviewed === false){
			tempRequireReviewList.push(booking);
			tempRequireReviewList = tempRequireReviewList.concat(requireReviewList);
			this.setState({requireReviewList: tempRequireReviewList})
		}
		console.log("this state: ", this.state);
	}

	async componentDidMount(){
		console.log("Props: ", this.props.booking);
		const { booking, pastStay, isPast } = this.props,
					hosting = booking.hosting;
		const res = await axios.get(`https://localhost:8000/accommodationHosting/${hosting}/`);
		const accommID = res.data.accommodation;
		this.setState({currentAccommodationID: accommID});
		let images = await axios.get(`https://localhost:8000/accommodationImage/`);
		console.log("images: ", images.data);
		images = this.findImagesByAccommID(images.data, accommID);
		this.setState({images:images});
		if(isPast === true) this.requireReview();
	}

	render() {
		let {daysLeft, hoursLeft, minutesLeft} = 0;
		const { images, requireReviewList } = this.state,
					{ classes, booking, isPast } = this.props,
					{ id, date_start, date_end, note } = booking;

		daysLeft = Math.abs(moment(date_start).diff(moment(), 'hours'))/24;
		hoursLeft = Math.abs((daysLeft - Math.round(daysLeft))) * 24;
		daysLeft = Math.round(daysLeft);

		if(hoursLeft > 1){
			minutesLeft = Math.round(Math.abs((Math.round(hoursLeft) - hoursLeft ))) * 60;
		}
		else{
			minutesLeft = Math.round(hoursLeft * 60);
			hoursLeft = 0;
		}
		hoursLeft = Math.round(hoursLeft);

		let imagesDiv = [];
		images.map((image) => {
			imagesDiv.push(
					<div key={image.id}>
						<img src={image.a_image} height="150" width="345"/>
					</div>
			)
		})
		return (
			<React.Fragment>
			<center>
		{isPast === true && requireReviewList.length > 0 ?
			<Popup modal closeOnDocumentClick open={true}>
				{close => (
					<div>
					<h3>Please give us review for your trip from {requireReviewList[0].date_start} to {requireReviewList[0].date_end}</h3>
					<Rating
						// readonly={readonly}
						initialRating={5}
						emptySymbol={<img src={like_empty} className="icon" />}
						fullSymbol={<img src={like} className="icon" />}
					/>
					<form>
						<label>Review</label>
						<input />
						<button className="button"
						>Send Review</button>
					</form>
					<button className="button" onClick={() => {
								console.log('modal closed ')
								close()
							}}
					>No, Thanks</button>
					</div>
				)}

			</Popup>
			: null
		}
		</center>
		<Card product className={classes.cardHover} style={{width:'20vw', height:'25vw'}}>
			<CardHeader style={{marginBottom: '-5rem'}}image className={classes.cardHeaderHover}>
				<Carousel {...settings} dots={false}>
				{ images.length !== 0 ?
					imagesDiv
				:
				<div>
					<img src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg" height="150" width="345"/>
				</div>
				}
				</Carousel>
			</CardHeader>
			<CardBody>
				<div className={classes.cardHoverUnder}>
					<Typography gutterBottom variant="headline" component="h2">
						From: {date_start}
					</Typography>
					<Typography gutterBottom variant="headline" component="p">
						To: {date_end}
					</Typography>
					<Typography gutterBottom variant="headline" component="p">
						Note: {note}
					</Typography>
					{daysLeft >= 0?
						<p>You stay will start in {daysLeft} days {hoursLeft} hours {minutesLeft} minutes</p>
					:null
					}
					<div style={{float:'right'}}>
						<Button onClick={this.handleEdit}>
							<i className="fas fa-pencil-alt" style={{cursor:'pointer', float:'right',color:'black'}}></i>
						</Button>
						<Button onClick={this.handleDelete.bind(this, id)}>
							<i  className="fas fa-times" style={{cursor:'pointer', float:'right',color:'red'}}/>
						</Button>
					</div>
				</div>
			</CardBody>
			</Card>
		</React.Fragment>
		);
	}
}
export default withStyles(carouselStyle)(Booking);

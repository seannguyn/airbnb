import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'

// Material UI
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Card from "../card/Card.jsx"
import CardBody from "../card/CardBody.jsx"
import CardHeader from "../card/CardHeader.jsx"

// Images Slider
import carouselStyle from "../../assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx"
import Carousel from "react-slick"

// check empty object
import isEmpty from '../../utililty/isEmpty.js'
// import {Link} from 'react-router-dom'

import FormDialog from '../popup/FormDialog'

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

class Booking extends Component {

  handleDelete = async (id) => {
    await axios.delete(`/booking/${id}/`);
    alert("Delete successfully - reload page");
  };

  handleEdit = () => {
  };
  handlePayment = () => {
  };

  // find this accomm's images
  findImagesByAccommID = (images, accommID) => {
    const retImages = [];
    for (let i = 0; i < images.length; i++) {
      if (accommID === images[i].accommodation) {
        retImages.push(images[i]);
      }
    }
    return retImages;
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currentAccommodationID: -1,
    }
  }

  componentDidMount() {
    const {booking, /*pastStay, isPast*/} = this.props;
    const hosting = booking.hosting;

    const res = axios.get(`/accommodationHosting/${hosting}/`);
    const accommID = res.data.accommodation;

    this.setState({currentAccommodationID: accommID});
    let images = axios.get(`https://localhost:8000/accommodationImage/`);

    images = this.findImagesByAccommID(images.data, accommID);
    this.setState({images: images});
  }

  render() {
    let {daysLeft, hoursLeft, minutesLeft} = 0;
    const {images} = this.state,
      {classes, booking, requireReviewItem} = this.props,
      {id, date_start, date_end, note} = booking;

    daysLeft = Math.abs(moment(date_start).diff(moment(), 'hours')) / 24;
    hoursLeft = Math.abs((daysLeft - Math.round(daysLeft))) * 24;
    daysLeft = Math.round(daysLeft);

    if (hoursLeft > 1) {
      minutesLeft = Math.round(Math.abs((Math.round(hoursLeft) - hoursLeft))) * 60;
    } else {
      minutesLeft = Math.round(hoursLeft * 60);
      hoursLeft = 0;
    }
    hoursLeft = Math.round(hoursLeft);

    const imagesDiv = images.map((image) =>
        <div key={image.id}>
          <img src={image.a_image} height="150" width="345" alt="house"/>
        </div>
    );

    return (
      <React.Fragment>
        <center>
          {!isEmpty(requireReviewItem) ?
            <FormDialog requireReviewItem={requireReviewItem}/>
            : null
          }
        </center>
        <Card product className={classes.cardHover} style={{width: '20vw', height: '25vw'}}>

          <CardHeader style={{marginBottom: '-5rem'}} image className={classes.cardHeaderHover}>
            <Carousel {...settings} dots={false}>
              {images.length !== 0 ?
                imagesDiv
                :
                <div>
                  <img src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg"
                       height="150" width="345" alt="house"/>
                </div>
              }
            </Carousel>
          </CardHeader>

          <CardBody>
            <div className={classes.cardHoverUnder}>
              <Typography gutterBottom variant="headline" component="h2">From: {date_start}</Typography>
              <Typography gutterBottom variant="headline" component="p">To: {date_end}</Typography>
              <Typography gutterBottom variant="headline" component="p">Note: {note}</Typography>
              {daysLeft >= 0 ?
                <p>You stay will start in {daysLeft} days {hoursLeft} hours {minutesLeft} minutes</p>
                : null
              }

              <div style={{float: 'right'}}>
                <Button onClick={this.handleEdit}>
                  <i className="fas fa-pencil-alt" style={{cursor: 'pointer', float: 'right', color: 'black'}}/>
                </Button>
                <Button onClick={this.handleDelete.bind(this, id)}>
                  <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}}/>
                </Button>
                <Button variant="contained" color="primary" onClick={this.handlePayment}>
                  Pay
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
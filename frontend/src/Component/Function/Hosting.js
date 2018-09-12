import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Review from '../Review/Review';

import { withStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';

import '../../Styles/ImageSlide.css';
// core components
import Button from "Component/CustomButtons/Button.jsx";

import Card from "Component/Card/Card.jsx";
import CardBody from "Component/Card/CardBody.jsx";
import CardHeader from "Component/Card/CardHeader.jsx";
import CardFooter from "Component/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import carouselStyle from "assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx";
import Carousel from "react-slick";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
};

class Hosting extends React.Component {

  constructor() {
    super();
    this.state = {
      showHosting: false,
      reviews: {},
      seeReviews: false,
      id: '',
      images: [],
    }

  }

  handleExpand() {
    this.setState({showHosting : !this.state.showHosting})
  }

  starCalculator(reviews){
    let avgRating = 0;

    for(let key in reviews){
      if(reviews.hasOwnProperty(key)){
        avgRating = avgRating + reviews[key].star;
      }
    }

    return avgRating/reviews.length;
  }

  showReview = () => {
    this.setState({seeReviews: !this.state.seeReviews});
  }

  // find this accomm's images
  findImagesByAccommID = (images, accommID)=> {
    const retImages = [];
    for( let i = 0; i < images.length; i++){
      if(accommID === images[i].accommodation){
        retImages.push(images[i]);
      }
    }
    this.setState({images: retImages});
  }

  async componentDidMount  () {
    // console.log(this.props.house.id," pamramm")
    // this.setState({id: this.props.match.params})
    const {id} = this.props.house;
    let reviews, err;
    await axios.get(`https://localhost:8000/accommodation/${id}/reviews/`)
                .then(
                    response => {
                      reviews = response.data
                    }
                ).catch(
                  error => {
                    err = error.response;
                  }
                )

    if(err == null && reviews.length > 0)
      this.setState({reviews:reviews});

    const images = await axios.get('https://localhost:8000/accommodationImage/');
    this.findImagesByAccommID(images.data, this.props.house.id);
  }

  render () {
    // console.log('PROPS ', this.props);
    const readonly = true,
          {house, SingleHost} = this.props,
          {id} = this.props.house,
          {showHosting, images, reviews} = this.state,
          avgRating =  this.starCalculator(reviews),
          { classes} = this.props;

    let Rating = require('react-rating');

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    };

    let imagesDiv = [];
    images.map( (image) => {
      imagesDiv.push(
          <div key={image.id}>
            <img src={image.a_image} height="150" width="345"/>
          </div>
      )

    })
    // console.log("STATE: ", this.state);
    return (
      <div style={{padding:"1rem"}}>
        <Card product className={classes.cardHover} style={{width:'20vw', height:'22vw'}}>
          <CardHeader style={{marginBottom: '0rem'}}image className={classes.cardHeaderHover}>
          <Carousel {...settings} dots={false}>
          { images.length !== 0 ?
            imagesDiv
          :
          <div>
              <img src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg" height="150" width="345"/>
          </div>
          }
          </Carousel>
          </CardHeader >
          <CardBody>
            <div className={classes.cardHoverUnder}>
            <Link to={`/accommodations/${id}`}>
              <h4 className={classes.cardProductTitle}>
                {house.addr_number}, {house.addr_street}, {house.addr_city}, {house.addr_state}
                <i onClick={this.handleExpand.bind(this)} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>
              </h4>
              </Link>
              {/* <p className={classes.cardProductDesciprion}> */}
              <h4>{house.Accomodation_Type}</h4>
            {reviews.length > 0 ?
            <div>
              <Rating
                readonly={readonly}
                initialRating={avgRating}
              />
              <Link to="" onClick={() => this.setState({seeReviews: !this.state.seeReviews})}>({reviews.length})</Link>
            </div>
            :
            <Rating
              readonly={readonly}
              initialRating={0}
            />
            }
            {this.state.seeReviews ?
              <CardContent>
              {reviews.map(review =>
                  <Review
                    key={review.id}
                    accommodation={review.accommodation}
                    star={review.star}
                    user={review.user}
                    review={review.review}
                    text='Close'
                    closeReview={this.showReview.bind(this)}
                />)}
              </CardContent>
              : null
            }
            </div>
          </CardBody>
          <CardFooter product>
              <div className={classes.price}>
                {/* <Typography gutterBottom variant="headline" component="h6"> */}
                  <h4>${SingleHost.price}/night</h4>
                {/* </Typography> */}
              </div>
          </CardFooter>
        </Card>

        {/* <Card className={classes.card} style={{}}> */}
            {/* <CardAvatar profile className={classes.cardAvatar}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg" alt="..." />
                  </a>
            </CardAvatar> */}
          {/* <CardActionArea> */}

            {/* <CardMedia src="ddd" img="ddd">
              <Slider {...settings}>
              { images.length !== 0 ?
                  imagesDiv
              :
                <img src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg" height="250" width="307" alt="nohouse"/>

              }
              </Slider>
            </CardMedia>
          {/* </CardActionArea> */}

            {/* <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {house.Accomodation_Type} ${SingleHost.price}/night
                </Typography>

                <Typography component="p">
                    {house.addr_number}, {house.addr_street}, {house.addr_city}, {house.addr_state}
                    <i onClick={this.handleExpand.bind(this)} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>
                  </Typography>
              </CardContent>

            {showHosting === true ?
              <ul className="list-group">
                <li className="list-group-item">start_date : {SingleHost.date_start}</li>
                <li className="list-group-item">end_date :  {SingleHost.date_end}</li>
                <li className="list-group-item">price :  {SingleHost.price}</li>
              </ul>
            : null}

            {reviews.length > 0 ?
            <CardContent>
              <Rating
                  readonly={readonly}
                  initialRating={avgRating}
              />
              <Link to="" onClick={() => this.setState({seeReviews: !this.state.seeReviews})}>({reviews.length})</Link>
              </CardContent>
            : <CardContent>
                <Rating
                  readonly={readonly}
                  initialRating={0}
              />
              </CardContent>
            }
            {this.state.seeReviews ?
              <CardContent>{
                reviews.map(review =>
                  <Review
                    key={review.id}
                    accommodation={review.accommodation}
                    star={review.star}
                    user={review.user}
                    review={review.review}
                    text='Close'
                    closeReview={this.showReview.bind(this)}
                />
                )
              }
                <button onClick={this.showReview.bind(this)}>Close</button>
              </CardContent>
              : null
            }
            <CardActions>
              <Link to={`/accommodations/${id}`}>
                <Button size="small" color="primary" onClick={this.seeRoomDetail}>
                  See more
                </Button>
              </Link>
            </CardActions>
        </Card> */}
      </div>
    )
  }
}

// export default withStyles(styles)(Hosting);
export default withStyles(dashboardStyle,carouselStyle)(Hosting);
import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import isAfterDay from './utils/isAfterDay';
import {Consumer} from '../../Context.js';
import BookingPaper from './BookingPaper'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReviewComponent from '../Review/ReviewComponent'
import GoogleMap from '../GoogleMap/GoogleMap'
// Image Slider
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import carouselStyle from "assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx";
import Carousel from "react-slick";
import '../../Styles/ImageSlide.css';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


class AccommodationDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            accomDetail: {},
            currentHost: {},

            bookedPeriods: [], //periods that this accomm booked to block the date
            minDateSet: [],
            minDate: {},
            status: 0,
        }
        setTimeout(() => {
            this.setState({
                status: 1
            });
        },1000);
    }

    // check if object is empty
    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    async componentDidMount(){
        this.setState({currentHost: this.props.accommodationHosting})
        this.setState({accomDetail: this.props.accommodation});
        // this.blockBookedPeriod(this.props.booking);
    }

    findMax(minDateSet) {
      var max = minDateSet[0];
      for (var i = 0; i < minDateSet.length ; i++) {
        if(isAfterDay(minDateSet[i],max) === true) {
            max = minDateSet[i].clone();
          }
      }
      return max;
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextState.status === 1) {
          this.props = nextProps;
          console.log("Should Component update", this.props, this.state);
          return true;
        } else {
          return false;
        }
    }


    render() {
        // console.log("props acom detail: ", this.state);
        const { classes } = this.props;
        // const {Accommodation_Type, area, bathroom,
        //         bedroom, bedroom_master, carpark, kitchen, description} = this.state.accomDetail;

        // IMAGES ======
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
        };

        // Map image in images array to div

        let imagesDiv = [];
        this.props.images.map( (image) => {
          imagesDiv.push(
              <div key={image.id}>
                <img src={image.a_image} height="150" width="345" alt="hostingimg"/>
              </div>
          )
          return 0;
        })
        console.log(imagesDiv,"IMG DIV");
        // IMAGES ======

        // const {currentHost} = this.state;
        const isDayBlocked = day => this.props.booking.filter(d => d.isSame(day, 'day')).length > 0;
        const {status} = this.state;
        console.log(this.props,"here it is",this.state);
        const {bathroom,bedroom,bed,title,description} = this.props.accommodation;
        return (
          <Consumer>
            {value =>{
              if (status === 0 ) {
                return(
                  <div>
                    <CircularProgress className={classes.progress} color="primary" size={50}/>
                  </div>
                )
              } else {
                return (
                  <div>
                    <img src="http://www.designdeveloprealize.com/wp-content/uploads/2018/03/high-resolution-house-photos-inside-high-resolution-house-pictures-house-interior.jpg" className="img-fluid" alt="Responsive" style={{width:'100%'}}/>

                    <div className="container">
                      <div className="row">
                      </div>
                      <div className="row">
                          <div className="col-8" style={{border:'2px solid blue'}}>
                              <div><h1>{title}</h1></div>
                              <div className="description">
                                  <h4>Description: {description}</h4>
                              </div>
                              <div className="row">
                                  <i className="fas fa-door-open"> {bedroom} bedrooms</i>&#160;
                                    <i className="fas fa-bed"> {bed} bed</i>&#160;
                                  <i className="fas fa-bath"> {bathroom} bathrooms</i>&#160;
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <Carousel {...settings} dots={false}>
                                  { this.props.images.length !== 0 ?
                                    imagesDiv
                                  :
                                  <div>
                                      <img src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg" height="150" width="345" alt="noimage"/>
                                  </div>
                                  }
                                  </Carousel>
                                </div>
                              </div>
                          </div>
                          <div className="col-4">
                              <div style={{paddingTop:'3rem'}}>
                                  <BookingPaper
                                    isDayBlocked={isDayBlocked}
                                    minDateSet={this.props.minDateSet}
                                    context={value}
                                    currentHost={this.props.accommodationHosting}
                                    history={this.props.history}
                                    accommodation={this.props.accommodation}
                                    />
                              </div>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-8" style={{border:'2px solid blue'}}>
                            <GoogleMap/>
                          </div>
                          <div className="col-4">

                          </div>
                      </div>
                      <div className="row">
                          <div className="col-8" style={{border:'2px solid blue'}}>
                            <ReviewComponent review={this.props.reviews}/>
                          </div>
                          <div className="col-4">
                          </div>
                      </div>
                    </div>
                  </div>
                 );
              }

            }}
          </Consumer>
        )
    }
}
export default withStyles(styles,carouselStyle,dashboardStyle)(AccommodationDetail);

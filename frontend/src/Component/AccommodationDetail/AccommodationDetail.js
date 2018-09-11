import React, { Component } from 'react';
import axios from 'axios';
import 'react-dates/initialize';
// import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
// import Button from '@material-ui/core/Button';
// import isBeforeDay from './utils/isBeforeDay'
import isAfterDay from './utils/isAfterDay';
import {Consumer} from '../../Context.js';
import BookingPaper from './BookingPaper'

import {
	// withStyles,
	// MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"


const theme = createMuiTheme({
	palette: {
		primary: green
	}
});


class AccommodationDetail extends Component {

    constructor(){
        super()
        this.state = {
            accomDetail: {},
            currentHost: {},

            bookedPeriods: [], //periods that this accomm booked to block the date
            minDateSet: [],
            minDate: {},
            allBookings: [],
        }
    }

    // check if object is empty
    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    // get host for this accomodation
    getAccommHost = (accomID, allHosts) => {
        for( let i = 0; i < allHosts.length; i++ ){
            if( (allHosts[i].accommodation) === (accomID) ){
                return allHosts[i];
            }
        }
        return;
    }

    // find dates between 2 dates
    datesInPeriod = (startDate, endDate) => {
        var dates = [];

        var currDate = startDate,
            lastDate  = endDate;
        dates.push(currDate.clone());
        while(currDate.add(1, 'days').diff(lastDate) < 0) {
            dates.push(currDate.clone());
        }
        dates.push(lastDate.clone());
        return dates;
    };

    // the calendar will block dates that been booked
    blockBookedPeriod = (bookingList) => {

        bookingList = this.getBookingsOfThisHosting(this.state.currentHost.id, bookingList);
        let startDate, endDate;
        let  currentPeriod = [];
        var tempBookedPeriods = this.state.bookedPeriods;
        var minDateSet;
        for( let i = 0; i < bookingList.length; i++){
            startDate = bookingList[i].date_start;
            endDate = bookingList[i].date_end;
            startDate = moment(startDate);
            endDate = moment(endDate);
            currentPeriod = this.datesInPeriod(startDate, endDate);

            tempBookedPeriods=tempBookedPeriods.concat(currentPeriod);
            minDateSet = this.state.minDateSet;
            minDateSet.push(currentPeriod[0]);
        }

        this.setState({minDateSet: minDateSet})
        // console.log(tempBookedPeriods,"booked period");
        // console.log(this.state.minDateSet,"min date");
        this.setState({bookedPeriods: tempBookedPeriods});
    }

    // get all the booking of this host
    getBookingsOfThisHosting = (hostingID, bookingList) => {
        let res = [];
        for( let i = 0; i < bookingList.length; i++){
            if(hostingID === bookingList[i].hosting){
                res.push(bookingList[i]);
            }
        }
        return res;
    }

    async componentDidMount(){
				// Get accommodation detail
				console.log("PROPS: ", this.props);
        const {id} = this.props.id;
        const res = await axios.get(`https://localhost:8000/accommodation/${id}/`);
        this.setState({accomDetail: res.data});

        // Get hosting detail
        const res1 = await axios.get(`https://localhost:8000/accommodationHosting/`);
        const currentHost = this.getAccommHost(this.state.accomDetail.id, res1.data);
        this.setState({currentHost: currentHost});

        // Get all bookings and find the bookings related to this accommodation
        const res2 = await axios.get('https://localhost:8000/booking/');
        // console.log(res2.data,"booked period axio");
        this.blockBookedPeriod(res2.data);
        console.log("user: ...",this.props);
        // const res3 = await axios.get('https://localhost:8000/accommodationImage/');
        // console.log("IMAGES: ", res3.data);
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

    render() {
        // console.log("props acom detail: ", this.state);
        console.log("BOKIGPREID: ", this.state.bookedPeriods);
        const {Accommodation_Type, area, bathroom,
                bedroom, bedroom_master, carpark, kitchen, description} = this.state.accomDetail;

        const isDayBlocked = day => this.state.bookedPeriods.filter(d => d.isSame(day, 'day')).length > 0;
        return (
          <Consumer>
            {value =>{
              const {dispatch, currentUser} = value;
              return (
                  <div>
                    <div className="row">
                      <div className="col-md-12">
                        <img src="https://cdn.photographylife.com/wp-content/uploads/2010/04/20100415-Dead-Horse-Point-040.jpg" className="img-fluid" alt="Responsive image"/>
                      </div>
                    </div>
                      <div className="row">
                          <div className="col-md-8">
                              <div><h1>House Name Here</h1></div>
                              <div className="description">
                                  <h4>Description: {description}</h4>
                              </div>
                              <div className="row">
                                  <i className="fas fa-bed"> {bedroom} bedrooms</i>&#160;
                                  <i className="fas fa-bath"> {bathroom} bathrooms</i>&#160;
                                  <i className="fas fa-utensils"> {kitchen} kitchens</i>&#160;
                                  <i className="fas fa-car"> {carpark} carparks</i>&#160;
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div style={{paddingTop:'3rem'}}>
                                  <BookingPaper
                                    isDayBlocked={isDayBlocked}
                                    minDateSet={this.state.minDateSet}
                                    context={value}
                                    currentHost={this.state.currentHost}
                                    history={this.props.history}
                                    />
                              </div>
                          </div>
                      </div>

                    </div>
               );
            }}
          </Consumer>
        )
    }
}
export default AccommodationDetail;

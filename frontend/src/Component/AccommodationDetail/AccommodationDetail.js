import React, { Component } from 'react';
import axios from 'axios';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import {
    // withStyles,
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";


// import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";


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
            currentUser: {},

            bookedPeriods: [], //periods that this accomm booked to block the date

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

    handleBooking = async () => {

        if(this.isEmpty(this.state.currentUser) === true){
            this.props.history.push('/login');
        }
        else{
            let startDate = this.state.startDate;
            let endDate = this.state.endDate;

            let tempStartDate = moment(startDate).format('YYYY-MM-DD');
            let tempEndDate = moment(endDate).format('YYYY-MM-DD');

            const {currentHost, currentUser} = this.state;
            const currentUserID = currentUser[0].user_id;
            const currentHostID = currentHost.id;
            const note = 'hello';
            const newBooking = {
                hosting: currentHostID,
                booker: currentUserID,
                date_start: tempStartDate,
                date_end: tempEndDate,
                note
            }

            await axios.post('https://localhost:8000/booking/', newBooking);
            console.log("SUCCESSFully Booking");

            const bookedPeriods = this.state.bookedPeriods.concat(this.datesInPeriod(startDate, endDate));
            this.setState({bookedPeriods : bookedPeriods});
        }

    }

    checkValidPeriod = () => {

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
        let  currentPeriod = []
        for( let i = 0; i < bookingList.length; i++){
            startDate = bookingList[i].date_start;
            endDate = bookingList[i].date_end;
            startDate = moment(startDate);
            endDate = moment(endDate);

            currentPeriod = this.datesInPeriod(startDate, endDate);

            const tempBookedPeriods = this.state.bookedPeriods.concat(currentPeriod);
            this.setState({bookedPeriods: tempBookedPeriods});
        }
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
        const {id} = this.props.match.params;
        const res = await axios.get(`https://localhost:8000/accommodation/${id}/`);
        this.setState({accomDetail: res.data});

        // Get hosting detail
        const res1 = await axios.get(`https://localhost:8000/accommodationHosting/`);
        const currentHost = this.getAccommHost(this.state.accomDetail.id, res1.data);
        this.setState({currentHost: currentHost});

        // Get all bookings and find the bookings related to this accommodation
        const res2 = await axios.get('https://localhost:8000/booking/');
        this.blockBookedPeriod(res2.data);

        // const res3 = await axios.get('https://localhost:8000/accommodationImage/');
        // console.log("IMAGES: ", res3.data);

        localStorage.getItem('currentUser')
            && this.setState({
            currentUser: JSON.parse(localStorage.getItem('currentUser'))});;
    }

    render() {
        // console.log("props acom detail: ", this.state);
        console.log("BOKIGPREID: ", this.state.bookedPeriods);
        const {Accommodation_Type, area, bathroom,
                bedroom, bedroom_master, carpark, kitchen, description} = this.state.accomDetail;

        const isDayBlocked = day => this.state.bookedPeriods.filter(d => d.isSame(day, 'day')).length > 0;

        return (
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
                            <h4>Choose Booking Period</h4>
                            <DateRangePicker
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                isDayBlocked = {isDayBlocked}
                                //  isOutsideRange={day => isAfterDay(day, moment())}
                                showClearDates={true}
                                reopenPickerOnClearDates
                                minimumNights = {2}
                            />
                            <div style={{paddingLeft:'15.3rem'}}>
                                <MuiThemeProvider theme={theme}>
                                    <Button type="submit" name="book" color="primary" variant="contained" onClick={this.handleBooking}>
                                        Book
                                    </Button>
                                </MuiThemeProvider>
                            </div>
                        </div>
                    </div>
                </div>


         );
    }
}
export default AccommodationDetail;
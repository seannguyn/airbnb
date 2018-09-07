import React, { Component } from 'react';
import axios from 'axios';
import Booking from './Booking';

class MyBookings extends Component {

    constructor(){
        super();
        this.state = {
            currentUser: {},
            myBookings: []
        }
    }

    getBookings = (userID, bookingList) => {
        let res = [];
        for( let i = 0; i < bookingList.length; i++){

            if(userID === bookingList[i].booker){
                res.push(bookingList[i]);
            }
        }

        this.setState({myBookings: res});
    }

    async componentDidMount(){

        localStorage.getItem('currentUser')
            && this.setState({
            currentUser: JSON.parse(localStorage.getItem('currentUser'))});;

        // Get all bookings and find that current user booked
        const res2 = await axios.get('https://localhost:8000/booking/');

        this.getBookings(this.state.currentUser[0].user_id, res2.data);

    }

    render() {
        const {myBookings} = this.state;

        return (
            <React.Fragment>
                <h1>My Bookings</h1>
                <div className="row">
                    {myBookings.map((booking) => {
                        return (
                            <Booking key={booking.id} booking={booking}></Booking>
                        );
                    })
                    }
                </div>
            </React.Fragment>
         );
    }
}

export default MyBookings;
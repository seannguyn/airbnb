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


    async componentDidMount(){

      const user = JSON.parse(localStorage.getItem('currentUser'))

      this.setState({currentUser: user});

        // Get all bookings and find that current user booked
        // const res2 = await axios.get('https://localhost:8000/booking/');
        // this.getBookings(this.state.currentUser[0].user_id, res2.data);

        const res2 = await axios.get(`https://localhost:8000/booking/?booker=${user[0].user_id}`);
        console.log("USER IS",user[0].user_id);
        this.setState({
          myBookings: res2.data
        })

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

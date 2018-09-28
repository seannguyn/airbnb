import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import SwipeableViews from "react-swipeable-views";

import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider';

import 'react-credit-cards/es/styles-compiled.css';

import Price from '../accomodation/Price'
import BookingInfo from '../booking/BookingInfo';
import Overview from '../booking/Overview';
import Days from '../booking/Days';
import Amenities from '../booking/Amenities';
import Reminder from '../booking/Reminder';


function TabContainer({children, dir}) {
  return (
    <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({});

class OverallBooking extends React.Component {

  state = {
    value: 0,
  };

  async postBooking(detail, booker) {
    const note = 'hello';

    console.log("THIS MOMENT", detail.paidDate);
    console.log("HOSSSSTING: ", detail.currentHost.id);
    console.log("booker: ", booker);
    console.log("detail: ", detail);
    console.log("Props: ", this.props);

    const newBooking = {
      booker: booker,
      hosting: detail.currentHost.id,
      date_start: detail.startDate,
      date_end: detail.endDate,
      date_paymentDue: detail.paidDate,
      isPaid: false,
      guest: detail.guest,
      note
    };

    const booking = await axios.post('https://localhost:8000/booking/', newBooking);
    console.log("SUCCESSFully Booking", booking.data);

    this.props.history.push({
      pathname: `/overallbooking/payment/${detail.currentHost.id}`,
      search: '?query=abc',
      state: {
        detail: detail,
        booker: booker,
        booking: booking.data,
      }
    })

  }


  render() {
    const {theme} = this.props;

    if (typeof this.props.location.state !== "undefined") {

      const {detail, booker} = this.props.location.state
      const price = (<Price
        pricePerNight={parseFloat(detail.price.pricePerNight)}
        daysDiff={parseFloat(detail.price.daysDiff)}
        promotion={parseFloat(detail.price.promotion)}
      />);

      return (
        <div>
          <AppBar position="static" color="default">
            <Tabs value={this.state.value} indicatorColor="primary" textColor="primary" fullWidth>
              <Tab label="Review Detail" icon={<CheckIcon hidden={this.state.value <= 0}/>}
                   disabled={this.state.value !== 0}/>
              <Tab label="Payment" icon={<CheckIcon hidden={this.state.value <= 1}/>}
                   disabled={this.state.value !== 1}/>
              <Tab label="Confirmation" disabled={this.state.value !== 2}/>
            </Tabs>
          </AppBar>
          <div className="container">
            <div className="row">
              <div className="col-8">
                <SwipeableViews>

                  <TabContainer dir={theme.direction}>
                    <Overview accommodation={detail.accommodation} guest={detail.guest}/>

                    <Divider/>
                    <Divider/>

                    <Days
                      daysDiff={detail.price.daysDiff}
                      city={detail.accommodation.addr_city}
                      startDate={detail.startDate}
                      endDate={detail.endDate}
                      checkIn={detail.currentHost.check_in}
                      checkOut={detail.currentHost.check_out}/>

                    <Divider/>
                    <Divider/>
                    <Amenities accommodation={detail.accommodation}/>

                    <Divider/>
                    <Divider/>

                    <Reminder/>

                    <Divider/>

                    <div className="row" style={{marginTop: '20px'}}>
                      <Button variant="contained" color="primary" onClick={this.postBooking.bind(this, detail, booker)}>Agree
                        and Continue</Button>
                    </div>


                  </TabContainer>
                </SwipeableViews>
              </div>
              <div className="col-4" style={{border: '3px solid green'}}>
                <BookingInfo
                  price={price}
                  detail={detail}
                />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <h1>Illegal to refresh</h1>
      )

    }

  }
}

export default withStyles(styles, {withTheme: true})(OverallBooking);

import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Switch, Route} from 'react-router-dom';
import NotFound from './NotFound'
import AllHostingContext from '../Contexts/AllHostingContext'
import ContextApi from '../Contexts/Context_api.js';
import AddHouseContext from '../Contexts/AddHouseContext.js';
import MyHouses from '../Function/MyHouses'
import MyBookings from '../Booking/MyBookings';
import AboutUs from '../AboutUs/AboutUs';
import AccommodationDetailContext from '../Contexts/AccommodationDetailContext';
import ReserveOverallBooking from '../Booking/ReserveOverallBooking'
import EditOverallBooking from '../Booking/EditOverallBooking'
import ConfirmOverallBooking from '../Booking/ConfirmOverallBooking'
import BookingRequest from '../BookingRequest/BookingRequest'
import { Map } from '../GoogleMap/Maps'

const styles = theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    width: "100%",
    height: "100%"
  }
});

class Main extends React.Component {
  render() {
    const { classes } = this.props

    return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={AllHostingContext}/>
              <Route exact path="/aboutus" component={AboutUs}/>
              <Route exact path="/myhouses" component={MyHouses}/>
              <Route exact path="/editHouse/:id" component={ContextApi}/>
              <Route exact path="/addHouse" component={AddHouseContext}/>

              <Route exact path="/accommodations/:id" component={AccommodationDetailContext}/>
              <Route exact path="/mybookings" component={MyBookings}/>
              <Route exact path="/overallbooking/reserve/:id" component={ReserveOverallBooking}/>
              <Route exact path="/overallbooking/payment/:id" component={EditOverallBooking}/>
              <Route exact path="/overallbooking/confirm/:id" component={ConfirmOverallBooking}/>

              <Route exact path="/bookingRequest" component={BookingRequest}/>

              <Route exact path="/map" component={Map}/>

              <Route component={NotFound}/>

          <Route exact path="/map" component={Map} />

          <Route component={NotFound} />
        </Switch>
      </main>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main)

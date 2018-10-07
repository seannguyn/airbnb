import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Map} from '../GoogleMap/Maps'
import {withStyles} from '@material-ui/core/styles'

import NotFound from './NotFound'
import AllHostingContext from '../Contexts/AllHostingContext'
import ContextApi from '../Contexts/Context_api.js'
import AddHouseContext from '../Contexts/AddHouseContext.js'
import AccommodationDetailContext from '../Contexts/AccommodationDetailContext'
import MyBookings from '../Booking/MyBookings'
import ReserveOverallBooking from '../Booking/ReserveOverallBooking'
import EditOverallBooking from '../Booking/EditOverallBooking'
import ConfirmOverallBooking from '../Booking/ConfirmOverallBooking'
import MyHouses from '../Function/MyHouses'


const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    width: '90%',
    height: '90%',
  },
});

class Main extends React.Component {
  render() {

    const {classes} = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
          <Route exact path="/" component={AllHostingContext}/>
          <Route exact path="/myhouses" component={MyHouses}/>
          <Route exact path="/editHouse/:id" component={ContextApi}/>
          <Route exact path="/addHouse" component={AddHouseContext}/>

          <Route exact path="/accommodations/:id" component={AccommodationDetailContext}/>
          <Route exact path="/mybookings" component={MyBookings}/>
          <Route exact path="/overallbooking/reserve/:id" component={ReserveOverallBooking}/>
          <Route exact path="/overallbooking/payment/:id" component={EditOverallBooking}/>
          <Route exact path="/overallbooking/confirm/:id" component={ConfirmOverallBooking}/>

          <Route exact path="/map" component={Map}/>

          <Route component={NotFound}/>
        </Switch>
      </main>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Main);

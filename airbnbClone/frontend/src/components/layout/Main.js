import React from 'react'
import {Switch, Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import NotFound from './NotFound'
import AllHostingContext from '../contexts/AllHostingContext'
import ContextApi from '../contexts/Context_api.js';
import AddHouseContext from '../contexts/AddHouseContext.js';
import MyHouses from '../functions/MyHouses'
import MyBookings from '../booking/MyBookings';
import AccommodationDetailContext from '../contexts/AccommodationDetailContext';
import ReserveOverallBooking from '../booking/ReserveOverallBooking'
import EditOverallBooking from '../booking/EditOverallBooking'
import ConfirmOverallBooking from '../booking/ConfirmOverallBooking'


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

    const {classes} = this.props

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
          <Route component={NotFound}/>
        </Switch>
      </main>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Main);

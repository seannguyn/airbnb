import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Map} from '../GoogleMap/Maps'
import {withStyles} from '@material-ui/core/styles'

import NotFound from './NotFound'

import AllHostingContext from '../Contexts/AllHostingContext'
<<<<<<< HEAD
import ContextApi from '../Contexts/Context_api.js'
import AddHouseContext from '../Contexts/AddHouseContext.js'
import AccommodationDetailContext from '../Contexts/AccommodationDetailContext'

import MyBookings from '../Booking/MyBookings'
=======
import ContextApi from '../Contexts/Context_api.js';
import AddHouseContext from '../Contexts/AddHouseContext.js';
import MyHouses from '../Function/MyHouses'
import MyBookings from '../Booking/MyBookings';
// import AccommodationDetail from '../AccommodationDetail/AccommodationDetail';
// import MyApp from '../Payment/paypal'
import AccommodationDetailContext from '../Contexts/AccommodationDetailContext';
>>>>>>> 842d408b6e1db33d0ba6ee3bb1382796030bab0d
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
<<<<<<< HEAD
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
=======

        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={AllHostingContext}></Route>
              <Route exact path="/myhouses" component={MyHouses}></Route>
              <Route exact path="/editHouse/:id" component={ContextApi}></Route>
              <Route exact path="/addHouse" component={AddHouseContext}></Route>

              <Route exact path="/accommodations/:id" component={AccommodationDetailContext}></Route>
              <Route exact path="/mybookings" component={MyBookings}></Route>
              <Route exact path="/overallbooking/reserve/:id" component={ReserveOverallBooking}></Route>
              <Route exact path="/overallbooking/payment/:id" component={EditOverallBooking}></Route>
              <Route exact path="/overallbooking/confirm/:id" component={ConfirmOverallBooking}></Route>

              <Route exact path="/map" component={Map}/>

              <Route component={NotFound}></Route>

            </Switch>
        </main>

>>>>>>> 842d408b6e1db33d0ba6ee3bb1382796030bab0d
    )
  }
}

export default withStyles(styles, {withTheme: true})(Main);

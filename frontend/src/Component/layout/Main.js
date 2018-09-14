import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NotFound from './NotFound'
import AllHostingContext from '../Contexts/AllHostingContext'
import ContextApi from '../Contexts/Context_api.js';
import AddHouseContext from '../Contexts/AddHouseContext.js';

import MyHouses from '../Function/MyHouses'
import MyBookings from '../Booking/MyBookings';
import AccommodationDetailContext from '../Contexts/AccommodationDetailContext';
import OverallBooking from '../Booking/OverallBooking'

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
    // position:'fixed',
    // margin:'0',
    // top:'0',
    // left:'0',

  },
});

class Main extends React.Component {
  render () {

    const {classes} = this.props

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={AllHostingContext}></Route>
            <Route exact path="/myhouses" component={MyHouses}></Route>
            <Route exact path="/editHouse/:id" component={ContextApi}></Route>
            <Route exact path="/addHouse" component={AddHouseContext}></Route>



            <Route exact path="/accommodations/:id" component={AccommodationDetailContext}></Route>
            <Route exact path="/mybookings" component={MyBookings}></Route>
            <Route exact path="/payment/:id" component={OverallBooking}></Route>
            <Route component={NotFound}></Route>

          </Switch>
      </main>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main);

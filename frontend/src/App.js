import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AddHouse from './Component/Function/AddHouse';
import Header from './Component/layout/Header';
import Sidebar from './Component/layout/Sidebar';
import MyHouses from './Component/Function/MyHouses';
import AddHosting from './Component/Function/AddHosting';

import {Provider} from './Context';
import ContextApi from './Component/Contexts/Context_api.js';
import AllHostingContext from './Component/Contexts/AllHostingContext';
import AddHouseContext from './Component/Contexts/AddHouseContext';
import EditHostingContext from './Component/Contexts/EditHostContext';
import AccommodationDetail from './Component/AccommodationDetail/AccommodationDetail';

import GuttersGrid from './Component/Grid/GridItem';
import Demo from './Component/Grid/GridItem';
import MyBookings from './Component/Booking/MyBookings';
import AppMain from './AppMain'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faBed, faBath, faDoorOpen, faUsers,
          faSwimmingPool, faDumbbell, faUtensils, faCar, faLaptop,
          faCreditCard, faCheck} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faStroopwafel, faBed, faBath, faDoorOpen, faUsers, faSwimmingPool, faDumbbell, faUtensils, faCar, faLaptop, faCreditCard, faCheck)

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <AppMain />
        </Router>
      </Provider>
    );
  }
}

export default App;

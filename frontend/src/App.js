import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from './Context';
import AppMain from './AppMain'
import { library } from '@fortawesome/fontawesome-svg-core'
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

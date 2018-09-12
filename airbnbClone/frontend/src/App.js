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

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
<<<<<<< HEAD:airbnbClone/frontend/src/App.js
          
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm">
                <Sidebar/>
              </div>

              <div className="col-md-10">
                <Switch>

                  {/* Router for authentication */}
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/registration" component={Registration}/>

                  {/* Router for accommodation/house */}
                  <Route exact path="/" component={AllHostingContext}/>
                  <Route exact path="/myhouses" component={MyHouses}/>
                  <Route exact path="/addHouse" component={AddHouseContext}/>
                  <Route exact path="/editHouse/:id" component={ContextApi}/>
                  <Route exact path="/hosting/:id" component={AddHosting}/>
                  <Route exact path="/edithosting/:id" component={EditHostingContext}/>
                  <Route exact path="/grid" component={Demo}/>

                </Switch>

              </div>
          </div>
        </div>
      
      </Router>
=======
          <AppMain />
        </Router>
>>>>>>> 0ab14986750935aabfc5c86264411f0d12022f4f:frontend/src/App.js
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Houses from './Component/Function/Houses';
import AddHouse from './Component/Function/AddHouse';
import Header from './Component/layout/Header';
import Sidebar from './Component/layout/Sidebar';
import Login from './Component/Authentication/Login';
import Registration from './Component/Authentication/Registration';
import MyHouses from './Component/Function/MyHouses';
import AddHosting from './Component/Function/AddHosting';

import {Provider} from './Context';
import ContextApi from './Component/Contexts/Context_api.js';
import AllHostingContext from './Component/Contexts/AllHostingContext';
import AddHouseContext from './Component/Contexts/AddHouseContext';
import EditHostingContext from './Component/Contexts/EditHostContext';

import GuttersGrid from './Component/Grid/GridItem';
import Demo from './Component/Grid/GridItem';

class App extends Component {
  render() {
    return (
      <Provider>

      <Header />
        <Router>
          
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm">
                <Sidebar/>
              </div>

              <div className="col-md-10">
                <Switch>

                  {/* Router for authentication */}
                  <Route exact path="/login" component={Login}></Route>
                  <Route exact path="/registration" component={Registration}></Route>

                  {/* Router for accommodation/house */}
                  <Route exact path="/" component={AllHostingContext}></Route>
                  <Route exact path="/myhouses" component={MyHouses}></Route>
                  <Route exact path="/addHouse" component={AddHouseContext}></Route>
                  <Route exact path="/editHouse/:id" component={ContextApi}></Route>
                  <Route exact path="/hosting/:id" component={AddHosting}></Route>
                  <Route exact path="/edithosting/:id" component={EditHostingContext}></Route>
                  <Route exact path="/grid" component={Demo}></Route>
                </Switch>

              </div>
          </div>
        </div>
      
      </Router>
      </Provider>
    );
  }
}

export default App;

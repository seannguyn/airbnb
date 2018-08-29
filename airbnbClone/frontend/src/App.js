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
import EditHosting from './Component/Function/EditHosting';

import {Provider} from './Context';
import ContextApi from './Component/Contexts/Context_api.js';
import EditHostingContext from './Component/Contexts/EditHostContext';
import AllHostingContext from './Component/Contexts/AllHostingContext';
import AddHouseContext from './Component/Contexts/AddHouseContext';

class App extends Component {
  render() {
    return (
      <Provider>
        
      <Header />
        <Router>
          
          <div className="container-fluid">
            <div className="row">

              <Sidebar/>

            <div>
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

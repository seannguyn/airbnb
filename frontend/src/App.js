import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Houses from './Component/Function/Houses';
import AddHouse from './Component/Function/AddHouse';
import Header from './Component/layout/Header';
import Sidebar from './Component/layout/Sidebar';
import Login from './Component/Authentication/Login';
import MyHouses from './Component/Function/MyHouses';
import Hosting from './Component/Function/Hosting';
import EditHosting from './Component/Function/EditHosting';

// import {Provider} from './Context';
// import ContextApi from './Component/Contexts/Context_api.js';
// import EditHostingContext from './Component/Contexts/EditHostContext';

import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header/>
        <Router>
          <div className="container-fluid">
            <div className="row">

              <Sidebar/>

            <div>

              <h1>SHOWING</h1>
                <Switch>

                  {/* Router for authentication */}
                  <Route exact path="/login" component={Login}></Route>

                  {/* Router for accommodation/house */}
                  <Route exact path="/viewHouse" component={Houses}></Route>
                  <Route exact path="/myhouses" component={MyHouses}></Route>
                  <Route exact path="/addHouse" component={AddHouse}></Route>
                  {/* <Route exact path="/editHouse/:id" component={ContextApi}></Route> */}
                  <Route exact path="/hosting/:id" component={Hosting}></Route>
                  {/* <Route exact path="/edithosting/:id" component={EditHostingContext}></Route> */}
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

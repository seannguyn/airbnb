import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Houses from './Component/Function/Houses.js'
import AddHouse from './Component/Function/AddHouse.js'
import Header from './Component/layout/Header.js'
import Sidebar from './Component/layout/Sidebar.js'
import {Provider} from './Context';
import ContextApi from './Component/layout/Context_api.js'

class App extends Component {
  render() {
    return (
      <Provider>
        <Header/>
        <Router>
          <div className="container-fluid">
            <div className="row">

              <Sidebar/>

            <div>

              <h1>SHOWING</h1>
                <Switch>
                  <Route exact path="/viewHouse" component={Houses}></Route>
                  <Route exact path="/addHouse" component={AddHouse}></Route>
                  <Route exact path="/editHouse/:id" component={ContextApi}></Route>
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

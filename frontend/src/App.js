import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from './Context';
import AppMain from './AppMain'

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

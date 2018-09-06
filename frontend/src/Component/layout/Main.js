import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AllHostingContext from '../Contexts/AllHostingContext'
import ContextApi from '../Contexts/Context_api.js';
import AddHouseContext from '../Contexts/AddHouseContext.js';

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
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
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

          </Switch>
      </main>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main);

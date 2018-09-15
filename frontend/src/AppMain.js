import React from 'react'
import {Consumer} from './Context';
import { withStyles } from '@material-ui/core/styles';
import Header from './Component/layout/Header'
// import Signin from './components/layouts/Signin'

import Sidebar from './Component/layout/Sidebar'
import Main from './Component/layout/Main'

// import Main from './components/layouts/Main'


const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%'
  }
});

class AppMain extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Consumer>
        {value => {
          const { logged_in } = value;
          return (
            <div className={classes.root}>
              <Header />
              {logged_in === true ? <Sidebar /> : null}
              <Main />
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(AppMain);

import React from 'react'
import PropTypes from 'prop-types'
import {Consumer} from './Context';
import { withStyles } from '@material-ui/core/styles';

import Header from './Component/layout/Header'
// import Signin from './components/layouts/Signin'


import Main from './Component/layout/Main'
import LandingPage from './views/LandingPage/LandingPage'
// import Main from './components/layouts/Main'
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',

  }
});

class AppMain extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <LandingPage/>    
    )
  }
}

export default withStyles(styles, { withTheme: true })(AppMain);

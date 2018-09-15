import React from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';

// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Items from './Items';

import {Consumer} from '../../Context';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
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
  hide : {
    display: 'none'
  }
});

class Sidebar extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <Consumer>

        {value => {
          const {sidebar_show} = value;
          return (
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !sidebar_show && classes.drawerPaperClose ),
              }}
              open={sidebar_show}
            >
              <div className={classes.toolbar}>
                blah blah
              </div>
              <Divider />
                <Items />
              <Divider />

            </Drawer>
          )
        }}

      </Consumer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Sidebar);

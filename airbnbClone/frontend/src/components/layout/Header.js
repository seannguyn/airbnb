import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Consumer} from '../../Context.js';
import classNames from 'classnames';
import LoginDialog from './LoginDialog'

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import green from '@material-ui/core/colors/green';

const drawerWidth = 240;

const customColor = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: '#ffffff',
    },
  },
});

const styles = theme => ({
  appBar: {
    border: 'none',
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
  hide: {
    display: 'none',
  },
  transparent: {
    marginLeft: "50px"
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

class Header extends Component {

  signOut = () => {
    window.localStorage.clear();
  }

  state = {
    anchorEl: null,
    open: false,
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  static handleDrawerOpen(dispatch) {
    console.log("open");
    dispatch({
      type: "TOGGLE_SIDEBAR"
    })
  };

  static handleDialogSignin(dispatch) {
    dispatch({type: "OPEN_DIALOG", payload: {open: true, login: true}})
  }

  static handleDialogSignup(dispatch) {
    dispatch({type: "OPEN_DIALOG", payload: {open: true, login: false}})
  }

  handleLogOut(dispatch) {
    console.log("");
    window.localStorage.removeItem('currentUser');
    dispatch({type: "LOGOUT"})
    this.handleClose();
  }

  render() {

    const {classes} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    return (
      <Consumer>
        {value => {
          const {dispatch, sidebar_show, logged_in} = value;

          return (
            <div>
              <MuiThemeProvider theme={customColor}>
                <AppBar color="secondary" position="absolute"
                        className={classNames(classes.appBar, sidebar_show && classes.appBarShift)}
                >
                  <Toolbar disableGutters={!sidebar_show}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={Header.handleDrawerOpen.bind(this, dispatch)}
                      className={classNames(classes.menuButton, !logged_in && classes.hide)}
                    >
                      <MenuIcon/>
                    </IconButton>
                    <Typography style={{flex: 1}}
                                className={classNames(!logged_in && classes.transparent)}
                                variant="title" color="inherit" noWrap>
                      portBnB
                    </Typography>
                    <Button color="inherit">About us</Button>
                    {logged_in === true ?
                      <div>
                        <Avatar
                          className={classNames(classes.avatar)}
                          aria-owns={open ? 'menu-appbar' : null}
                          aria-haspopup="true"
                          onClick={this.handleMenu}
                          color="inherit"
                        ><PersonIcon/></Avatar>

                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={open}
                          onClose={this.handleClose}
                        >
                          <Link to="/"><MenuItem
                            onClick={this.handleLogOut.bind(this, dispatch)}
                            style={{color: 'red'}}>Log out</MenuItem></Link>
                        </Menu>
                      </div> :

                      <div>
                        <Button color="inherit" onClick={Header.handleDialogSignup.bind(this, dispatch)}>Sign
                          up</Button>
                        <Button color="inherit" onClick={Header.handleDialogSignin.bind(this, dispatch)}>Log in</Button>
                      </div>}
                  </Toolbar>
                </AppBar>
              </MuiThemeProvider>
              <LoginDialog Signin_form={value.dialog.login}/>
            </div>
          );
        }}
      </Consumer>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Header);

import React from 'react'
import ExploreIcon from '@material-ui/icons/Explore'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import WorkIcon from '@material-ui/icons/Work'
import CloseIcon from '@material-ui/icons/Close'
import InputIcon from '@material-ui/icons/Input'
import { Consumer } from '../../Context.js'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

class Items extends React.Component {
  closeSideBar(dispatch) {
    dispatch({
      type: 'TOGGLE_SIDEBAR'
    })
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <List>
              <Link to="/">
                <ListItem
                  button
                  onClick={this.closeSideBar.bind(this, dispatch)}
                >
                  <ListItemIcon>
                    <ExploreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Explore" />
                </ListItem>
              </Link>
              <Link to="/myHouses">
                <ListItem
                  button
                  onClick={this.closeSideBar.bind(this, dispatch)}
                >
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Property" />
                </ListItem>
              </Link>
              <Link to="/mybookings">
                <ListItem
                  button
                  onClick={this.closeSideBar.bind(this, dispatch)}
                >
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary="Booking" />
                </ListItem>
              </Link>
              <Link to="/bookingRequest">
                <ListItem
                  button
                  onClick={this.closeSideBar.bind(this, dispatch)}
                >
                  <ListItemIcon>
                    <InputIcon />
                  </ListItemIcon>
                  <ListItemText primary="Booking Request" />
                </ListItem>
              </Link>
              <Divider />
              <ListItem button onClick={this.closeSideBar.bind(this, dispatch)}>
                <ListItemIcon>
                  <CloseIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      type="display1"
                      style={{ color: '#F13A13', fontSize: '20px' }}
                    >
                      Close
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          )
        }}
      </Consumer>
    )
  }
}

export default withStyles(styles)(Items)

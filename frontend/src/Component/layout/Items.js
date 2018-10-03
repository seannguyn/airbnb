import React from 'react';
import ExploreIcon from '@material-ui/icons/Explore';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import WorkIcon from '@material-ui/icons/Work';
import CloseIcon from '@material-ui/icons/Close';
import StarBorder from '@material-ui/icons/StarBorder';
import {Consumer} from '../../Context.js';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Items extends React.Component {

  closeSideBar(dispatch) {
    dispatch({
      type: 'TOGGLE_SIDEBAR'
    })
  }

  render () {
    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <List>
              <Link to="/">
               <ListItem button onClick={this.closeSideBar.bind(this, dispatch)}>
                 <ListItemIcon>
                   <ExploreIcon />
                 </ListItemIcon>
                 <ListItemText primary="Explore" />
               </ListItem>
              </Link>
               <ListItem button onClick={this.closeSideBar.bind(this, dispatch)}>
                 <ListItemIcon>
                   <StarBorder />
                 </ListItemIcon>
                 <ListItemText primary="Starred" />
               </ListItem>
              <Link to="/myHouses">
               <ListItem button onClick={this.closeSideBar.bind(this, dispatch)}>
                 <ListItemIcon>
                   <AccountBalanceIcon />
                 </ListItemIcon>
                 <ListItemText primary="Property" />
               </ListItem>
              </Link>
            <Link to="/mybookings">
             <ListItem button onClick={this.closeSideBar.bind(this, dispatch)}>
               <ListItemIcon>
                 <WorkIcon />
               </ListItemIcon>
               <ListItemText primary="Booking" />
             </ListItem>
             </Link>
             <Divider/>
             <ListItem button onClick={this.closeSideBar.bind(this, dispatch)}>
               <ListItemIcon>
                 <CloseIcon />
               </ListItemIcon>
               <ListItemText primary="Close" />
             </ListItem>
            </List>
          )
        }}
      </Consumer>

    )
  }
}



export default withStyles(styles)(Items);

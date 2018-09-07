import React from 'react';


import ExploreIcon from '@material-ui/icons/Explore';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import WorkIcon from '@material-ui/icons/Work';

import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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

  state = {
   open: true,
 };

 handleClick = () => {
   this.setState(state => ({ open: !state.open }));
 };

  render () {
    const { classes } = this.props;
    return (
      <List>
        <Link to="/">
         <ListItem button>
           <ListItemIcon>
             <ExploreIcon />
           </ListItemIcon>
           <ListItemText primary="Explore" />
         </ListItem>
        </Link>
         <ListItem button>
           <ListItemIcon>
             <StarBorder />
           </ListItemIcon>
           <ListItemText primary="Starred" />
         </ListItem>
        <Link to="/myHouses">
         <ListItem button>
           <ListItemIcon>
             <AccountBalanceIcon />
           </ListItemIcon>
           <ListItemText primary="Property" />
         </ListItem>
        </Link>
      <Link to="/mybookings">
       <ListItem button>
         <ListItemIcon>
           <WorkIcon />
         </ListItemIcon>
         <ListItemText primary="Booking" />
       </ListItem>
       </Link>

      </List>
    )
  }
}



export default withStyles(styles)(Items);

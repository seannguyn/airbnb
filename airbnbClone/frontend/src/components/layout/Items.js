import React from 'react';
<<<<<<< HEAD:airbnbClone/frontend/src/components/layout/Items.js

=======
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/layout/Items.js
import ExploreIcon from '@material-ui/icons/Explore';
import {withStyles} from '@material-ui/core/styles';
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

<<<<<<< HEAD:airbnbClone/frontend/src/components/layout/Items.js
  state = {
    open: true,
  };
=======
  closeSideBar(dispatch) {
    dispatch({
      type: 'TOGGLE_SIDEBAR'
    })
  }
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/layout/Items.js

  render() {
    return (
<<<<<<< HEAD:airbnbClone/frontend/src/components/layout/Items.js
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemIcon><ExploreIcon/></ListItemIcon>
            <ListItemText primary="Explore"/>
          </ListItem>
        </Link>

        <ListItem button>
          <ListItemIcon><StarBorder/></ListItemIcon>
          <ListItemText primary="Starred"/>
        </ListItem>

        <Link to="/myHouses">
          <ListItem button>
            <ListItemIcon><AccountBalanceIcon/></ListItemIcon>
            <ListItemText primary="Property"/>
          </ListItem>
        </Link>

        <Link to="/mybookings">
          <ListItem button>
            <ListItemIcon><WorkIcon/></ListItemIcon>
            <ListItemText primary="Booking"/>
          </ListItem>
        </Link>
=======
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
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/layout/Items.js

    )
  }
}


export default withStyles(styles)(Items);

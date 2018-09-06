// import React from 'react'
// import './Header.css'
// import {Link} from 'react-router-dom';
// const Sidebar = (props) => {
//   return (
//     <nav className="bg-light sidebar">
//           <div className="sidebar-sticky">
//             <ul className="nav flex-column">
//
//
//               <Link to="/">
//                 <li className="nav-item">
//                    <div className="lead">
//                    Explore<i className="fas fa-binoculars"
//                             style={{
//                               cursor:'pointer',
//                               float:'right',
//                               marginTop:'0.25em',
//                               marginRight:'3.75em'
//                             }}
//                     />
//                   </div>
//                 </li>
//               </Link>
//
//               <li className="nav-item">
//                   <div className="lead">My Houses</div>
//                 <ul>
//                   <div>
//                   <li className="nav-item">
//                     <Link to="/myhouses" className="nav-link">
//                       <i className="fas fa-binoculars"
//                           style={{
//                             cursor:'pointer',
//                             float:'right',
//                             marginTop:'0.8em',
//                             marginRight:'4em'
//                             }}>
//                       </i>
//                       </Link>View</li>
//                   </div>
//
//                   <li className="nav-item">
//                     <Link to="/addHouse" className="nav-link">
//                       <i className="fas fa-plus"
//                           style={{
//                             cursor:'pointer',
//                             float:'right',
//                             marginTop:'0.8em',
//                             marginRight:'4em'
//                           }}> </i>
//                     </Link>Add
//                      </li>
//                 </ul>
//               </li>
//
//               <h3>Features</h3>
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   <span data-feather="shopping-cart"></span>
//                   My Bookings
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   <span data-feather="users"></span>
//                   Customers
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   <span data-feather="bar-chart-2"></span>
//                   Reports
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   <span data-feather="layers"></span>
//                   Integrations
//                 </a>
//               </li>
//             </ul>
//
//             <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
//               <span>Saved reports</span>
//               <a className="d-flex align-items-center text-muted" href="/">
//                 <span data-feather="plus-circle"></span>
//               </a>
//             </h6>
//             <ul className="nav flex-column mb-2">
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   <span data-feather="file-text"></span>
//                   Current month
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   <span data-feather="file-text"></span>
//                   Last quarter
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   <span data-feather="file-text"></span>
//                   Social engagement
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/">
//                   <span data-feather="file-text"></span>
//                   Year-end sale
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </nav>
//   )
// }
//
// export default Sidebar


import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
  hide: {
    display: 'none',
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
    const { classes, theme } = this.props;
    return (
      <Consumer>

        {value => {
          const {dispatch} = value;
          const {sidebar_show} = value;
          const {logged_in} = value;
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

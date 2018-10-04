import React from 'react'
<<<<<<< HEAD:airbnbClone/frontend/src/components/layout/Sidebar.js
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
=======
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/layout/Sidebar.js
import Items from './Items';
import {Consumer} from '../../Context';

const styles = theme => ({})

class Sidebar extends React.Component {
<<<<<<< HEAD:airbnbClone/frontend/src/components/layout/Sidebar.js
  render() {
    const {classes} = this.props;
=======

  render () {
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/layout/Sidebar.js
    return (
      <Consumer>

        {value => {
          const {sidebar_show,} = value;
          return (
<<<<<<< HEAD:airbnbClone/frontend/src/components/layout/Sidebar.js
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !sidebar_show && classes.drawerPaperClose),
              }}
              open={sidebar_show} >
              <div className={classes.toolbar}>
                blah blah
              </div>
              <Divider/>
              <Items/>
              <Divider/>
            </Drawer>
=======
            <Drawer open={sidebar_show}>
          <div
            tabIndex={0}
            role="button"
          >
            <Items/>
          </div>
        </Drawer>
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/layout/Sidebar.js
          )
        }}

      </Consumer>
    )
  }
}

<<<<<<< HEAD:airbnbClone/frontend/src/components/layout/Sidebar.js
export default withStyles(styles, {withTheme: true})(Sidebar);
=======
export default withStyles(styles)(Sidebar);
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/layout/Sidebar.js

import React from 'react'
// import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Items from './Items'
import { Consumer } from '../../Context'

const styles = theme => ({})

class Sidebar extends React.Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { sidebar_show } = value
          return (
            <Drawer open={sidebar_show}>
              <div tabIndex={0} role="button">
                <Items />
              </div>
            </Drawer>
          )
        }}
      </Consumer>
    )
  }
}

export default withStyles(styles)(Sidebar)

import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import SingleRequest from './SingleRequest'
import RepliedRequest from './RepliedRequest'
import { Consumer } from '../../Context.js'
import Forbidden from '../layout/Forbidden'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
})

class BookingRequest extends React.Component {
  render() {
    const { classes } = this.props
    const { currentUser } = this.props.context
    if (currentUser.length === 0) {
      return <Forbidden />
    } else {
      return (
        <Consumer>
          {value => {
            const { newRequest, repliedRequest } = value
            var newRequestComponent = []
            var repliedRequestComponent = []
            newRequest.map(r => {
              newRequestComponent.push(<SingleRequest key={r.id} request={r} />)
              return 1
            })

            repliedRequest.map(r => {
              repliedRequestComponent.push(
                <RepliedRequest key={r.id} request={r} />
              )
              return 1
            })

            return (
              <div className="container">
                <div className="row" style={{ margin: '10px' }}>
                  <Badge
                    className={classes.margin}
                    badgeContent={
                      <Typography
                        style={{ color: '#FFFFFF', fontSize: '12.5px' }}
                      >
                        {newRequest.length}
                      </Typography>
                    }
                    color="primary"
                  >
                    <Typography variant="display3" color="textSecondary">
                      New Requests
                    </Typography>
                  </Badge>
                </div>

                {newRequestComponent}

                <Divider style={{ marginBottom: '30px', marginTop: '30px' }} />

                <div className="row" style={{ margin: '10px' }}>
                  <Typography variant="display3" color="textSecondary">
                    Replied Requests
                  </Typography>
                </div>

                {repliedRequestComponent}
              </div>
            )
          }}
        </Consumer>
      )
    }
  }
}

export default withStyles(styles)(props => (
  <Consumer>{value => <BookingRequest {...props} context={value} />}</Consumer>
))

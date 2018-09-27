import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';
import BookingPaper from '../AccommodationDetail/BookingPaper'
import {Consumer} from '../../Context.js';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxHeight: '1000px',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
        maxWidth: '100vh',
        minWidth: '100vh',
    },
});

class BookingDiaglog extends React.Component {

  render () {
    const {classes} = this.props
    console.log("PROPSSSSS.....",this.props);
    return (
      <Consumer>
        {value => {

          return (
            <Dialog
              open={this.props.open}
              aria-labelledby="form-dialog-title"
              classes={{ paper: classes.dialogPaper }}
            >


            <CloseIcon onClick={this.props.closeDiaglog} style={{float:'right'}}/>
              <Paper className={classes.paper}>

                <BookingPaper
                  isDayBlocked={this.props.isDayBlocked}
                  minDateSet={this.props.minDateSet}
                  context={value}
                  currentHost={this.props.currentHost}
                  history={this.props.history}
                  accommodation={this.props.accommodation}
                  booking_id={this.props.booking_id}
                  booking={this.props.booking}
                  />
              </Paper>
            </Dialog>
          )
        }}
      </Consumer>

    )
  }
}



export default withStyles(styles)(BookingDiaglog);

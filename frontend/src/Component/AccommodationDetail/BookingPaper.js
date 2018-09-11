import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import isBeforeDay from './utils/isBeforeDay'
import isAfterDay from './utils/isAfterDay';
import {Consumer} from '../../Context.js';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  paper: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    width: 'relative'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    height: 60,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  typo: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit*3,
  },
});

class BookingPaper extends React.Component {

  constructor() {
    super()
    this.state = {
      minDate: {},
      status: 0,
      booking: false,
    }
  }

  // check if object is empty
  isEmpty = (obj) => {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

  findMax(minDateSet) {
    var max = minDateSet[0];
    for (var i = 0; i < minDateSet.length ; i++) {
      if(isAfterDay(minDateSet[i],max) === true) {
          max = minDateSet[i].clone();
        }
    }
    return max;
  }

  shouldComponentUpdate(nextProps, nextState) {
        console.log("Should Component update", nextProps);
        // if (nextState.status === 1) {
        //     return false;
        // }
        return true;
    }
  componentWillUpdate(nextProps, nextState) {
        console.log("Component will update", nextProps, nextState);
    }

  componentDidUpdate(prevProps, prevState) {
        console.log("Component did update", prevProps, prevState);
  }

  componentWillReceiveProps(nextProps) {
        // console.log("Component will receive props",nextProps);
        const {currentUser} = nextProps.context;
        const {currentHost} = this.props;
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;

        let tempStartDate = moment(startDate).format('YYYY-MM-DD');
        let tempEndDate = moment(endDate).format('YYYY-MM-DD');

        if (currentUser.length !== 0 && this.state.booking === true) {
          console.log("Component will receive props", currentUser);
          const newBooking = {
              hosting: currentHost.id,
              booker: currentUser[0].user_id,
              date_start: tempStartDate,
              date_end: tempEndDate,
              note: "hello"
          }
          this.props.history.push({
            pathname: '/overallBooking',
            state: { detail: newBooking}
          })
        }
    }

  async handleBooking(dispatch) {
      this.setState({booking: true});
      if(this.isEmpty(this.props.context.currentUser[0]) === true){

        // open login diaglog
        dispatch({
          type:'OPEN_DIALOG',
          payload: {
            open: true,
            login: true,
          },
        })
      }
      else{
          let startDate = this.state.startDate;
          let endDate = this.state.endDate;

          let tempStartDate = moment(startDate).format('YYYY-MM-DD');
          let tempEndDate = moment(endDate).format('YYYY-MM-DD');

          // const {currentHost} = this.state;
          // const currentUserID = this.props.context.currentUser[0].user_id;
          // const currentHostID = currentHost.id;
          // const note = 'hello';
          // const newBooking = {
          //     hosting: currentHostID,
          //     booker: currentUserID,
          //     date_start: tempStartDate,
          //     date_end: tempEndDate,
          //     note
          // }

          // await axios.post('https://localhost:8000/booking/', newBooking);
          console.log("SUCCESSFully Booking");
          // const bookedPeriods = this.state.bookedPeriods.concat(this.datesInPeriod(startDate, endDate));
          // this.setState({bookedPeriods : bookedPeriods});
      }
  }
  render () {
    const {classes} = this.props;
    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <Paper className={classes.paper}>
              <Typography className={classes.typo} align="center" variant="display1">Booking</Typography>
              <Typography className={classes.typo} align="center" variant="headline">$473 total</Typography>
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => {
                  this.setState({ startDate, endDate })
                  if (startDate !== null) {
                    const {minDateSet} = this.props;
                    // in order to work, gotta be max
                    var min = this.findMax(minDateSet)
                    for (var i = 0; i < minDateSet.length ; i++) {
                      if(isAfterDay(minDateSet[i],startDate) === true) {
                        if (isBeforeDay(minDateSet[i],min) === true) {
                            min = minDateSet[i].clone();
                          }
                        }
                    }
                    if (isBeforeDay(min,startDate) === true) {
                      min = null;
                    }
                    this.setState({minDate: min})
                  } else {
                    this.setState({minDate: null})
                  }
                }
              }
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            isDayBlocked = {this.props.isDayBlocked}
            isOutsideRange={day => isBeforeDay(day,moment()) || isAfterDay(day,this.state.minDate) }
            showClearDates={true}
            minimumNights = {2}
            reopenPickerOnClearDates
            />
          <div className="row">
            <div className="col md-6">
              <Typography align="left" className={classes.typo} variant="subheading">cost</Typography>
            </div>
            <div className="col md-6">
              <Typography align="right" className={classes.typo} variant="subheading">$$$</Typography>
            </div>
          </div>
          <Divider/>
            <div className="row">
              <div className="col md-6">
                <Typography align="left" className={classes.typo} variant="subheading">cost</Typography>
              </div>
              <div className="col md-6">
                <Typography align="right" className={classes.typo} variant="subheading">$$$</Typography>
              </div>
            </div>
          <Divider/>
            <div className="row">
              <div className="col md-6">
                <Typography align="left" className={classes.typo} variant="subheading">cost</Typography>
              </div>
              <div className="col md-6">
                <Typography align="right" className={classes.typo} variant="subheading">$$$</Typography>
              </div>
            </div>
              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.handleBooking.bind(this,dispatch)}>
                Book
              </Button>
              <Typography align="center" className={classes.typo} variant="caption">You wont be charged yet</Typography>
              <Divider/>
              <Typography align="center" className={classes.typo}>
                Price shown is the total trip price, including additional fees and taxes.
              </Typography>
            </Paper>
          )
        }}
      </Consumer>

    )
  }
}

export default withStyles(styles)(BookingPaper);

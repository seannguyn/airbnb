import React from 'react'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import isBeforeDay from './utils/isBeforeDay'
import isAfterDay from './utils/isAfterDay';
import {Consumer} from '../../Context.js';
import Divider from '@material-ui/core/Divider';
import GuestSelect from './GuestSelect';
import Price from './Price'
import HeaderPrice from './HeaderPrice'

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

  constructor(props) {
    super(props)
    this.state = {
      minDate: {},

      startDate: null,
      endDate: null,

      guest: 1,

      price: {
        pricePerNight: '',
        daysDiff: '',
        promotion: '',
      },

      accommodation: {},
      currentHost: {},

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
    if (minDateSet.length === 0) {return null}
    var max = minDateSet[0];
    for (var i = 0; i < minDateSet.length ; i++) {
      if(isAfterDay(minDateSet[i],max) === true) {
          max = minDateSet[i].clone();
        }
    }
    return max;
  }

  componentWillReceiveProps(nextProps) {
        // console.log("Component will receive props",nextProps);
        const {currentUser} = nextProps.context;

        if (currentUser.length !== 0 && this.state.booking === true) {
          console.log("Component will receive props", currentUser);
          let tempStartDate = moment(this.state.startDate).format('YYYY-MM-DD');
          let tempEndDate = moment(this.state.endDate).format('YYYY-MM-DD');

          const newDetail = {

            startDate: tempStartDate,
            endDate: tempEndDate,

            guest: this.state.guest,

            price: {
              pricePerNight: this.state.price.pricePerNight,
              daysDiff: this.state.price.daysDiff,
              promotion: this.state.price.promotion,
            },

            accommodation: this.state.accommodation,
            currentHost: this.state.currentHost,
          }

          this.goToPayment(currentUser[0].user_id,newDetail);


        }
    }

  handleBooking(dispatch,currentHost,daysDiff,promotion,
                          accommodation,
                          totalPrice,guest,
                          startDate,endDate) {

      this.setState({
        price:{
          pricePerNight: currentHost.price,
          daysDiff: daysDiff,
          promotion: promotion,
        },
        guest: guest,
        startDate: startDate,
        endDate: endDate,
        accommodation: accommodation,
        currentHost: currentHost,
        booking: true,
      })

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

        let tempStartDate = moment(this.state.startDate).format('YYYY-MM-DD');
        let tempEndDate = moment(this.state.endDate).format('YYYY-MM-DD');

        // Find the date user have to pay by
        var now = moment();
        let daysDiff = now.diff(this.state.startDate,'days');
        now.subtract(daysDiff/2, 'days');
        let paidDate = moment(now).format('YYYY-MM-DD');


        const newDetail = {

          startDate: tempStartDate,
          endDate: tempEndDate,
          paidDate: paidDate,

          guest: guest,

          price: {
            pricePerNight: currentHost.price,
            daysDiff: daysDiff,
            promotion: promotion,
          },

          accommodation: accommodation,
          currentHost: currentHost,
        }
        this.goToPayment(this.props.context.currentUser[0].user_id,newDetail);
          // await axios.post('https://localhost:8000/booking/', newBooking);

          // const bookedPeriods = this.state.bookedPeriods.concat(this.datesInPeriod(startDate, endDate));
          // this.setState({bookedPeriods : bookedPeriods});
      }


  }

  goToPayment(booker,newDetail) {

    this.props.history.push({
      pathname: `/overallbooking/reserve/${newDetail.currentHost.id}`,
      search: '?query=abc',
      state: {
        detail: newDetail,
        booker: booker,
      }
    })
  }

  handleGuest(ops, num) {
    const limit = 5;
    if (ops === "-" && num > 1) {
      this.setState({guest: parseFloat(num) - 1})
    } else if( ops === "+" && num < limit) {
      this.setState({guest: parseFloat(num) + 1})
    }
  }


  render () {


    const {classes} = this.props;
    var daysDiff = 0;
    var totalPrice = this.props.currentHost.price;
    var caption="per night";
    var promotion = 0.1;
    console.log(this.props,"booking paper props");
    if (this.state.startDate !== null && this.state.endDate !== null) {
      daysDiff = this.state.endDate.diff(this.state.startDate,'days')
      totalPrice = parseFloat(this.props.currentHost.price)*daysDiff;
      caption="total"
    }

    const book = (this.state.startDate !== null && this.state.endDate !== null) ? false : true;

    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <Paper className={classes.paper}>
              <Typography className={classes.typo} align="center" variant="display1">Booking</Typography>
              <Divider/>


              <HeaderPrice
                totalPrice={parseFloat(totalPrice)}
                caption={caption}
              />

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

          <GuestSelect guest={this.state.guest} handleGuest={this.handleGuest.bind(this)}/>

          {(this.state.startDate !== null && this.state.endDate !== null) ?
            <Price
            pricePerNight={parseFloat(this.props.currentHost.price)}
            daysDiff={daysDiff}
            promotion={promotion}
            /> : null}


              <Button
                className={classes.submit}
                variant="contained"
                color="primary"
                fullWidth
                onClick={
                  this.handleBooking.bind(this,dispatch,this.props.currentHost,daysDiff,promotion,
                    this.props.accommodation,
                    totalPrice,this.state.guest,
                    this.state.startDate,this.state.endDate)
                }
                disabled={book}>
                Request Book
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

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckIcon from '@material-ui/icons/Check';
import BookingPaper from '../AccommodationDetail/BookingPaper'
import BookingInfo from '../Booking/BookingInfo';
import Price from '../AccommodationDetail/Price'
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import uuid from 'uuid';
import Overview from '../Booking/Overview';
import Days from '../Booking/Days';
import Amenities from '../Booking/Amenities';
import Reminder from '../Booking/Reminder';
import PaymentOptions from '../Booking/PaymentOptions';
import CardForm from '../Booking/CardForm';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  form: {
    width: '80%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  typo: {
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  },
});

class OverallBooking extends React.Component {

  state = {
    value: 0,

    credit: {
      card_number:'',
      name:'',
      valid:'',
      cvc:'',
    }

  };

  handleChange(value) {
    console.log("credit card:        ",this.state.credit);
    this.setState({ value });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  onChange(credit) {

    this.setState({
      credit
    })
  }

  postBooking() {
    console.log("POST BOOKING");
    this.handleChange(1);
  }



  render () {
    const { theme, classes } = this.props;

    console.log(this.props.location.state,"PROCESS PAYMENT");
    const appear = false;




    if (typeof this.props.location.state !== "undefined") {

      const {detail,booker} = this.props.location.state
      const price = (<Price
      pricePerNight={parseFloat(detail.price.pricePerNight)}
      daysDiff={parseFloat(detail.price.daysDiff)}
      promotion={parseFloat(detail.price.promotion)}
      />);

      return (
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Review Detail" icon={<CheckIcon hidden={this.state.value > 0 ? false : true}/>} disabled={this.state.value === 0 ? false : true}></Tab>
              <Tab label="Payment" icon={<CheckIcon hidden={this.state.value > 1 ? false : true}/>} disabled={this.state.value === 1 ? false : true} />
              <Tab label="Confirmation" disabled={this.state.value === 2 ? false : true} />
            </Tabs>
          </AppBar>
          <div className="container">
            <div className="row">
            <div className="col-8">
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >

                  <TabContainer dir={theme.direction}>

                    <Overview accommodation={detail.accommodation} guest={detail.guest}/>

                    <Divider/>
                    <Divider/>

                    <Days
                      daysDiff={detail.price.daysDiff}
                      city={detail.accommodation.addr_city}
                      startDate={detail.startDate}
                      endDate={detail.endDate}
                      checkIn={detail.currentHost.check_in}
                      checkOut={detail.currentHost.check_out}
                      />

                    <Divider/>
                    <Divider/>
                    <Amenities accommodation={detail.accommodation}/>

                    <Divider/>
                    <Divider/>

                    <Reminder/>

                    <Divider/>

                    <div className="row" style={{marginTop:'20px'}}>
                      <Button variant="contained" color="primary" onClick={this.postBooking.bind(this)}>Agree and Continue</Button>
                    </div>



                  </TabContainer>
                  <TabContainer dir={theme.direction}>

                    <div className="container" style={{border: '3px solid red'}}>


                      <PaymentOptions/>

                      <CardForm
                        onChange={this.onChange.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        />

                    </div>
                  </TabContainer>
                  <TabContainer dir={theme.direction}>
                    <div className="container" style={{border: '3px solid red'}}>


                    </div>
                    <Button onClick={this.handleChange.bind(this, 2)}>Forward</Button>
                    <Button onClick={this.handleChange.bind(this, 1)}>BackWard</Button>
                  </TabContainer>



            </SwipeableViews>
            </div>
            <div className="col-4" style={{border: '3px solid green'}}>
              <BookingInfo
                price={price}
                detail={detail}
                />
            </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <h1>hihihi</h1>
      )

    }

  }
}

export default withStyles(styles, { withTheme: true })(OverallBooking);

import React, { Component } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {CardActions } from '../../../node_modules/@material-ui/core';
// import {Link} from 'react-router-dom'
import BookingDiaglog from './BookingDiaglog'
import moment from 'moment';
import {enumerateDaysBetweenDates, concatString} from '../Helper/Helper'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};


class Booking extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      host: {},
      accommodation: {},
      booking: [],
      minDateSet: [],

    }
  }

    handleDelete = async (id) => {
        await axios.delete(`https://localhost:8000/booking/${id}/`);
        alert("Delete successfully - reload page");
        const {accommodation} = this.state;
        const date_free = enumerateDaysBetweenDates(this.props.booking.date_start, this.props.booking.date_end)
        const res_temp = await axios.get(`https://localhost:8000/search/${accommodation.id}/`)

        const newDateFree_temp = concatString(res_temp.data.date_free,date_free)

        const searchAccommodationTemp = {
          date_free: newDateFree_temp
        }

        await axios.patch(`https://localhost:8000/search/${accommodation.id}/`,searchAccommodationTemp)
    }

    // find dates between 2 dates
    datesInPeriod = (startDate, endDate) => {
        var dates = [];

        var currDate = startDate,
            lastDate  = endDate;
        dates.push(currDate.clone());
        while(currDate.add(1, 'days').diff(lastDate) < 0) {
            dates.push(currDate.clone());
        }
        dates.push(lastDate.clone());
        return dates;
    };

    blockBookedPeriod(bookingList) {

        let startDate, endDate;
        let  currentPeriod = [];
        var tempBookedPeriods = [];
        var minDateSet=[];
        for( let i = 0; i < bookingList.length; i++){
            if (bookingList[i].id === this.props.booking.id) continue;
            startDate = bookingList[i].date_start;
            endDate = bookingList[i].date_end;
            startDate = moment(startDate);
            endDate = moment(endDate);
            currentPeriod = this.datesInPeriod(startDate, endDate);


            tempBookedPeriods=tempBookedPeriods.concat(currentPeriod);
            minDateSet = this.state.minDateSet;

            minDateSet.push(currentPeriod[0]);

        }


        this.setState({minDateSet: minDateSet})
        this.setState({booking: tempBookedPeriods});
    }

    handleEdit = () => {

      this.setState({
        open:true
      })
    }

    handlePayment= () => {

      let stayPeriod = moment(this.props.booking.date_end).diff(moment(this.props.booking.date_start), 'days');


      const newDetail = {

        startDate: this.props.booking.date_start,
        endDate: this.props.booking.date_end,
        paidDate: this.props.booking.date_paymentDue,

        guest: this.props.booking.guest,

        price: {
          pricePerNight: this.state.host.price,
          daysDiff: stayPeriod,
          promotion: 0.1,
        },

        accommodation: this.state.accommodation,
        currentHost: this.state.host,
      }

      console.log("NEW_DETAIL",newDetail);

      this.props.history.push({
        pathname: `/overallbooking/payment/${this.state.host.id}`,
        search: '?query=abc',
        state: {
          detail: newDetail,
          booker: this.props.booking.booker,
          booking: this.props.booking,
        }
      })
    }

    findImages = (images) => {

    }

    async componentDidMount(){

        const images = await axios.get('https://localhost:8000/accommodationImage/');
        this.findImages(images.data);

        const res1 = await axios.get(`https://localhost:8000/accommodationHosting/${this.props.booking.hosting}/`)
        this.setState({host: res1.data})


        const res2 = await axios.get(`https://localhost:8000/accommodation/${res1.data.accommodation}/`)
        this.setState({accommodation: res2.data})


        const res3 = await axios.get(`https://localhost:8000/booking/?host=${this.props.booking.hosting}`)
        this.blockBookedPeriod(res3.data);

    }

    closeDiaglog() {
      this.setState({
        open: !this.state.open
      })
    }

    render() {
        const { id, date_start, date_end, note, isPaid } = this.props.booking;
        const { classes } = this.props;
        console.log("Propsss: ", this.props);
        const {open} = this.state;

        const isDayBlocked = day => this.state.booking.filter(d => d.isSame(day, 'day')).length > 0;

        var payButton = []
        if (isPaid === false) {
          payButton.push(
            <Button key={1} variant="contained" color="primary" onClick={this.handlePayment}>
              Pay
          </Button>)
        } else {
          payButton.push(
          <Button key={2} color="primary">
            Paid
          </Button>)
        }

        return (
            <React.Fragment>
                <Card className={classes.card} style={{width:'30vw'}} >

                    <CardActions>
                        {/* <CardMedia>

                        </CardMedia> */}
                    </CardActions>

                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                        From: {date_start}
                        </Typography>

                        <Typography gutterBottom variant="headline" component="p">
                         To: {date_end} Note: {note}
                        </Typography>

                        <Typography gutterBottom variant="headline" component="p">
                            Note: {note}
                        </Typography>

                        <Button onClick={this.handleEdit}>
                            <i className="fas fa-pencil-alt" style={{cursor:'pointer', float:'right',color:'black'}}></i>
                        </Button>

                        <Button onClick={this.handleDelete.bind(this, id)}>
                            <i  className="fas fa-times" style={{cursor:'pointer', float:'right',color:'red'}}/>
                        </Button>

                        {payButton}

                     </CardContent>
                </Card>
                <BookingDiaglog
                  closeDiaglog={this.closeDiaglog.bind(this)}
                  open={open}

                  isDayBlocked={isDayBlocked}
                  minDateSet={this.state.minDateSet}
                  currentHost={this.state.host}
                  history={this.props.history}
                  accommodation={this.state.accommodation}
                  booking_id={this.props.booking.id}
                  booking={this.props.booking}
                  />
            </React.Fragment>
         );
    }
}

export default withStyles(styles)(Booking);

import React, { Component } from "react"
import axios from "axios"
import moment from "moment"

// Material UI
import { withStyles } from "@material-ui/core/styles"
// import CardContent from '@material-ui/core/CardContent'
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
// import { CardMedia, CardActions } from '../../../node_modules/@material-ui/core'
import { withSnackbar } from "notistack"
import Card from "Component/Card/Card.jsx"
import CardBody from "Component/Card/CardBody.jsx"
import CardHeader from "Component/Card/CardHeader.jsx"

// Images Slider
import carouselStyle from "assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx"
import Carousel from "react-slick"

import ReviewPopup from "../Popup/ReviewPopup.js"
import { enumerateDaysBetweenDates, concatString } from "../Helper/Helper"
import BookingDiaglog from "./BookingDiaglog"

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true
}

class Booking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      host: {},
      accommodation: {},
      booking: [],
      minDateSet: [],
      images: [],
      currentAccommodationID: -1,
      // review: false,
      isReviewed: props.booking.isReviewed,
      openEditBooking: false,
      openReviewPopup: false
    }
  }

  handlePayment = () => {
    let stayPeriod = moment(this.props.booking.date_end).diff(
      moment(this.props.booking.date_start),
      "days"
    )

    const newDetail = {
      startDate: this.props.booking.date_start,
      endDate: this.props.booking.date_end,
      paidDate: this.props.booking.date_paymentDue,

      guest: this.props.booking.guest,

      price: {
        pricePerNight: this.state.host.price,
        daysDiff: stayPeriod,
        promotion: 0.1
      },

      accommodation: this.state.accommodation,
      currentHost: this.state.host
    }

    this.props.history.push({
      pathname: `/overallbooking/payment/${this.state.host.id}`,
      search: "?query=abc",
      state: {
        detail: newDetail,
        booker: this.props.booking.booker,
        booking: this.props.booking
      }
    })
  }

  // Toggle review popup
  closeDiaglog() {
    this.setState({
      openReviewPopup: !this.state.openReviewPopup
    })
  }

  // Toggle Edit Booking popup
  toggleEditBooking() {
    this.setState({
      openEditBooking: !this.state.openEditBooking
    })
  }

  handleDelete = async id => {
    await axios.delete(`/booking/${id}/`)
    const { accommodation } = this.state
    const date_free = enumerateDaysBetweenDates(
      this.props.booking.date_start,
      this.props.booking.date_end
    )
    const res_temp = await axios.get(`/search/${accommodation.id}/`)

    const newDateFree_temp = concatString(res_temp.data.date_free, date_free)

    const searchAccommodationTemp = {
      date_free: newDateFree_temp
    }

    await axios.patch(`/search/${accommodation.id}/`, searchAccommodationTemp)
    window.location.reload()
  }

  // find dates between 2 dates
  datesInPeriod = (startDate, endDate) => {
    var dates = []

    var currDate = startDate,
      lastDate = endDate
    dates.push(currDate.clone())
    while (currDate.add(1, "days").diff(lastDate) < 0) {
      dates.push(currDate.clone())
    }
    dates.push(lastDate.clone())
    return dates
  }

  blockBookedPeriod(bookingList) {
    let startDate, endDate
    let currentPeriod = []
    var tempBookedPeriods = []
    var minDateSet = []
    for (let i = 0; i < bookingList.length; i++) {
      if (bookingList[i].id === this.props.booking.id) continue
      startDate = bookingList[i].date_start
      endDate = bookingList[i].date_end
      startDate = moment(startDate)
      endDate = moment(endDate)
      currentPeriod = this.datesInPeriod(startDate, endDate)

      tempBookedPeriods = tempBookedPeriods.concat(currentPeriod)
      minDateSet = this.state.minDateSet
      minDateSet.push(currentPeriod[0])
    }
    this.setState({ minDateSet: minDateSet })
    this.setState({ booking: tempBookedPeriods })
  }

  handleReviewPopup = () => {
    this.setState({
      openReviewPopup: !this.state.openReviewPopup
    })
  }

  handleSubmitReview = async (
    star,
    comment,
    currentUser,
    requireReviewItem
  ) => {
    let newReview = {
      user: currentUser[0].user_id,
      accommodation: requireReviewItem.accommodation,
      booking: requireReviewItem.id,
      star: star,
      review: comment,
      date_posted: moment().format("YYYY-MM-DD")
    }
    await axios.post("/reviews/", newReview)

    // update review count
    const reviewCount = await axios.get(
      `/reviewCounter/${requireReviewItem.accommodation}/`
    )
    var newCount = reviewCount.data.count + 1
    await axios.patch(
      `/reviewCounter/${requireReviewItem.accommodation}/`,
      { count: newCount }
    )

    this.setState({ openReviewPopup: false, isReviewed: true })
    this.props.onPresentSnackbar("success", "Thanks for your Review")
  }

  async componentDidMount() {
    const { booking /*pastStay, isPast*/ } = this.props,
      hosting = booking.hosting

    const res = await axios.get(`/accommodationHosting/${hosting}/`)
    const accommID = res.data.accommodation
    this.setState({ currentAccommodationID: accommID })

    const images = await axios.get(`/accommodationImage/?accommodation=${accommID}`);
    this.setState({ images: images.data })

    const res1 = await axios.get(
      `/accommodationHosting/${this.props.booking.hosting}/`
    )
    this.setState({ host: res1.data })

    const res2 = await axios.get(`/accommodation/${res1.data.accommodation}/`)
    this.setState({ accommodation: res2.data })

    const res3 = await axios.get(`/booking/?host=${this.props.booking.hosting}`)
    this.blockBookedPeriod(res3.data)
  }

  render() {
    let { daysLeft, hoursLeft, minutesLeft } = 0
    const { images } = this.state,
      { classes, booking } = this.props,
      { id, date_start, date_end, note, isPaid } = booking,
      { isReviewed, openReviewPopup, accommodation } = this.state

    daysLeft = Math.abs(moment(date_start).diff(moment(), "hours")) / 24
    hoursLeft = Math.abs(daysLeft - Math.round(daysLeft)) * 24
    daysLeft = Math.round(daysLeft)

    if (hoursLeft > 1) {
      minutesLeft = Math.round(Math.abs(Math.round(hoursLeft) - hoursLeft)) * 60
    } else {
      minutesLeft = Math.round(hoursLeft * 60)
      hoursLeft = 0
    }
    hoursLeft = Math.round(hoursLeft)

    let imagesDiv = []
    images.map(image => {
      imagesDiv.push(
        <div key={image.id}>
          <img src={image.a_image} height="150" width="345" alt="house" />
        </div>
      )
      return 0
    })

    const isDayBlocked = day =>
      this.state.booking.filter(d => d.isSame(day, "day")).length > 0

    var payButton = []
    if (isPaid === false) {
      payButton.push(
        <Button
          key={1}
          variant="contained"
          color="primary"
          onClick={this.handlePayment}
        >
          Pay
        </Button>
      )
    } else {
      payButton.push(
        <Button key={2} color="primary">
          Paid
        </Button>
      )
    }
    return (
      <React.Fragment>
        <center>
          {this.state.openReviewPopup === true ? (
            <ReviewPopup
              handleSubmitReview={this.handleSubmitReview}
              requireReviewItem={booking}
              open={openReviewPopup}
              accommodation={accommodation}
            />
          ) : null}
        </center>
        <Card
          product
          className={classes.cardHover}
          style={{ width: "20vw", height: "25vw" }}
        >
          <CardHeader
            style={{ marginBottom: "-5rem" }}
            image
            className={classes.cardHeaderHover}
          >
            <Carousel {...settings} dots={false}>
              {images.length !== 0 ? (
                imagesDiv
              ) : (
                <div>
                  <img
                    src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg"
                    height="150"
                    width="345"
                    alt="house"
                  />
                </div>
              )}
            </Carousel>
          </CardHeader>
          <CardBody>
            <div className={classes.cardHoverUnder}>
              <Typography gutterBottom variant="headline" component="h2">
                From: {date_start}
              </Typography>
              <Typography gutterBottom variant="headline" component="p">
                To: {date_end}
              </Typography>
              <Typography gutterBottom variant="headline" component="p">
                Note: {note}
              </Typography>
              {daysLeft >= 0 && this.props.editable === true ? (
                <p>
                  You stay will start in {daysLeft} days {hoursLeft} hours{" "}
                  {minutesLeft} minutes
                </p>
              ) : null}
              <div style={{ float: "right" }}>
                {this.props.editable === true ? (
                  <div>
                    {payButton}
                    <Button onClick={this.toggleEditBooking.bind(this)}>
                      <i
                        className="fas fa-pencil-alt"
                        style={{
                          cursor: "pointer",
                          float: "right",
                          color: "black"
                        }}
                      />
                    </Button>
                    <Button onClick={this.handleDelete.bind(this, id)}>
                      <i
                        className="fas fa-times"
                        style={{
                          cursor: "pointer",
                          float: "right",
                          color: "red"
                        }}
                      />
                    </Button>
                  </div>
                ) : null}
                {isReviewed === false ? (
                  <Button
                    onClick={this.handleReviewPopup}
                    color="secondary"
                    variant="contained"
                  >
                    Review
                  </Button>
                ) : null}
              </div>
            </div>
          </CardBody>
          <BookingDiaglog
            closeDiaglog={this.toggleEditBooking.bind(this)}
            open={this.state.openEditBooking}
            isDayBlocked={isDayBlocked}
            minDateSet={this.state.minDateSet}
            currentHost={this.state.host}
            history={this.props.history}
            accommodation={this.state.accommodation}
            booking_id={this.props.booking.id}
            booking={this.props.booking}
            firstImage={this.state.images[0]}
          />
        </Card>
      </React.Fragment>
    )
  }
}

Booking.defaultProps = {
  editable: true
}

export default withSnackbar(withStyles(carouselStyle)(Booking))

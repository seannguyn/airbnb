import React, { Component } from 'react'
import axios from 'axios'
import Booking from './Booking'
import moment from 'moment'
// import Popup from "reactjs-popup";
import Forbidden from '../layout/Forbidden'
import '../../Styles/Popup.css'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import isEmpty from '../../utils/isEmpty.js'

// Rating
// import Rating from 'react-rating'
// import like from '../../assets/img/icons/like.png'
// import like_empty from '../../assets/img/icons/like_empty.png'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})

class MyBookings extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {},
      myBookings: [],
      futureStay: [], //bookings that not checkin yet
      currentStay: [], // still in the accomm
      pastStay: [], // already check in
      earliestBooking: {},
      requireReviewList: [],
      logged_in: false,
      mounted: false,
      status: 0
    }
    setTimeout(() => {
      this.setState({
        status: 1
      })
    }, 1000)
  }

  getBookings = (userID, bookingList) => {
    let res = []
    for (let i = 0; i < bookingList.length; i++) {
      if (userID === bookingList[i].booker) {
        res.push(bookingList[i])
      }
    }
    this.setState({ myBookings: res })
  }

  // separate future, past, current booking into diffent array and set state
  separateFutureCurrentPast = () => {
    let tempFutureStay = [],
      tempCurrentStay = [],
      tempPastStay = []
    let now = moment()
    const { myBookings, futureStay } = this.state
    for (let i = 0; i < myBookings.length; i++) {
      if (now.isBefore(moment(myBookings[i].date_start))) {
        tempFutureStay.push(myBookings[i])
      }
      if (
        now.isAfter(
          moment(myBookings[i].date_start) &&
            now.isBefore(myBookings[i].date_start)
        )
      ) {
        tempCurrentStay.push(myBookings[i])
      }
      if (now.isAfter(moment(myBookings[i].date_end))) {
        tempPastStay.push(myBookings[i])
      }
    }

    if(tempPastStay.length > 0) {
      this.setState({
        pastStay: tempPastStay
      })
    }

    if (futureStay.length === 0 && tempFutureStay.length > 0) {
      const earliestBooking = this.findEarliest(tempFutureStay)
      this.setState({
        futureStay: tempFutureStay,
        currentStay: tempCurrentStay,
        earliestBooking: earliestBooking
      })
    }
  }

  // find min start date in the bookings
  findEarliest = dates => {
    let earliestBookingTime = moment(dates[0].date_start).diff(moment())
    let earliestBooking
    for (let i = 0; i < dates.length; i++) {
      let diff = moment(dates[i].date_start).diff(moment(), 'minutes')
      if (diff < earliestBookingTime) earliestBooking = dates[i]
    }
    return earliestBooking
  }

  // find the past bookings that need to reviews
  requireReview = async pastStay => {
    let isReviewed = false,
      tempRequireReviewList = [],
      tempPastStay = []

    const { requireReviewList } = this.state,
      currentUser = JSON.parse(localStorage.getItem('currentUser'))

    for (let i = 0; i < pastStay.length; i++) {
      const res = await axios.get(
        `/accommodationHosting/${pastStay[i].hosting}/`
      )
      pastStay[i].accommodation = res.data.accommodation
      tempPastStay.push(pastStay[i])
    }
    for (let i = 0; i < tempPastStay.length; i++) {
      let reviews = []
      const count = await axios.get(`/reviewCounter/${tempPastStay[i].accommodation}/`)
      if (count.data.count > 0) {
        await axios
          .get(`/accommodation/${tempPastStay[i].accommodation}/reviews/`)
          .then(response => {
            reviews = response.data
          })
          .catch(error => {
            reviews = []
          })
      }

      for (let j = 0; j < reviews.length; j++) {
        if (
          tempPastStay[i].accommodation === reviews[j].accommodation &&
          tempPastStay[i].id === reviews[j].booking &&
          reviews[j].user === currentUser[0].user_id
        ) {
          isReviewed = true
        }
      }
      if (isReviewed === false) {
        tempRequireReviewList.push(tempPastStay[i])
        tempPastStay[i].isReviewed = false
      } else {
        isReviewed = false
        tempPastStay[i].isReviewed = true
        tempRequireReviewList.push(tempPastStay[i])
      }
    }

    tempRequireReviewList = tempRequireReviewList.concat(requireReviewList)
    this.setState({ requireReviewList: tempRequireReviewList })
  }

  async shouldComponentUpdate(nextProps, nextState) {
    const logged_in = localStorage.getItem('currentUser')

    if (logged_in !== null && this.state.mounted === false) {
      this.setState({
        logged_in: true,
        mounted: true
      })
      localStorage.getItem('currentUser') &&
        this.setState({
          currentUser: JSON.parse(localStorage.getItem('currentUser'))
        })
      const user = JSON.parse(localStorage.getItem('currentUser'))
      //       this.setState({currentUser: user});
      // Get all bookings and find that current user booked
      const res2 = await axios.get(`/booking/?booker=${user[0].user_id}`)

      this.getBookings(this.state.currentUser[0].user_id, res2.data)
      this.separateFutureCurrentPast()
      this.requireReview(this.state.pastStay)
      return true
    } else {
      return false
    }
  }

  async componentDidMount() {
    const logged_in = localStorage.getItem('currentUser')

    if (logged_in !== null) {
      this.setState({ logged_in: true })
      localStorage.getItem('currentUser') &&
        this.setState({
          currentUser: JSON.parse(localStorage.getItem('currentUser'))
        })
      const user = JSON.parse(localStorage.getItem('currentUser'))

      const res2 = await axios.get(`/booking/?booker=${user[0].user_id}`)

      this.getBookings(this.state.currentUser[0].user_id, res2.data)
      this.separateFutureCurrentPast()
      this.requireReview(this.state.pastStay)
    } else {
      this.setState({ logged_in: false })
    }
  }
  render() {
    const {
      myBookings,
      futureStay,
      currentStay,
      pastStay,
      earliestBooking,
      requireReviewList,
      logged_in,
      status
    } = this.state
    var nextStay = null
    if (futureStay.length > 0) {
      nextStay = futureStay[0]
    }
    const { classes } = this.props
    if (logged_in === false) {
      return <Forbidden />
    } else if (status === 0) {
      return (
        <div>
          <CircularProgress
            className={classes.progress}
            color="primary"
            size={50}
          />
        </div>
      )
    } else {
      return (
        <React.Fragment>
          <center>
            {nextStay !== null ? (
              <div>
                <center>
                  <h1>Next Stay</h1>
                </center>
                <Booking
                  key={nextStay.id}
                  booking={nextStay}
                  history={this.props.history}
                />
              </div>
            ) : null}
          </center>
          <center>
            {!isEmpty(pastStay[0]) ? (
              <div key={pastStay[0].id}>
                <center>
                  <h1>Recent Stay</h1>
                </center>
                <Booking
                  key={pastStay[0].id}
                  booking={pastStay[0]}
                  editable={false}
                  requireReviewItem={requireReviewList[0]}
                  history={this.props.history}
                />
              </div>
            ) : null}
          </center>
          {futureStay.length !== 0 ? (
            <center>
              <h1>Incoming</h1>
            </center>
          ) : null}
          <div className="row">
            {futureStay.length !== 0
              ? futureStay.map(booking => {
                  return (
                    <div key={booking.id}>
                      <div style={{ padding: '1rem' }}>
                        <center>
                          <Booking
                            key={booking.id}
                            booking={booking}
                            earliestBooking={earliestBooking}
                            history={this.props.history}
                          />
                        </center>
                      </div>
                    </div>
                  )
                })
              : null}
          </div>
          <div className="row">
            {currentStay.length !== 0 ? <h1>Current</h1> : null}
          </div>

          {requireReviewList.length !== 0 ? (
            <center>
              <h1>In The Past</h1>
            </center>
          ) : null}

          <div className="row">
            {requireReviewList.length !== 0
              ? requireReviewList.map(booking => {
                  return (
                    <div key={booking.id}>
                      <div key={booking.id} style={{ padding: '1rem' }}>
                        <center>
                          <Booking
                            key={booking.id}
                            booking={booking}
                            editable={false}
                          />
                        </center>
                      </div>
                    </div>
                  )
                })
              : null}
          </div>
          <div className="row">
            {myBookings.length !== 0 ? null : (
              <p>You have not booked any accommodation with us</p>
            )}
          </div>
        </React.Fragment>
      )
    }
  }
}
export default withStyles(styles)(MyBookings)

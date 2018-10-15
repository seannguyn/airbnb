import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'
import BookingInfo from '../Booking/BookingInfo'
import Price from '../AccommodationDetail/Price'
import Divider from '@material-ui/core/Divider'
import Overview from '../Booking/Overview'
import Days from '../Booking/Days'
import Amenities from '../Booking/Amenities'
import Reminder from '../Booking/Reminder'
import 'react-credit-cards/es/styles-compiled.css'
import axios from 'axios'
import { withSnackbar } from 'notistack'
import {
  enumerateDaysBetweenDates,
  removeString,
  concatString
} from '../Helper/Helper'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const styles = theme => ({})

class OverallBooking extends React.Component {
  state = {
    value: 0
  }

  async postBooking(detail, booker) {
    const note = 'hello'

    if (this.props.location.state.booking_id > 0) {
      const { booking_id, booking } = this.props.location.state
      const date_free = enumerateDaysBetweenDates(
        booking.date_start,
        booking.date_end
      )
      const res_temp = await axios.get(`/search/${detail.accommodation.id}/`)

      const newDateFree_temp = concatString(res_temp.data.date_free, date_free)

      const searchAccommodationTemp = {
        date_free: newDateFree_temp
      }

      await axios.patch(
        `/search/${detail.accommodation.id}/`,
        searchAccommodationTemp
      )

      await axios.delete(`/booking/${booking_id}/`)
    }

    const newBooking = {
      booker: booker,
      hosting: detail.currentHost.id,
      date_start: detail.startDate,
      date_end: detail.endDate,
      date_paymentDue: detail.paidDate,
      isPaid: false,
      guest: detail.guest,
      note
    }

    // * REMOVE FROM SEARCH DB
    const { startDate, endDate } = this.props.location.state.detail

    const res = await axios.get(`/search/${detail.accommodation.id}/`)
    const newDateFree = removeString(res.data.date_free, startDate, endDate)

    const searchAccommodation = {
      date_free: newDateFree
    }

    await axios.patch(
      `/search/${detail.accommodation.id}/`,
      searchAccommodation
    )
    // * REMOVE FROM SEARCH DB

    const booking = await axios.post('/booking/', newBooking)

    this.props.history.push({
      pathname: `/overallbooking/payment/${detail.currentHost.id}`,
      search: '?query=abc',
      state: {
        detail: detail,
        booker: booker,
        booking: booking.data,
        firstImage: this.props.location.state.firstImage
      }
    })

    this.props.onPresentSnackbar('success', 'Booking has been reserved')
  }

  render() {
    const { theme } = this.props
    console.log('PROPS: ', this.props)
    if (typeof this.props.location.state !== 'undefined') {
      const { detail, booker, firstImage } = this.props.location.state
      const price = (
        <Price
          pricePerNight={parseFloat(detail.price.pricePerNight)}
          daysDiff={parseFloat(detail.price.daysDiff)}
          promotion={parseFloat(detail.price.promotion)}
        />
      )

      return (
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab
                label="Review Detail"
                icon={
                  <CheckIcon hidden={this.state.value > 0 ? false : true} />
                }
                disabled={this.state.value === 0 ? false : true}
              />
              <Tab
                label="Payment"
                icon={
                  <CheckIcon hidden={this.state.value > 1 ? false : true} />
                }
                disabled={this.state.value === 1 ? false : true}
              />
              <Tab
                label="Confirmation"
                disabled={this.state.value === 2 ? false : true}
              />
            </Tabs>
          </AppBar>
          <div className="container">
            <div className="row">
              <div className="col-8">
                <SwipeableViews>
                  <TabContainer dir={theme.direction}>
                    <Overview
                      accommodation={detail.accommodation}
                      guest={detail.guest}
                    />

                    <Divider />
                    <Divider />

                    <Days
                      daysDiff={detail.price.daysDiff}
                      city={detail.accommodation.addr_city}
                      startDate={detail.startDate}
                      endDate={detail.endDate}
                      checkIn={detail.currentHost.check_in}
                      checkOut={detail.currentHost.check_out}
                    />

                    <Divider />
                    <Divider />
                    <Amenities accommodation={detail.accommodation} />

                    <Divider />
                    <Divider />

                    <Reminder />

                    <Divider />

                    <div className="row" style={{ marginTop: '20px' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.postBooking.bind(this, detail, booker)}
                      >
                        Agree and Continue
                      </Button>
                    </div>
                  </TabContainer>
                </SwipeableViews>
              </div>
              <div className="col-4">
                <BookingInfo
                  price={price}
                  detail={detail}
                  firstImage={firstImage}
                />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>Illegal to refresh</h1>
    }
  }
}

export default withSnackbar(
  withStyles(styles, { withTheme: true })(OverallBooking)
)

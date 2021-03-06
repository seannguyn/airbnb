import React from 'react'
import CardForm from './CardForm'
import PaymentOptions from './PaymentOptions'
import axios from 'axios'
import uuid from 'uuid'
import Button from '@material-ui/core/Button'

class Payment extends React.Component {
  state = {
    payment: 'credit',
    credit: {
      card_number: '',
      name: '',
      valid: '',
      cvc: ''
    }
  }

  async submitPayment() {
    const { booking } = this.props
    const paidBooking = {
      id: booking.id,
      isPaid: true,
      booker: booking.booker,
      hosting: booking.hosting,
      date_start: booking.date_start,
      date_end: booking.date_end,
      guest: booking.guest,
      note: 'Paid pp...'
    }
    await axios.put(`/booking/${booking.id}/`, paidBooking)

    const { detail, booker } = this.props

    // axios images
    const image = await axios.get(
      `/accommodationImage/?accommodation=${detail.accommodation.id}`
    )

    this.props.previous.history.push({
      pathname: `/overallbooking/confirm/${detail.currentHost.id}`,
      search: '?query=abc',
      state: {
        detail: detail,
        booker: booker,
        firstImage: image.data[0]
      }
    })
  }

  changePayment(payment) {
    this.setState({ payment: payment })
  }

  onChange(credit) {
    this.setState({
      credit
    })
  }

  getPayment(payment) {
    var stuff = []
    if (payment === 'credit') {
      stuff.push(
        <CardForm
          key={uuid.v4()}
          onChange={this.onChange.bind(this)}
          submitPayment={this.submitPayment.bind(this)}
          handleChange={this.props.handleChange}
        />
      )
    }
    //
    else if (payment === 'paypal') {
      stuff.push(
        <Button
          key={uuid.v4()}
          onClick={this.submitPayment.bind(this)}
          color="primary"
          variant="contained"
        >
          Pay with Paypal
        </Button>
      )
    }

    return stuff
  }

  render() {
    const { payment } = this.state
    const stuff = this.getPayment(payment)
    return (
      <div>
        <PaymentOptions changePayment={this.changePayment.bind(this)} />
        {stuff}
      </div>
    )
  }
}

export default Payment

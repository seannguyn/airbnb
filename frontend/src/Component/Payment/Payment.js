import React from "react"
import CardForm from "./CardForm"
import PaymentOptions from "./PaymentOptions"
import axios from "axios"
import uuid from "uuid"

class Payment extends React.Component {
  state = {
    payment: "credit",
    credit: {
      card_number: "",
      name: "",
      valid: "",
      cvc: ""
    }
  }

  submitPayment() {
    console.log("credit card:        ", this.state.credit)
    const { booking } = this.props
    const paidBooking = {
      id: booking.id,
      isPaid: true,
      booker: booking.booker,
      hosting: booking.hosting,
      date_start: booking.date_start,
      date_end: booking.date_end,
      guest: booking.guest,
      note: "Paid pp..."
    }
    axios.put(`/booking/${booking.id}/`, paidBooking)

    const { detail, booker } = this.props

    this.props.previous.history.push({
      pathname: `/overallbooking/confirm/${detail.currentHost.id}`,
      search: "?query=abc",
      state: {
        detail: detail,
        booker: booker
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
    if (payment === "credit") {
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
    else if (payment === "paypal") {
      stuff.push(<h1 key={uuid.v4()}>hihihi</h1>)
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

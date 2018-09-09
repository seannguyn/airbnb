import React from 'react'
import PropTypes from 'prop-types'

class OverallBooking extends React.Component {
  render () {
    const {detail} = this.props.location.state
    console.log("PROCESS PAYMENT",detail);
    return (
      <div>
        <h1>User finalise Booking, Payment here</h1>
      </div>
    )
  }
}

export default OverallBooking;

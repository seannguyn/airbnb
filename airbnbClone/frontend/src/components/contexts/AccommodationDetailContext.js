import React from 'react'
import axios from 'axios';
import moment from 'moment';

import AccommodationDetail from '../accomodation/AccommodationDetail'
import {Consumer} from '../../Context.js'


class AccommodationDetailContext extends React.Component {

  // find dates between 2 dates
  datesInPeriod = (startDate, endDate) => {
    let dates = [];
    let currDate = startDate, lastDate = endDate;

    dates.push(currDate.clone());
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(currDate.clone());
    }
    dates.push(lastDate.clone());

    return dates;
  };

  constructor(props) {
    super(props);
    this.state = {
      accommodation: {},
      accommodationHosting: {},
      booking: [],
      minDateSet: [],
    }
  }

  // the calendar will block dates that been booked
  blockBookedPeriod(bookingList) {

    let startDate, endDate;
    let currentPeriod = [];
    let tempBookedPeriods = [];
    let minDateSet = [];

    for (let i = 0; i < bookingList.length; i++) {
      startDate = bookingList[i].date_start;
      endDate = bookingList[i].date_end;
      startDate = moment(startDate);
      endDate = moment(endDate);
      currentPeriod = this.datesInPeriod(startDate, endDate);

      tempBookedPeriods = tempBookedPeriods.concat(currentPeriod);
      minDateSet = this.state.minDateSet;

      minDateSet.push(currentPeriod[0]);
    }

    this.setState({minDateSet: minDateSet})
    this.setState({booking: tempBookedPeriods});
  }

  componentDidMount() {
    const {id} = this.props.match.params;

    const res1 = axios.get(`/accommodation/${id}/`);
    this.setState({accommodation: res1.data}, () => {
      console.log("rest in peace", this.state.accommodation)
    });

    const res2 = axios.get(`/accommodationHosting/?accomm=${id}`);
    this.setState({accommodationHosting: res2.data[0]}, () => {
      console.log("rest in just fix", this.state.accommodationHosting)
    });

    const res3 = axios.get(`/booking/?host=${this.state.accommodationHosting.id}`);
    this.blockBookedPeriod(res3.data)
  }

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <AccommodationDetail
              props={this.props}
              id={this.props.match.params}
              context={value}
              history={this.props.history}
              accommodation={this.state.accommodation}
              accommodationHosting={this.state.accommodationHosting}
              booking={this.state.booking}
              minDateSet={this.state.minDateSet} />
          )
        }}
      </Consumer>
    )
  }
}

export default AccommodationDetailContext;

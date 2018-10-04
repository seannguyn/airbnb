import React from 'react'

import AccommodationDetail from '../AccommodationDetail/AccommodationDetail'
import {Consumer} from '../../Context.js'
import axios from 'axios';
import moment from 'moment';


class AccommodationDetailContext extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      accommodation: {},
      accommodationHosting: {},
      booking: [],
      minDateSet: [],
      reviews: [],
      images: [],
    }

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

  // the calendar will block dates that been booked
  blockBookedPeriod(bookingList) {

      let startDate, endDate;
      let  currentPeriod = [];
      var tempBookedPeriods = [];
      var minDateSet=[];
      for( let i = 0; i < bookingList.length; i++){
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
      // console.log(tempBookedPeriods,"booked period");
      // console.log(this.state.minDateSet,"min date");
      this.setState({booking: tempBookedPeriods});
  }

  async componentDidMount() {


    const {id} = this.props.match.params;

    const res1 = await axios.get(`https://localhost:8000/accommodation/${id}/`)
    this.setState({accommodation:res1.data})


    const res2 = await axios.get(`https://localhost:8000/accommodationHosting/?accomm=${id}`)
    this.setState({accommodationHosting:res2.data[0]})

    const res3 = await axios.get(`https://localhost:8000/booking/?host=${this.state.accommodationHosting.id}`)
    this.blockBookedPeriod(res3.data)

    // axios review, pass review down
    const res4 = await axios.get(`https://localhost:8000/accommodation/${id}/reviews/`)
    this.setState({reviews: res4.data})


    // axios images
    const res5 = await axios.get(`https://localhost:8000/accommodationImage/?accommodation=${id}`)
    this.setState({images: res5.data},()=>{console.log("WE HAVE IMAGE",this.state.images)})


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
              minDateSet={this.state.minDateSet}
              reviews={this.state.reviews}
              images={this.state.images}
              />
          )
        }}
      </Consumer>

    )
  }

}

export default AccommodationDetailContext;
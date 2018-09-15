import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import isAfterDay from './utils/isAfterDay';
import {Consumer} from '../../Context.js';
import BookingPaper from './BookingPaper'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});


class AccommodationDetail extends Component {

    constructor(){
        super()
        this.state = {
            accomDetail: {},
            currentHost: {},
            bookedPeriods: [], //periods that this accomm booked to block the date
            minDateSet: [],
            minDate: {},
            status: 0,
        }
	}

    // check if object is empty
    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    async componentDidMount(){
        this.setState({currentHost: this.props.accommodationHosting})
        this.setState({accomDetail: this.props.accommodation});
        // this.blockBookedPeriod(this.props.booking);
    }

    findMax(minDateSet) {
      var max = minDateSet[0];
      for (var i = 0; i < minDateSet.length ; i++) {
        if(isAfterDay(minDateSet[i],max) === true) {
            max = minDateSet[i].clone();
          }
      }
      return max;
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextState.status === 1) {
          this.props = nextProps;
          console.log("Should Component update", this.props, this.state);
          return true;
        } else {
          return false;
        }
    }

    render() {
        // console.log("props acom detail: ", this.state);
        const { classes } = this.props;
        // const {Accommodation_Type, area, bathroom,
        //         bedroom, bedroom_master, carpark, kitchen, description} = this.state.accomDetail;
        const {bathroom,bedroom,kitchen,carpark,description} = this.state.accomDetail
        // const {currentHost} = this.state;
        const isDayBlocked = day => this.props.booking.filter(d => d.isSame(day, 'day')).length > 0;
        const {status} = this.state;
        console.log(this.props,"here it is",this.state);
        return (
          <Consumer>
            {value =>{


              if (status === 0 ) {
                return(
                  <div>
                    <CircularProgress className={classes.progress} color="primary" size={50}/>
                  </div>
                )
              } else {
                return (
                  <div>
                    <img src="https://cdn.photographylife.com/wp-content/uploads/2010/04/20100415-Dead-Horse-Point-040.jpg" className="img-fluid" alt="Responsive" style={{width:'100%'}}/>

                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                        </div>
                      </div>
                        <div className="row">
                            <div className="col-8">
                                <div><h1>House Name Here</h1></div>
                                <div className="description">
                                    <h4>Description: {description}</h4>
                                </div>
                                <div className="row">
                                    <i className="fas fa-bed"> {bedroom} bedrooms</i>&#160;
                                    <i className="fas fa-bath"> {bathroom} bathrooms</i>&#160;
                                    <i className="fas fa-utensils"> {kitchen} kitchens</i>&#160;
                                    <i className="fas fa-car"> {carpark} carparks</i>&#160;
                                </div>
                            </div>
                            <div className="col-4">
                                <div style={{paddingTop:'3rem'}}>
                                    <BookingPaper
                                      isDayBlocked={isDayBlocked}
                                      minDateSet={this.props.minDateSet}
                                      context={value}
                                      currentHost={this.props.accommodationHosting}
                                      history={this.props.history}
                                      accommodation={this.props.accommodation}
                                      />
                                </div>
                            </div>
                        </div>

                      </div>
                      </div>
                 );
              }

            }}
          </Consumer>
        )
    }
}
export default withStyles(styles)(AccommodationDetail);

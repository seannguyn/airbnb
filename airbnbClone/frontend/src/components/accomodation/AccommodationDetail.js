import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {Consumer} from '../../Context.js';
import BookingPaper from './BookingPaper'

import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class AccommodationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accomDetail: {},
      currentHost: {},

      bookedPeriods: [], //periods that this accomm booked to block the date
      minDateSet: [],
      minDate: {},
      status: 0,
    };
    setTimeout(() => {
      this.setState({
        status: 1
      });
    }, 1000);
  }

  componentDidMount() {
    this.setState({currentHost: this.props.accommodationHosting})
    this.setState({accomDetail: this.props.accommodation});
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextState.status === 1) {
      this.props = nextProps;
      console.log("Should Component update", this.props, this.state);
      return true;
    }

    return false;
  }

  render() {
    const {classes} = this.props;
    const {bathroom, bedroom, kitchen, carpark, description} = this.state.accomDetail

    const isDayBlocked = day => this.props.booking.filter(d => d.isSame(day, 'day')).length > 0;
    const {status} = this.state;
    console.log(this.props, "here it is", this.state);
    return (
      <Consumer>
        {value => {


          if (status === 0) {
            return (
              <div>
                <CircularProgress className={classes.progress} color="primary" size={50}/>
              </div>
            )
          } else {
            return (
              <div>
                <img src="https://cdn.photographylife.com/wp-content/uploads/2010/04/20100415-Dead-Horse-Point-040.jpg"
                     className="img-fluid" alt="Responsive" style={{width: '100%'}}/>

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
                      <div style={{paddingTop: '3rem'}}>
                        <BookingPaper
                          isDayBlocked={isDayBlocked}
                          minDateSet={this.props.minDateSet}
                          context={value}
                          currentHost={this.props.accommodationHosting}
                          history={this.props.history}
                          accommodation={this.props.accommodation}/>
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

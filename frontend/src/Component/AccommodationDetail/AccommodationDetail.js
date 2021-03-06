import React, { Component } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import isAfterDay from './utils/isAfterDay'
import { Consumer } from '../../Context.js'
import BookingPaper from './BookingPaper'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReviewComponent from '../Review/ReviewComponent'
// Image Slider
import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'
import carouselStyle from 'assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx'
import Carousel from 'react-slick'
import '../../Styles/ImageSlide.css'
import Maps from '../GoogleMap/Maps'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class AccommodationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accomDetail: {},
      currentHost: {},

      bookedPeriods: [], //periods that this accomm booked to block the date
      minDateSet: [],
      minDate: {},
      status: 0
    }
    setTimeout(() => {
      this.setState({
        status: 1
      })
    }, 1000)
  }

  // check if object is empty
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  async componentDidMount() {
    this.setState({ currentHost: this.props.accommodationHosting })
    this.setState({ accomDetail: this.props.accommodation })
    // this.blockBookedPeriod(this.props.booking);
  }

  findMax(minDateSet) {
    var max = minDateSet[0]
    for (var i = 0; i < minDateSet.length; i++) {
      if (isAfterDay(minDateSet[i], max) === true) {
        max = minDateSet[i].clone()
      }
    }
    return max
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.status === 1) {
      this.props = nextProps
      return true
    } else {
      return false
    }
  }

  render() {
    const { classes, accommodation } = this.props
    const { longitude, latitude, id } = accommodation

    // IMAGES ======
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      adaptiveHeight: true
    }

    // Map image in images array to div tto display as slider
    let imagesDiv = [],
      firstImage = this.props.images[0]
    this.props.images.map(image => {
      imagesDiv.push(
        <div key={image.id}>
          <img src={image.a_image} height="150" width="345" alt="hostingimg" />
        </div>
      )
      return 0
    })

    const isDayBlocked = day =>
      this.props.booking.filter(d => d.isSame(day, 'day')).length > 0
    const { status } = this.state
    const {
      bathroom,
      bedroom,
      bed,
      title,
      description
    } = this.props.accommodation
    return (
      <Consumer>
        {value => {
          if (status === 0) {
            return (
              <div className="row">
                <div className="col-md-2 col-md-offset-5">
                  <CircularProgress
                    className={classes.progress}
                    color="primary"
                    size={50}
                  />
                </div>
              </div>
            )
          } else {
            return (
              <div>
                <div className="container">
                  <div className="row" />
                  <div className="row">
                    <div className="col-8">
                      <div className="description" style={{ margin: '20px' }}>
                        <h3>{title}</h3>
                      </div>
                      <div className="row" style={{ margin: '20px' }}>
                        <i className="fas fa-door-open"> {bedroom} bedrooms</i>
                        &#160;
                        <i className="fas fa-bed"> {bed} bed</i>
                        &#160;
                        <i className="fas fa-bath"> {bathroom} bathrooms</i>
                        &#160;
                      </div>
                      <div className="row">
                        <div className="col-3" />
                        <div className="col-6">
                          <Carousel {...settings} dots={false}>
                            {this.props.images.length !== 0 ? (
                              imagesDiv
                            ) : (
                              <div>
                                <img
                                  src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg"
                                  height="150"
                                  width="345"
                                  alt="noimage"
                                />
                              </div>
                            )}
                          </Carousel>
                        </div>
                        <div className="col-3" />
                      </div>
                      <div className="description">
                        <h4>Description</h4> <br />
                        <h4>{description}</h4>
                      </div>
                    </div>
                    <div className="col-4">
                      <div style={{ paddingTop: '3rem' }}>
                        <BookingPaper
                          isDayBlocked={isDayBlocked}
                          minDateSet={this.props.minDateSet}
                          context={value}
                          currentHost={this.props.accommodationHosting}
                          history={this.props.history}
                          accommodation={this.props.accommodation}
                          firstImage={firstImage}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <Maps
                        latitude={latitude}
                        longitude={longitude}
                        accommodation={id}
                      />
                    </div>
                    <div className="col-4" />
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <ReviewComponent review={this.props.reviews} />
                    </div>
                    <div className="col-4" />
                  </div>
                </div>
              </div>
            )
          }
        }}
      </Consumer>
    )
  }
}

export default withStyles(styles, carouselStyle, dashboardStyle)(
  AccommodationDetail
)

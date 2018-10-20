import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'
import { Link } from 'react-router-dom'

// Material UI components
import Card from 'Component/Card/Card.jsx'
import CardBody from 'Component/Card/CardBody.jsx'
import CardHeader from 'Component/Card/CardHeader.jsx'
import CardFooter from 'Component/Card/CardFooter.jsx'
import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'
import { withStyles } from '@material-ui/core/styles'

// Image Slider
import carouselStyle from 'assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx'
import Carousel from 'react-slick'
import '../../Styles/ImageSlide.css'

// Rating
import Rating from 'react-rating'
import like from '../../assets/img/icons/like.png'
import like_empty from '../../assets/img/icons/like_empty.png'
import starCalculator from '../../utils/starCalculator'

export class PlaceInfoWindow extends Component {
  render() {
    const {
      Accomodation_Type,
      name,
      price,
      reviews,
      images,
      classes,
      accommodation,
      address
    } = this.props
    var avgRating = 0
    if (reviews !== undefined) avgRating = starCalculator(reviews)
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    }

    let imagesDiv = []
    images.map(image => {
      imagesDiv.push(
        <div key={image.id}>
          <img src={image.a_image} height="150" width="345" alt="hostingimg" />
        </div>
      )
      return 0
    })

    return (
      <InfoWindow onClose={this.onInfoWindowClose}>
        <div>
          <Card
            product
            className={classes.cardHover}
            style={{ width: '20vw', height: '22vw' }}
          >
            <Link to={`/accommodations/${accommodation}`}>
              <CardHeader style={{ marginBottom: '0rem' }} image>
                <Carousel {...settings} dots={false}>
                  {images.length !== 0 ? (
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
              </CardHeader>
            </Link>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <h2
                  className={classes.cardProductTitle}
                  style={{ margin: '15px' }}
                >
                  {name}
                </h2>
                <h4
                  className={classes.cardProductTitle}
                  style={{ margin: '10px' }}
                >
                  {address}
                </h4>
                <h4>{Accomodation_Type}</h4>

                {reviews !== undefined ? (
                  <div>
                    <Rating
                      readonly={true}
                      initialRating={avgRating}
                      emptySymbol={
                        <img src={like_empty} className="icon" alt="empty" />
                      }
                      fullSymbol={
                        <img src={like} className="icon" alt="full" />
                      }
                    />
                  </div>
                ) : (
                  <Rating
                    readonly={true}
                    initialRating={0}
                    emptySymbol={
                      <img src={like_empty} className="icon" alt="empty" />
                    }
                    fullSymbol={<img src={like} className="icon" alt="full" />}
                  />
                )}
              </div>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                {/* <Typography gutterBottom variant="headline" component="h6"> */}
                <h4>
                  ${price}
                  /night
                </h4>
                {/* </Typography> */}
              </div>
            </CardFooter>
          </Card>
        </div>
      </InfoWindow>
    )
  }
}
export default withStyles(dashboardStyle, carouselStyle)(PlaceInfoWindow)

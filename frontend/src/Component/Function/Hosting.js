import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import ReviewPreview from '../Popup/ReviewPreview'

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

class Hosting extends React.Component {
  showReview = () => {
    this.setState({ seeReviews: !this.state.seeReviews })
  };

  starCalculator = reviews => {
    if (reviews.length === 0) return 0;
    let avgRating = 0;
    for (let key in reviews) {
      if (reviews.hasOwnProperty(key)) avgRating += reviews[key].star
    }
    return avgRating / reviews.length
  };

  // find this accomm's images
  findImagesByAccommID = (images, accommID) => {
    const retImages = [];
    for (let i = 0; i < images.length; i++) {
      if (accommID === images[i].accommodation) {
        retImages.push(images[i])
      }
    }
    this.setState({ images: retImages })
  };

  constructor(props) {
    super(props);
    this.state = {
      reviews: {},
      seeReviews: false,
      id: '',
      images: []
    }
  }

  async componentDidMount() {
    const { id } = this.props.house;
    let reviews = [];

    const count = await axios.get(`/reviewCounter/${id}/`);

    if (count.data.count > 0) {
      await axios
        .get(`/accommodation/${id}/reviews/`)
        .then(response => {
          reviews = response.data;
          if (reviews.length > 0) this.setState({ reviews: reviews })
        })
        .catch(error => {
          console.log(
            'Error retrieving reviews for hosting ',
            id,
            ': ',
            error.response
          )
        })
    }

    const images = await axios.get('/accommodationImage/');
    this.findImagesByAccommID(images.data, this.props.house.id)
  }

  render() {
    const { house, SingleHost, classes } = this.props;
    const { images, reviews } = this.state;
    const { id } = house;

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      className: "p-3"
    };

    const EmptyImage = () => {
      return (
        <Carousel {...settings} dots={false}>
          <img
            src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg"
            height="150"
            width="345"
            alt="empty"
          />
        </Carousel>
      )
    };

    const ImageCarousel = () => {
      // Map image in images array to div
      let imagesDiv = [];
      images.map(image => {
        imagesDiv.push(
          <div key={image.id}>
            <img src={image.a_image} height="150" width="345" alt="hostingimg"/>
          </div>
        );
        return 0
      });
      return (
        <Carousel {...settings} dots={false}>{imagesDiv}</Carousel>
      )
    };

    const ReviewSummary = () => {
      const avgRating = this.starCalculator(reviews);
      const count = reviews.length;
      return (
        <div>
          <Rating
            readonly={true}
            initialRating={avgRating}
            emptySymbol={<img src={like_empty} className="icon" alt="emptyicon" />}
            fullSymbol={<img src={like} className="icon" alt="fullicon" />}
          />
          <br />
          <Link to="" onClick={this.showReview}>
            {avgRating > 0 ? <h5>{count} {count > 1 ? "reviews":"review"}</h5> : null}
          </Link>
        </div>
      )
    };

    return (
      <div className="mx-2">

        <Card product={true} className={classes.cardHover}
         style={{ width: '20vw', height: '40vh' }}
        >
          <CardHeader style={{ marginBottom: '0rem' }} image>
            <Link to={`/accommodations/${id}`}>
              {images.length === 0 ? <EmptyImage /> : <ImageCarousel />}
            </Link>
          </CardHeader>

          <CardBody>
            <div className={classes.cardHoverUnder}>
              <h2 className={classes.cardProductTitle} style={{margin:'15px'}}>{house.title}</h2>
              <h4 className={classes.cardProductTitle} style={{margin:'10px'}}>{house.address}</h4>
              <h4>{house.Accomodation_Type}</h4>

              <ReviewSummary/>
              <ReviewPreview
                open={this.state.seeReviews}
                handleClose={this.showReview}
                reviews={reviews}
              />
            </div>
          </CardBody>

          <CardFooter product style={{marginTop:'10px'}}>
            <div className={classes.price}>
              <h4>
                ${SingleHost.price}/night
              </h4>
            </div>
          </CardFooter>
        </Card>

      </div>
    )
  }
}

export default withStyles(dashboardStyle, carouselStyle)(Hosting)

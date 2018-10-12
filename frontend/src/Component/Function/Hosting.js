import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Review from '../Review/Review'
// Material UI components
import Card from 'Component/Card/Card.jsx'
import CardBody from 'Component/Card/CardBody.jsx'
import CardHeader from 'Component/Card/CardHeader.jsx'
import CardFooter from 'Component/Card/CardFooter.jsx'
import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'
import {withStyles} from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
// Image Slider
import carouselStyle from 'assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx'
import Carousel from 'react-slick'
import '../../Styles/ImageSlide.css'
// Rating
import Rating from 'react-rating'
import like from '../../assets/img/icons/like.png'
import like_empty from '../../assets/img/icons/like_empty.png'

// const styles = {
//   card: {
//     maxWidth: 300,
//   },
//   media: {
//     height: 140,
//   },
// };

class Hosting extends React.Component {

  handleExpand = () => {
    this.setState({showHosting: !this.state.showHosting})
  };

  handleExpandReviews = () => {
    this.setState({seeReviews: !this.state.seeReviews})
  };

  showReview = () => {
    this.setState({seeReviews: !this.state.seeReviews})
  };

  starCalculator = (reviews) => {
    if (reviews.length === 0) return 0;
    let avgRating = 0;
    for (let key in reviews) {
      if (reviews.hasOwnProperty(key))
        avgRating += reviews[key].star
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
    this.setState({images: retImages})
  };

  constructor(props) {
    super(props);
    this.state = {
      showHosting: false,
      reviews: {},
      seeReviews: false,
      id: '',
      images: []
    }
  }

  async componentDidMount() {
    const {id} = this.props.house;
    let reviews = [];

    const count = await axios.get(`/reviewCounter/${id}/`);

    if (count.data.count > 0) {
      await axios
        .get(`/accommodation/${id}/reviews/`)
        .then(response => {
          reviews = response.data;
          if (reviews.length > 0) this.setState({reviews: reviews})
        })
        .catch(error => {
          console.log("Error retrieving reviews for hosting ", id, ": ", error.response);
        })
    }

    const images = await axios.get('/accommodationImage/');
    this.findImagesByAccommID(images.data, this.props.house.id)
  }

  render() {
    const {house, SingleHost, classes} = this.props;
    const {images, reviews} = this.state;
    const id = house;

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    };

    const EmptyImage = () => {
      return (
        <div>
          <img
            src="http://www.vanislandrealty.com/inc/snippets/default/property-search/img/no-image.jpg"
            height="150"
            width="345"
            alt="noimage"
          />
        </div>
      )
    };

    const ImageDivs = () => {
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
      return imagesDiv
    };

    const ReviewSummary = () => {
      const avgRating = this.starCalculator(reviews);
      return (
        <div>
          <Rating
            readonly="true"
            initialRating={avgRating}
            emptySymbol={<img src={like_empty} className="icon" alt="emptyicon"/>}
            fullSymbol={<img src={like} className="icon" alt="fullicon"/>}
          />
          <br/>
          <Link to="" onClick={this.handleExpandReviews}>
            {avgRating > 0 ? <h5>{reviews.length} Reviews</h5> : null}
          </Link>
        </div>
      )
    };

    return (
      <div style={{padding: '1rem'}}>
        <Card
          product="true"
          className={classes.cardHover}
          style={{width: '20vw', height: '22vw'}}>

          <Link to={`/accommodations/${id}`}>
            <CardHeader style={{marginBottom: '0rem'}} image>
              <Carousel {...settings} dots={false}>
                {images.length === 0 ? <EmptyImage/> : ImageDivs(images)}
              </Carousel>
            </CardHeader>
          </Link>

          <CardBody>
            <div className={classes.cardHoverUnder}>
              <h4 className={classes.cardProductTitle}>
                {house.address}
              </h4>
              <h4>{house.Accomodation_Type}</h4>
              <ReviewSummary />

              {this.state.seeReviews ? (
                <CardContent>
                  {reviews.map(review => (
                    <Review
                      key={review.id}
                      accommodation={review.accommodation}
                      star={review.star}
                      user={review.username}
                      review={review.review}
                      text="Close"
                      closeReview={this.showReview}
                    />
                  ))}
                </CardContent>
              ) : null}
            </div>
          </CardBody>

          <CardFooter product>
            <div className={classes.price}>
              {/* <Typography gutterBottom variant="headline" component="h6"> */}
              <h4>
                ${SingleHost.price}/night
              </h4>
              {/* </Typography> */}
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

export default withStyles(dashboardStyle, carouselStyle)(Hosting)

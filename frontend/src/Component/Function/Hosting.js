import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Review from "../Review/Review"

// Material UI components
import Card from "Component/Card/Card.jsx"
import CardBody from "Component/Card/CardBody.jsx"
import CardHeader from "Component/Card/CardHeader.jsx"
import CardFooter from "Component/Card/CardFooter.jsx"
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle"
import { withStyles } from "@material-ui/core/styles"
import CardContent from "@material-ui/core/CardContent"

// Image Slider
import carouselStyle from "assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.jsx"
import Carousel from "react-slick"
import "../../Styles/ImageSlide.css"

// Rating
import like from "../../assets/img/icons/like.png"
import like_empty from "../../assets/img/icons/like_empty.png"

// const styles = {
//   card: {
//     maxWidth: 300,
//   },
//   media: {
//     height: 140,
//   },
// };

class Hosting extends React.Component {
  constructor() {
    super()
    this.state = {
      showHosting: false,
      reviews: {},
      seeReviews: false,
      id: "",
      images: []
    }
  }

  handleExpand() {
    this.setState({ showHosting: !this.state.showHosting })
  }

  starCalculator(reviews) {
    let avgRating = 0
    for (let key in reviews) {
      if (reviews.hasOwnProperty(key)) {
        avgRating = avgRating + reviews[key].star
      }
    }
    return avgRating / reviews.length
  }

  showReview = () => {
    this.setState({ seeReviews: !this.state.seeReviews })
  }

  // find this accomm's images
  findImagesByAccommID = (images, accommID) => {
    const retImages = []
    for (let i = 0; i < images.length; i++) {
      if (accommID === images[i].accommodation) {
        retImages.push(images[i])
      }
    }
    this.setState({ images: retImages })
  }

  async componentDidMount() {
    const { id } = this.props.house
    var reviews = []
    var err

    const count = await axios.get(`/reviewCounter/${id}/`)

    if (count.data.count > 0) {
      await axios
        .get(`/accommodation/${id}/reviews/`)
        .then(response => {
          reviews = response.data
        })
        .catch(error => {
          err = error.response
        })
    }

    if (err == null && reviews.length > 0) {
      this.setState({ reviews: reviews })
    }

    const images = await axios.get("/accommodationImage/")
    this.findImagesByAccommID(images.data, this.props.house.id)
  }

  render() {
    const readonly = true
    const { house, SingleHost } = this.props
    const { id } = this.props.house
    const { images, reviews } = this.state
    const avgRating = this.starCalculator(reviews)
    const { classes } = this.props
    let Rating = require("react-rating")
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    }

    // Map image in images array to div
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
      <div style={{ padding: "1rem" }}>
        <Card
          product
          className={classes.cardHover}
          style={{ width: "20vw", height: "22vw" }}
        >
          <Link to={`/accommodations/${id}`}>
            <CardHeader style={{ marginBottom: "0rem" }} image>
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
              <h4 className={classes.cardProductTitle}>
                {house.address}
                <i
                  onClick={this.handleExpand.bind(this)}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
              </h4>
              {/* <p className={classes.cardProductDesciprion}> */}
              <h4>{house.Accomodation_Type}</h4>
              {reviews.length > 0 ? (
                <div>
                  <Rating
                    readonly={readonly}
                    initialRating={avgRating}
                    emptySymbol={
                      <img src={like_empty} className="icon" alt="emptyicon" />
                    }
                    fullSymbol={
                      <img src={like} className="icon" alt="fullicon" />
                    }
                  />
                  <Link
                    to=""
                    onClick={() =>
                      this.setState({ seeReviews: !this.state.seeReviews })
                    }
                  >
                    ({reviews.length})
                  </Link>
                </div>
              ) : (
                <Rating
                  readonly={readonly}
                  initialRating={0}
                  emptySymbol={
                    <img src={like_empty} className="icon" alt="emptyicon" />
                  }
                  fullSymbol={
                    <img src={like} className="icon" alt="fullicon" />
                  }
                />
              )}
              {this.state.seeReviews ? (
                <CardContent>
                  {reviews.map(review => (
                    <Review
                      key={review.id}
                      accommodation={review.accommodation}
                      star={review.star}
                      user={review.user}
                      review={review.review}
                      text="Close"
                      closeReview={this.showReview.bind(this)}
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
                ${SingleHost.price}
                /night
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

import React from 'react'
import { Consumer } from '../../Context'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardBody from 'Component/Card/CardBody.jsx'
import CardHeader from 'Component/Card/CardHeader.jsx'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

// Image Slider
import Carousel from 'react-slick'
import '../../Styles/ImageSlide.css'
import axios from 'axios'
import api from '../Services/api'
import findImagesByAccommID from '../../utils/findImagesByAccommID'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
}

class House extends React.Component {
  constructor() {
    super()
    this.state = {
      showDetail: false, // flag to toggle house detail
      images: []
    }
  }

  handleExpand() {
    this.setState({ showDetail: !this.state.showDetail }, () => {})
  }

  // pass an axios to backend, requesting for delete
  async handleDelete(id, dispatch) {
    const { myHostingList } = this.props.value
    let i = 0
    var deletable = true

    for (i = 0; i < myHostingList.length; i++) {
      if (myHostingList[i].accommodation === id) {
        deletable = false
        break
      }
    }

    if (deletable === true) {
      await axios.delete(`/accommodation/${id}`)
      dispatch({ type: 'DELETE_HOUSE', payload: id })
    } else {
      alert('cant delete, have hosting')
    }
  }

  async componentDidMount() {
    const { houseDetail } = this.props,
      { id } = houseDetail

    let images = await api.async_get(`/accommodationImage/`)
    images = findImagesByAccommID(images, id)
    this.setState({ images: images })
  }

  render() {
    const { address } = this.props.houseDetail
    const {
      title,
      Accomodation_Type,
      bedroom,
      bed,
      bathroom,
      kitchen,
      gym,
      pool,
      carpark,
      description
    } = this.props.houseDetail
    const { id } = this.props.houseDetail
    const { showDetail, images } = this.state
    const { classes } = this.props

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
      <Consumer>
        {value => {
          const { dispatch } = value
          const { myHostingList } = value

          var isHosting = false
          let i = 0
          for (i = 0; i < myHostingList.length; i++) {
            if (parseInt(myHostingList[i].accommodation, 10) === id) {
              isHosting = true
              break
            }
          }

          return (
            <div style={{ padding: '1rem' }}>
              <Card className={classes.card} style={{ width: '30vw' }}>
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
                <CardBody>
                  <CardContent>
                    <h2
                      className={classes.cardProductTitle}
                      style={{ margin: '15px' }}
                    >
                      {title}
                    </h2>
                    <Typography gutterBottom variant="headline" component="h2">
                      {address}{' '}
                      <i
                        onClick={this.handleExpand.bind(this)}
                        className="fas fa-sort-down"
                        style={{ cursor: 'pointer' }}
                      />
                    </Typography>
                    <h4 align="center" style={{ margin: '15px' }}>
                      {Accomodation_Type}
                    </h4>
                  </CardContent>
                  {isHosting === true ? (
                    <Link
                      to={{ pathname: `/editHouse/${id}`, state: { stage: 3 } }}
                    >
                      <i className="fas fa-circle" style={{ color: 'green' }}>
                        Active
                      </i>
                    </Link>
                  ) : (
                    <Link to={`/editHouse/${id}`}>
                      <i className="fas fa-circle" style={{ color: 'grey' }}>
                        Inactive Host
                      </i>
                    </Link>
                  )}
                  <div style={{ float: 'right' }}>
                    <i
                      className="fas fa-times"
                      onClick={this.handleDelete.bind(this, id, dispatch)}
                      style={{
                        cursor: 'pointer',
                        color: 'red',
                        paddingRight: '1rem'
                      }}
                    />
                    <Link to={`editHouse/${id}`}>
                      <i
                        className="fas fa-pencil-alt"
                        style={{ cursor: 'pointer', color: 'black' }}
                      />
                    </Link>
                  </div>
                  {showDetail === true ? (
                    <ul className="list-group">
                      {bedroom !== '0' ? (
                        <li className="list-group-item">
                          Bedroom <i className="fas fa-bed" /> x {bedroom}{' '}
                        </li>
                      ) : null}
                      {bed !== '0' ? (
                        <li className="list-group-item">
                          Bed <i className="fas fa-bed" /> x {bed}{' '}
                        </li>
                      ) : null}
                      {bathroom !== '0' ? (
                        <li className="list-group-item">
                          Bathroom <i className="fas fa-bath" /> x {bathroom}{' '}
                        </li>
                      ) : null}
                      {kitchen !== false ? (
                        <li className="list-group-item">
                          Kitchen <i className="fas fa-utensils" /> {kitchen}{' '}
                        </li>
                      ) : null}
                      {gym !== false ? (
                        <li className="list-group-item">
                          Gym <i className="fas fa-dumbbell" /> {gym}{' '}
                        </li>
                      ) : null}
                      {pool !== false ? (
                        <li className="list-group-item">
                          Pool <i className="fas fa-swimming-pool" /> {pool}{' '}
                        </li>
                      ) : null}
                      {carpark !== false ? (
                        <li className="list-group-item">
                          Carpark <i className="fas fa-car-side" /> {carpark}{' '}
                        </li>
                      ) : null}
                      <li className="list-group-item">
                        Description :{description}{' '}
                      </li>
                    </ul>
                  ) : null}
                </CardBody>
              </Card>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
export default withStyles(styles)(House)

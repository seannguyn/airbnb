import React, { Component } from "react"
import { Marker } from "react-google-maps"
import PlaceInfoWindow from "./PlaceInfoWindow"
import "../../Styles/PlaceMarker.css"
import findImagesByAccommID from "../../utils/findImagesByAccommID"
import axios from "axios"
import chosen from "../../assets/img/icons/chosen.png"
import {Consumer} from "../../Context"

export class PlaceMarker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTooltip: false
    }
  }

  clickTooltip(dispatch, accommodation) {

    dispatch({
      type: 'OPEN_INFO_WINDOW',
      payload: accommodation
    })
  }

  closeWindow(dispatch) {
    dispatch({
      type: 'CLOSE_INFO_WINDOW',
      payload: -1
    })
  }

  async componentDidMount() {
    const { accommodation } = this.props
    var reviews = []
    var err

    const count = await axios.get(`/reviewCounter/${accommodation}/`)

    if (count.data.count > 0) {
      await axios
        .get(`/accommodation/${accommodation}/reviews/`)
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
    const retImages = findImagesByAccommID(images.data, accommodation)
    this.setState({ images: retImages })
  }

  render() {
    const { reviews, images } = this.state
    const {
      lat,
      lng,
      name,
      price,
      description,
      accommodation,
      address,
      accommodationChosen,
      Accomodation_Type
    } = this.props

    return (
      <Consumer>
        {value => {
          const {dispatch,inforWindow} = value;
          return (
            <React.Fragment>
              {accommodationChosen !== undefined ? (
                <Marker
                  className="map-price-container"
                  markerWithLabel={window.MarkerWithLabel}
                  position={{
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                  }}
                  defaultIcon={chosen}
                  onClick={this.clickTooltip.bind(this, dispatch, accommodation)}
                  label={`${price}`}
                >
                  { inforWindow === accommodation && images !== undefined  ? (
                    <PlaceInfoWindow
                      description={description}
                      name={name}
                      price={price}
                      reviews={reviews}
                      images={images}
                      accommodation={accommodation}
                      Accomodation_Type={Accomodation_Type}
                      address={address}
                      closeWindow={this.closeWindow.bind(this, dispatch)}
                    />
                ): null}
                </Marker>
              ) : (
                <Marker
                  className="map-price-container"
                  markerWithLabel={window.MarkerWithLabel}
                  position={{
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                  }}
                  onClick={this.clickTooltip.bind(this, dispatch, accommodation)}
                  label={`${price}`}
                >
                  {inforWindow === accommodation && images !== undefined && (
                    <PlaceInfoWindow
                      description={description}
                      name={name}
                      price={price}
                      reviews={reviews}
                      images={images}
                      accommodation={accommodation}
                      Accomodation_Type={Accomodation_Type}
                      address={address}
                      closeWindow={this.closeWindow.bind(this, dispatch)}
                    />
                  )}
                </Marker>
              )}
            </React.Fragment>
          )
        }}
      </Consumer>
    )
  }
}

export default PlaceMarker

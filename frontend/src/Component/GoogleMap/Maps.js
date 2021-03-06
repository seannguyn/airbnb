/* eslint-disable no-undef */
// The line above fix google is undefined problem - don't delete
import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import PlaceMarker from '../PlaceMarker/PlaceMarker'
import { Consumer } from '../../Context'

const AirbnbMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom}
    onClick={() => {
      props.dispatch({ type: 'CLOSE_INFO_WINDOW' })
    }}
  >
    {props.places}
  </GoogleMap>
))

export class Map extends Component {
  constructor(props) {
    super(props)
    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 12

    this.state = {
      // lat and lng for map center
      lat: -33.88994,
      lng: 151.20633900000007
    }
  }

  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded) return

    this.mapFullyLoaded = true
    this.handleMapChanged()
  }

  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  fetchPlacesFromApi() {
    const place = (
      <PlaceMarker
        lat={50.0515918}
        lng={19.9357531}
        price={20}
        name={'Hotel'}
        description={'Hotel desc'}
      />
    )
    this.setState({ places: [place] })
  }

  getMapBounds() {
    var mapBounds = this.map.getBounds()
    var xMapBounds = mapBounds.b
    var yMapBounds = mapBounds.f

    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f

    this.yMapBounds.min = yMapBounds.f
    this.yMapBounds.max = yMapBounds.b
  }

  render() {
    const { accommodation } = this.props
    return (
      <Consumer>
        {value => {
          const { lat, lng } = this.state
          const { places, dispatch } = value
          let placeMarkers = []
          if (places !== null && places !== undefined) {
            placeMarkers = places
            let markers = []
            placeMarkers.map(placeMarker => {
              // Render specific accommodation with different icons
              if (accommodation !== undefined) {
                if (accommodation === placeMarker.id) {
                  markers.push(
                    <PlaceMarker
                      key={placeMarker.id}
                      lat={placeMarker.lat}
                      lng={placeMarker.lng}
                      price={placeMarker.price}
                      name={placeMarker.name}
                      description={placeMarker.description}
                      accommodation={placeMarker.id}
                      address={placeMarker.address}
                      accommodationChosen={accommodation}
                      Accomodation_Type={placeMarker.Accomodation_Type}
                    />
                  )
                } else {
                  markers.push(
                    <PlaceMarker
                      key={placeMarker.id}
                      lat={placeMarker.lat}
                      lng={placeMarker.lng}
                      price={placeMarker.price}
                      name={placeMarker.name}
                      description={placeMarker.description}
                      accommodation={placeMarker.id}
                      address={placeMarker.address}
                      Accomodation_Type={placeMarker.Accomodation_Type}
                    />
                  )
                }
              }
              // Render all the accommodations with default placemarker icons
              else {
                markers.push(
                  <PlaceMarker
                    key={placeMarker.id}
                    lat={placeMarker.lat}
                    lng={placeMarker.lng}
                    price={placeMarker.price}
                    name={placeMarker.name}
                    description={placeMarker.description}
                    accommodation={placeMarker.id}
                    address={placeMarker.address}
                    Accomodation_Type={placeMarker.Accomodation_Type}
                  />
                )
              }
              placeMarkers = markers
              return 0
            })
          }
          return (
            <div className="mt-5" style={{ width: `100%`, height: `750px` }}>
              <AirbnbMap
                onMapMounted={this.handleMapMounted.bind(this)}
                handleMapChanged={this.handleMapChanged.bind(this)}
                handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
                center={{
                  lat: lat,
                  lng: lng
                }}
                zoom={this.zoom}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                places={placeMarkers}
                dispatch={dispatch}
              />
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Map

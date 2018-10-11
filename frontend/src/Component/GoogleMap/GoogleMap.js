import React from "react"
// import Geocode from "react-geocode";
// import GoogleMapReact from "google-map-react"
import { withGoogleMap, GoogleMap } from "react-google-maps"
import CircularProgress from "@material-ui/core/CircularProgress"
import PlaceMarker from "../PlaceMarker/PlaceMarker"
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const AirbnbMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom}
  >
    {props.places}
    {/* {
      props.places.length > 0 && props.places.map(place => (
        <PlaceMarker lat={50.0515918}
                     lng={19.9357531}
                     description={'Description'}
                     name={'Hotel'}
                     price={'10'} />
      ))
    } */}
  </GoogleMap>
))

class SingleLocationMap extends React.Component {
  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 7

    this.state = {
      lat: -33.88994,
      lng: 151.20633900000007
    }
  }

  async componentDidMount() {

    this.setState({didmount: 1})
  }

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      // position: this.state.center,
      map,
      title: "Hello There"
    })
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
        name={"Hotel"}
        description={"Hotel desc"}
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
    const { lat, lng } = this.state
    const { latitude, longitude } = this.props
    const places = [<PlaceMarker lat={latitude} lng={longitude} />]
    if (this.state.didmount === 0) {
      return (
        <div>
          <CircularProgress color="primary" size={50} />
        </div>
      )
    } else {
      return (
        // Important! Always set the container height explicitly
        <div className="container">
          <h1>Destination</h1>
          <div align="center" style={{ height: "50vh", width: "50%" }}>
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
              places={places}
            />
          </div>
        </div>
      )
    }
  }
}

export default SingleLocationMap

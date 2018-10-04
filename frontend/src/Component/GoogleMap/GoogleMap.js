import React from 'react'
// import Geocode from "react-geocode";
import GoogleMapReact from 'google-map-react';
import CircularProgress from '@material-ui/core/CircularProgress';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      center: {},
      didmount: 0
    }


  }

  async componentDidMount() {

    // const res = await Geocode.fromAddress("Kingsford, NSW")
    // const { lat, lng } = res.results[0].geometry.location;

    this.setState({
      // center:{
      //   lat: parseFloat(lat),
      //   lng: parseFloat(lng)
      // },
      didmount: 1
    }, () => {
      console.log(this.state.center,"MOUNT");
    })
  }

  renderMarkers(map, maps) {
    console.log(this.state.center,"");
    let marker = new maps.Marker({
      // position: this.state.center,
      map,
      title: 'Hello There'
    });
    console.log(marker,"turn off warning");
  }

  render () {
    if (this.state.didmount === 0) {
      return(
        <div>
          <CircularProgress color="primary" size={50}/>
        </div>
      )
    } else {
      return(
        // Important! Always set the container height explicitly
        <div className="container">
          <h1>Destination</h1>
          <div align="center" style={{ height: '50vh', width: '50%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyAgWgW_6FDJ91LzMiq-po7ABDx4yr8P0dE" }}
              defaultCenter={{lat: -33.9246, lng:151.2277}}
              defaultZoom={14}
              onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
              yesIWantToUseGoogleMapApiInternals={true}
            >

            </GoogleMapReact>
          </div>
        </div>
      )
    }

  }
}

export default GoogleMap;
import React, { Component } from 'react'
import { Marker } from 'react-google-maps'
import PlaceInfoWindow from './PlaceInfoWindow'
import '../../Styles/PlaceMarker.css'
import findImagesByAccommID from '../../utils/findImagesByAccommID'
import axios from 'axios'
import chosen from '../../assets/img/icons/chosen.png'

export class PlaceMarker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showTooltip: false
        }
    }

    clickTooltip() {
        this.setState({ showTooltip: !this.state.showTooltip })
    }

    closeWindow() {
        this.setState({ showTooltip: false })
    }


    async componentDidMount  () {
        const { accommodation } = this.props;
        let reviews, err;
        await axios.get(`/accommodation/${accommodation}/reviews/`)
                    .then(
                        response => {
                            reviews = response.data
                        }
                    ).catch(
                      error => {
                        err = error.response;
                      }
                    )
        if(err == null && reviews.length > 0){
          this.setState({reviews:reviews});
        }

        const images = await axios.get('/accommodationImage/');
        const retImages =  findImagesByAccommID(images.data, accommodation);
        this.setState({images: retImages});
    }

    render() {
        const { showTooltip, reviews, images } = this.state;
        const {lat, lng, name, price, description, accommodation, address, accommodationChosen} = this.props;

        return(
        <React.Fragment>
        { accommodationChosen !== undefined ?
            <Marker className="map-price-container"
            markerWithLabel={window.MarkerWithLabel}
            position={{
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }}
            defaultIcon={chosen}
            onClick={this.clickTooltip.bind(this)}
            label = {`${price}`}
            >
            {showTooltip && (
            <PlaceInfoWindow description={description}
                            name={name}
                            price={price}
                            reviews={reviews}
                            images={images}
                            accommodation={accommodation}
                            address={address}
                            closeWindow={this.closeWindow.bind(this)}/>)}
            </Marker>
        :
            <Marker className="map-price-container"
            markerWithLabel={window.MarkerWithLabel}
            position={{
            lat: parseFloat(lat),
            lng: parseFloat(lng)
            }}
            // defaultIcon={price_tag}
            onClick={this.clickTooltip.bind(this)}
            label = {`${price}`}
            >
            {showTooltip && (
            <PlaceInfoWindow description={description}
                            name={name}
                            price={price}
                            reviews={reviews}
                            images={images}
                            accommodation={accommodation}
                            address={address}
                            closeWindow={this.closeWindow.bind(this)}/>)}
            </Marker>
        }
        </React.Fragment>

        );
    }
}

export default PlaceMarker

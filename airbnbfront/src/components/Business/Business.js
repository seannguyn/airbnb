import React from 'react';
import './Business.css';

const business = {
    imageSrc: 'https://s3-ap-southeast-2.amazonaws.com/3900-image/Sydney.jpg',
    name: 'Sydney Opera House',
    address: 'Bennelong Point',
    city: 'Sydney',
    state: 'NSW',
    zipCode: '2000',
    category: 'Australian',
    rating: 4.5,
    reviewCount: 90
}

class Business extends React.Component {
    render() {
      return (
        <div className="Business">
          <div className="image-container">
            <img src={business.imageSrc} alt=''/>
          </div>
          <h2>{business.name}</h2>
          <div className="Business-information">
            <div className="Business-address">
              <p>{business.address}</p>
              <p>{business.city}</p>
              <p>{`${business.state} ${business.zipCode}`}</p>
            </div>
            <div className="Business-reviews">
              <h3>{business.category.toUpperCase()}</h3>
              <h3 className="rating">{`${business.rating} stars`}</h3>
              <p>{`${business.reviewCount} reviews`}</p>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Business;
import React from 'react'
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import uuid from 'uuid';


class Amenities extends React.Component {
  render () {
    const {accommodation} = this.props;
    var amenites = []

    amenites.push(
      <div className="row" key={uuid.v4()} >
         <Typography align='center' variant="caption" style={{fontSize:'25px'}}><FontAwesomeIcon icon="utensils" size='xs' style={{marginRight: '20px'}}/> kitchen</Typography>
      </div>
    )

    amenites.push(
      <div className="row" key={uuid.v4()} >
         <Typography align='center' variant="caption" style={{fontSize:'25px'}}><FontAwesomeIcon icon="swimming-pool" size='xs' style={{marginRight: '20px'}}/> swimming pool</Typography>
      </div>
    )

    amenites.push(
      <div className="row" key={uuid.v4()} >
         <Typography align='center' variant="caption" style={{fontSize:'25px'}}><FontAwesomeIcon icon="dumbbell" size='xs' style={{marginRight: '20px'}}/> gym</Typography>
      </div>
    )

    amenites.push(
      <div className="row" key={uuid.v4()} >
         <Typography align='center' variant="caption" style={{fontSize:'25px'}}><FontAwesomeIcon icon="car" size='xs' style={{marginRight: '20px'}}/> car park</Typography>
      </div>
    )

    return (
      <div style={{marginBottom:'50px'}}>
        <div className="row" style={{marginTop:'50px'}}>
          <div className="col-12">
            <h1>Amenities</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            {amenites}
          </div>



        </div>
      </div>
    )
  }
}

export default Amenities;

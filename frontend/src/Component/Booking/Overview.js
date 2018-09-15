import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from "@material-ui/core/Typography";
import uuid from 'uuid';


class Overview extends React.Component {
  render () {

    var amenites = []
    const {accommodation, guest} = this.props;
    amenites.push(
      <div key={uuid.v4()} className="col-3" >
        <div className="row">
           <Typography align='center' variant="caption" style={{fontSize:'25px'}}><FontAwesomeIcon icon="users" size='xs'/> {guest} guests</Typography>
        </div>
      </div>
    );
    amenites.push(
      <div key={uuid.v4()} className="col-3" >
        <div className="row">
           <Typography align='center' variant="caption" style={{fontSize:'25px'}}><FontAwesomeIcon icon="door-open" size='xs'/> {accommodation.bedroom} bedrooms</Typography>
        </div>
      </div>
      );
    amenites.push(
      <div key={uuid.v4()} className="col-3" align="center" >
        <div className="row">
           <Typography align='center' variant="caption" style={{fontSize:'25px'}}><FontAwesomeIcon icon="bed" size='xs'/> {accommodation.bedroom} beds</Typography>
        </div>
      </div>
    );


    amenites.push(
      <div key={uuid.v4()} className="col-3" align="center" >
        <div className="row">
           <Typography align='center' variant="caption" style={{fontSize:'25px'}}><FontAwesomeIcon icon="bath" size='xs'/> {accommodation.bathroom} bathroom</Typography>
        </div>
      </div>
    )



    return (
      <div style={{marginBottom:'50px'}}>
        <div className="row" style={{marginTop:'50px'}}>
          <div className="col-12">
            <h1>Overview</h1>
          </div>
        </div>
        <div className="row">
          {amenites}

        </div>
      </div>
    )
  }
}

export default Overview;

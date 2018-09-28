import React from 'react'

import Typography from "@material-ui/core/Typography";

class Days extends React.Component {

  render() {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const startM = monthNames[new Date(this.props.startDate).getMonth()];
    const endM = monthNames[new Date(this.props.endDate).getMonth()];

    const startD = new Date(this.props.startDate).getDate();
    const endD = new Date(this.props.endDate).getDate();

    return (
      <div style={{marginBottom: '50px', marginTop: '50px'}}>

        <div className="row">
          <div className="col-12" style={{marginBottom: '20px'}}>
            <h2>{this.props.daysDiff} nights in {this.props.city}</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-4">
                <div style={{height: '80px', width: '80px', borderRadius: '10px',
                  border: '1px solid #696996', backgroundColor: '#e1e1ea' }}>
                  <Typography align='center' variant="display1">{startM}</Typography>
                  <h4 align='center'>{startD}</h4>
                </div>
              </div>

              <div className="col-8">
                <div style={{height: '100px', width: '150px',}}>
                  <Typography align='center' variant="caption" style={{fontSize: '25px'}}>Check
                    in {this.props.checkIn}</Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="row">
              <div className="col-4">
                <div style={{height: '80px', width: '80px', borderRadius: '10px',
                  border: '1px solid #696996', backgroundColor: '#e1e1ea'}}>
                  <Typography align='center' variant="display1">{endM}</Typography>
                  <h4 align='center'>{endD}</h4>
                </div>
              </div>

              <div className="col-8">
                <div style={{height: '100px', width: '150px'}}>
                  <Typography align='center' variant="caption" style={{fontSize: '25px'}}>Check
                    out {this.props.checkOut}</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Days;

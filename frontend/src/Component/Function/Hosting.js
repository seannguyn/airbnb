import React from 'react'
import PropTypes from 'prop-types'

class Hosting extends React.Component {

  constructor() {
    super();

    this.state = {
      showHosting: false
    }

  }

  handleExpand() {
    this.setState({showHosting : !this.state.showHosting})
  }

  render () {

    const {house, SingleHost} = this.props;
    const {showHosting} = this.state;
    return (
      <div className="card card-body mb-3">
          <h4>
            {house.addr_number}, {house.addr_street}, {house.addr_city}, {house.addr_state}
            <i onClick={this.handleExpand.bind(this)} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>
          </h4>

          {showHosting === true ?
            <ul className="list-group">
              <li className="list-group-item">start_date : {SingleHost.date_start}</li>
              <li className="list-group-item">end_date :  {SingleHost.date_end}</li>
              <li className="list-group-item">price :  {SingleHost.price}</li>
            </ul>
          : null}

        </div>
    )
  }
}

export default Hosting;

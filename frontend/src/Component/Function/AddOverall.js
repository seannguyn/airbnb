import React from 'react'
import AddHouse from './AddHouse.js'
import Images from './Images.js'

class AddOverAll extends React.Component {

  render () {


    return (
      <div>
        <nav className="nav nav-pills nav-fill mt-5 navbar-light bg-light">
          <a className="nav-item nav-link active" style={{cursor:'pointer'}}>Basic Info</a>
          <a className="nav-item nav-link"        style={{cursor:'pointer'}}>Picture</a>
          <a className="nav-item nav-link"        style={{cursor:'pointer'}}>Lets host it</a>
        </nav>

        <AddHouse history={this.props.history}
           AllHostingList={this.props.AllHostingList}
           HouseList={this.props.HouseList}
           CurrentUser={this.props.CurrentUser}
           >
         </AddHouse>




      </div>
    )
  }
}

export default AddOverAll;

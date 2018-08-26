import React from 'react'
import {Consumer} from '../../Context.js'
import House from './House.js'

class Houses extends React.Component {
  render () {
    return (
      <Consumer>
        {value => {
          const {HouseList} = value;
          
          return (
            <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
              {HouseList.map( indivHouse => (<House key={indivHouse.id} houseDetail={indivHouse} />))}
            </main>
          );
        }}
      </Consumer>

    )
  }
}

export default Houses;

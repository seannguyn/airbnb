import React from 'react'
import { Consumer } from '../../Context.js'
import AddOverall from '../Function/AddOverall'

const AddHouseContext = props => {
  return (
    <Consumer>
      {value => {
        const { currentUser, AllHostingList, HouseList } = value
        return (
          <div>
            <AddOverall
              history={props.history}
              AllHostingList={AllHostingList}
              HouseList={HouseList}
              CurrentUser={currentUser}
            />
          </div>
        )
      }}
    </Consumer>
  )
}

export default AddHouseContext

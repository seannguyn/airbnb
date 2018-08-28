import React from 'react'
import {Consumer} from '../../Context.js'
import AddHouse from '../Function/AddHouse'


const AddHouseContext = (props) => {
  // console.log("this is is: ",props.match.params.id);
  // console.log("history.........",props.history);

  return(
  <Consumer>
    {value => {
      const {currentUser,AllHostingList,HouseList} = value;
      return (
        <div>
          <AddHouse history={props.history}
             AllHostingList={AllHostingList}
             HouseList={HouseList}
             CurrentUser={currentUser}
             >
           </AddHouse>
        </div>
      )
    }}

  </Consumer>
);
};

export default AddHouseContext;

import React from 'react'
import {Consumer} from '../../Context.js'
import AddOverall from '../Function/AddOverall'


const AddHouseContext = (props) => {
  // console.log("this is is: ",props.match.params.id);
  // console.log("history.........",props.history);
  // <AddHouse history={props.history}
  //    AllHostingList={AllHostingList}
  //    HouseList={HouseList}
  //    CurrentUser={currentUser}
  //    >
  //  </AddHouse>
  return(
  <Consumer>
    {value => {
      const {currentUser,AllHostingList,HouseList} = value;
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
);
};

export default AddHouseContext;

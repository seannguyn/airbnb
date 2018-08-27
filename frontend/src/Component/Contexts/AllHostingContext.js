import React from 'react'
import {Consumer} from '../../Context.js'
import AllHosting from '../Function/AllHosting'


const AllHostingContext = (props) => {
  // console.log("this is is: ",props.match.params.id);
  // console.log("history.........",props.history);

  return(
  <Consumer>
    {value => {
      const {AllHostingList,HouseList} = value;
      console.log("hereee",AllHostingList);
      return (
        <div>
          <AllHosting history={props.history}
             AllHostingList={AllHostingList}
             HouseList={HouseList}
             >
           </AllHosting>
        </div>
      )
    }}

  </Consumer>
);
};

export default AllHostingContext;

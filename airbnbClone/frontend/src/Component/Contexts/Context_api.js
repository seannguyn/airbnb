import React from 'react'
import {Consumer} from '../../Context.js'
import EditHouse from '../Function/EditHouse'

const ContextApi = (props) => {
  // console.log("this is is: ",props.match.params.id);
  // console.log("history.........",props.history);
  const {id} = props.match.params;
  return(
  <Consumer>
    {value => {
      const {HouseList} = value;
      return (
        <div>
          <EditHouse history={props.history} id={id} HouseList={HouseList} />
        </div>
      )
    }}

  </Consumer>
);
};

export default ContextApi;

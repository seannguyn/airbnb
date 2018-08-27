import React from 'react'
import {Consumer} from '../../Context.js'
import EditHosting from '../Function/EditHosting.js';

const EditHostContext = (props) => {
  // console.log("this is is: ",props.match.params.id);
  // console.log("history.........",props.history);
  console.log("EDITCONTEXT: ", this.props);
  const {id} = props.match.params;
  return(
  <Consumer>
    {value => {
      const {HouseList, currentUser, myHostingList} = value;

      return (
        <div>
          <EditHosting
                    id={id} 
                    HouseList={HouseList}
                    currentUser={currentUser}
                    myHostingList={myHostingList}/>
        </div>
      )
    }}

  </Consumer>
);
};

export default EditHostContext;

import React from 'react'
import {Consumer} from '../../Context.js'
import EditHosting from '../Function/EditHosting.js';

const EditHostContext = (props) => {
  // console.log("this is is: ",props.match.params.id);
  // console.log("history.........",props.history);
  console.log("EDITCONTEXT: ", props);
  const {id} = props.match.params;
  const {history} = props;


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
                    myHostingList={myHostingList}
                    history={history}/>
        </div>
      )
    }}

  </Consumer>
);
};

export default EditHostContext;

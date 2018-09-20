import React from 'react'
import {Consumer} from '../../Context.js'
import EditOverAll from '../Function/EditOverAll'
import EditHosting from '../Function/EditHosting'
import AddHosting from '../Function/AddHosting'

const ContextApi = (props) => {
  // console.log("this is is: ",props.match.params.id);
  // console.log("history.........",props.history);
  const {id} = props.match.params;

  var stageComponent
  if(props.location.state) {
    const {stage} = props.location.state
    stageComponent = stage;
  } else {
    stageComponent = 1;
  }
  return(
  <Consumer>
    {value => {
      const {HouseList, currentUser, myHostingList} = value;

      var hasHost = []
      var i;
      for(i=0; i < myHostingList.length; i++) {

        if(myHostingList[i].accommodation === parseInt(id,10)){
          hasHost.push(<EditHosting id={id}
                                  key={id}
                                  HouseList={HouseList}
                                  currentUser={currentUser}
                                  myHostingList={myHostingList}
                                  history={props.history}/>);
          hasHost.push(true);
          break;
        }
      }
      if (hasHost.length === 0) {
        hasHost.push(<AddHosting key={id} history={props.history} id={id}/>)
        hasHost.push(false);
      }

      return (
        <div>
          <EditOverAll stageComponent={stageComponent} hasHost={hasHost} history={props.history} id={id} myHostingList={myHostingList} currentUser={currentUser} HouseList={HouseList} />
        </div>
      )
    }}

  </Consumer>
);
};

export default ContextApi;

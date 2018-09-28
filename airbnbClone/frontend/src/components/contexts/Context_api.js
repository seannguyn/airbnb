import React from 'react'
import {Consumer} from '../../Context.js'
import EditOverAll from '../functions/EditOverAll'
import EditHosting from '../functions/EditHosting'
import AddHosting from '../functions/AddHosting'

const ContextApi = (props) => {

  const {id} = props.match.params;

  let stageComponent;
  if (props.location.state) {
    const {stage} = props.location.state
    stageComponent = stage;
  } else {
    stageComponent = 1;
  }

  return (
    <Consumer>
      {value => {
        const {HouseList, currentUser, myHostingList} = value;

        const hasHost = [];
        for (let i = 0; i < myHostingList.length; i++) {
          if (myHostingList[i].accommodation === id) {
            hasHost.push(<EditHosting id={id}
                                      key={id}
                                      HouseList={HouseList}
                                      currentUser={currentUser}
                                      myHostingList={myHostingList}
                                      history={props.history}/>);
            hasHost.push(true);
          }
        }

        if (hasHost.length === 0) {
          hasHost.push(<AddHosting key={id} history={props.history} id={id}/>);
          hasHost.push(false);
        }

        return (
          <div>
            <EditOverAll stageComponent={stageComponent} hasHost={hasHost} history={props.history} id={id}
                         myHostingList={myHostingList} currentUser={currentUser} HouseList={HouseList}/>
          </div>
        )
      }}

    </Consumer>
  );
};

export default ContextApi;

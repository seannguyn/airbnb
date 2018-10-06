import React from 'react'
import {Consumer} from '../../Context.js'
import EditOverAll from '../Function/EditOverAll'
import EditHosting from '../Function/EditHosting'
import AddHosting from '../Function/AddHosting'

class ContextApi extends React.Component {

  render () {
    const {id} = this.props.match.params;

    var stageComponent
    if(this.props.location.state) {
      const {stage} = this.props.location.state
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
          console.log("MY HOSTING LIST",myHostingList,id);
          for(i=0; i < myHostingList.length; i++) {

            if(parseInt(myHostingList[i].accommodation,10) === parseInt(id,10)){
              hasHost.push(<EditHosting id={id}
                                      key={id}
                                      HouseList={HouseList}
                                      currentUser={currentUser}
                                      myHostingList={myHostingList}
                                      history={this.props.history}/>);
              hasHost.push(true);
              break;
            }
          }
          if (hasHost.length === 0) {
            hasHost.push(<AddHosting key={id} history={this.props.history} id={id}/>)
            hasHost.push(false);
          }

          return (
            <div>
              <EditOverAll stageComponent={stageComponent} hasHost={hasHost} history={this.props.history} id={id} myHostingList={myHostingList} currentUser={currentUser} HouseList={HouseList} />
            </div>
          )
        }}

      </Consumer>
    );
  }
}

export default ContextApi;

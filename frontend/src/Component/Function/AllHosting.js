import React from 'react'
// import AllHostingContext from '../Contexts/AllHostingContext'
import Hosting from './Hosting'


class AllHosting extends React.Component {

  getData(SingleHost) {

    const {HouseList} = this.props;

    let i =0;
    var house;

    for(i=0; i < HouseList.length; i++){
      if(HouseList[i].id == SingleHost.accommodation){
        house = HouseList[i];
      }
    }

    return (
      <Hosting key={SingleHost.id} house={house} SingleHost={SingleHost}/>

    );
  }

  render () {

    const {AllHostingList} = this.props.AllHostingList;
    // console.log("all Hosting",this.props.AllHostingList);
    // console.log("all House",this.props.HouseList);
    const SingleHosting = this.props.AllHostingList.map((SingleHost) => this.getData(SingleHost))
    // console.log("SINGLEHOUSE: ", SingleHosting)
    return (
      <React.Fragment>
        <h1>Explore</h1>
        <div className="row">
            {SingleHosting}
          </div>
        </React.Fragment>
      );
  }
}

export default AllHosting;

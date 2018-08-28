import React from 'react'
// import AllHostingContext from '../Contexts/AllHostingContext'
import Hosting from './Hosting'

class AllHosting extends React.Component {


  getData(SingleHost) {

    const {HouseList} = this.props;

    var house = HouseList.find(obj => {
      return obj.id === SingleHost.accommodation
    })

    return (

      <Hosting key={SingleHost.id} house={house} SingleHost={SingleHost}/>

    );
  }


  render () {


    // const {AllHostingList} = this.props.AllHostingList;

    // console.log("all Hosting",this.props.AllHostingList);
    // console.log("all House",this.props.HouseList);

    const SingleHosting = this.props.AllHostingList.map((SingleHost) => this.getData(SingleHost))

    return (
      <div>
      <h1>Explore</h1>
      {SingleHosting}
      </div>
    );
  }
}

export default AllHosting;

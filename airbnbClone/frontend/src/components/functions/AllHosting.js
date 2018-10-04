import React from 'react'
// import AllHostingContext from '../Contexts/AllHostingContext'
import Hosting from './Hosting'
<<<<<<< HEAD:airbnbClone/frontend/src/components/functions/AllHosting.js
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
=======
import { withStyles } from '@material-ui/core/styles';
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/Function/AllHosting.js


const styles = theme => ({
  search: {
    margin: theme.spacing.unit * 2,
  },
});

class AllHosting extends React.Component {

  getData(SingleHost) {
    const {HouseList} = this.props;

<<<<<<< HEAD:airbnbClone/frontend/src/components/functions/AllHosting.js
    let house;
    for (let i = 0; i < HouseList.length; i++) {
      if (HouseList[i].id === SingleHost.accommodation) {
=======
    let i =0;
    var house;

    for(i=0; i < HouseList.length; i++){
      if(HouseList[i].id === parseInt(SingleHost.accommodation,10)){
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/Function/AllHosting.js
        house = HouseList[i];
      }
    }
    console.log("house is", HouseList, SingleHost);
    return (
<<<<<<< HEAD:airbnbClone/frontend/src/components/functions/AllHosting.js
      <Hosting key={SingleHost.id} house={house} SingleHost={SingleHost}/>
=======
      <Hosting key={SingleHost.accommodation} house={house} SingleHost={SingleHost}/>

>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/Function/AllHosting.js
    );
  }

  filterHouse() {}

<<<<<<< HEAD:airbnbClone/frontend/src/components/functions/AllHosting.js
  render() {
    const {classes} = this.props;
=======
  }

  render () {
>>>>>>> db6bc384b1eb44650cd09533c228c42b00c8a650:frontend/src/Component/Function/AllHosting.js

    // console.log("all Hosting",this.props.AllHostingList);
    // console.log("all House",this.props.HouseList);
    let SingleHosting = [];
    if (this.props.AllHostingList != null) {
      SingleHosting = this.props.AllHostingList.map((SingleHost) => this.getData(SingleHost));
    }
    // console.log("SINGLEHOUSE: ", SingleHosting)
    return (
      <React.Fragment>

        <div className="row">
          {SingleHosting}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(AllHosting);

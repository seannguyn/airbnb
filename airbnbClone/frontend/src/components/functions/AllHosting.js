import React from 'react'
// import AllHostingContext from '../Contexts/AllHostingContext'
import Hosting from './Hosting'
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
  search: {
    margin: theme.spacing.unit * 2,
  },
});

class AllHosting extends React.Component {

  getData(SingleHost) {
    const {HouseList} = this.props;

    let house;
    for (let i = 0; i < HouseList.length; i++) {
      if (HouseList[i].id === SingleHost.accommodation) {
        house = HouseList[i];
      }
    }

    return (
      <Hosting key={SingleHost.id} house={house} SingleHost={SingleHost}/>
    );
  }

  filterHouse() {}

  render() {
    const {classes} = this.props;

    // console.log("all Hosting",this.props.AllHostingList);
    // console.log("all House",this.props.HouseList);
    let SingleHosting = [];
    if (this.props.AllHostingList != null) {
      SingleHosting = this.props.AllHostingList.map((SingleHost) => this.getData(SingleHost));
    }
    // console.log("SINGLEHOUSE: ", SingleHosting)
    return (
      <React.Fragment>
        <TextField
          fullWidth
          label="Search Bar"
          name="search"
          type="text"
          id="search"
          onChange={this.filterHouse.bind(this)}
          className={classes.search}
        />
        <div className="row">
          {SingleHosting}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(AllHosting);

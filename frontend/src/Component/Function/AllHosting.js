import React from "react"
import Hosting from "./Hosting"
import {withStyles} from "@material-ui/core/styles"

const styles = theme => ({
  search: {
    margin: theme.spacing.unit * 2
  }
});

class AllHosting extends React.Component {

  getData(SingleHost) {
    const {HouseList} = this.props;

    let house;
    for (let i = 0; i < HouseList.length; i++) {
      if (HouseList[i].id === SingleHost.accommodation) {
        house = HouseList[i]
      }
    }
    return (
      <Hosting
        key={SingleHost.accommodation}
        house={house}
        SingleHost={SingleHost}
      />
    )
  }

  render() {
    const SingleHosting = this.props.AllHostingList
      .map(SingleHost => this.getData(SingleHost));

    return (
      <div className="container">
        <div className="row">{SingleHosting}</div>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(AllHosting)

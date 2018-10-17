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
    const HostingDivs = this.props.AllHostingList
      .map(hosting => this.getData(hosting));

    return (
        <div className="d-inline-flex flex-wrap justify-content-center">
          {HostingDivs}
        </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(AllHosting)

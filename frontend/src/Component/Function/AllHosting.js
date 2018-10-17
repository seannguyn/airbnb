import React from "react"
import Hosting from "./Hosting"
import {withStyles} from "@material-ui/core/styles"

const styles = theme => ({
  search: {
    margin: theme.spacing.unit * 2
  }
});

class AllHosting extends React.Component {

  getAccomDetails(hosting) {
    const {HouseList} = this.props;
    const house = HouseList.find(house => house.id === hosting.accommodation);
    return (
      <Hosting
        key={hosting.accommodation}
        house={house}
        SingleHost={hosting}
      />
    )
  }

  render() {
    const HostingDivs = this.props.AllHostingList
      .map(hosting => this.getAccomDetails(hosting));

    const blanks = 5 - HostingDivs.length % 5;
    console.log(blanks)
    for (let i = 0; i < blanks; i++) {
      HostingDivs.push(
        <div key={i} className="d-inline-block p-1 mx-2" style={{minWidth: '18vw'}}/>
      )
    }

    return (
      <div className="d-inline-flex flex-wrap justify-content-center">
        {HostingDivs}
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(AllHosting)

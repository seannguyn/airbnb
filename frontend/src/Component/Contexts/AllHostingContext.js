import React from "react"
import {Consumer} from "../../Context.js"
import AllHosting from "../Function/AllHosting"
import SearchSection from "../Search/SearchSection"
import MapList from "../Search/MapList"
import {withStyles} from "@material-ui/core/styles"
import {Map} from "../GoogleMap/Maps.js"

const styles = theme => ({});

class AllHostingContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "list",
    }
  }

  changeDisplay(display) {
    this.setState({
      display: display
    })
  }

  render() {
    return (
      <Consumer>
        {value => {
          const {AllHostingList, HouseList} = value;
          let rendering = [];

          if (this.state.display === "list") {
            rendering.push(
              <AllHosting
                key="list"
                history={this.props.history}
                AllHostingList={AllHostingList}
                HouseList={HouseList}
              />
            )
          } else {
            rendering.push(
              <div className="container" key="map">
                <Map/>
              </div>
            )
          }

          return (
            <div>
              <SearchSection/>
              <MapList
                display={this.state.display}
                changeDisplay={this.changeDisplay.bind(this)}
              />
            {rendering}


            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default withStyles(styles)(AllHostingContext)

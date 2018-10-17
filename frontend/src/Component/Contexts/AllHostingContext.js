import React from "react"
import {Map} from "../GoogleMap/Maps.js"

import Button from "@material-ui/core/Button/Button";

import {Consumer} from "../../Context.js"
import AllHosting from "../Function/AllHosting"
import SearchSection from "../Search/SearchSection"

export default class AllHostingContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "list"
    }
  }

  changeDisplay(display) {
    this.setState({
      display: display
    })
  }

  render() {
    const {display} = this.state;

    const btnProps = {
      className: "mx-3",
      size: "large",
      variant: "contained",
    };

    const MapListSwitch = () => {
      return (
        <div className="row align-self-center">
          <Button
            {...btnProps}
            color={display === "list" ? "secondary" : "default"}
            onClick={this.changeDisplay.bind(this, "list")}
          >
            List
          </Button>

          <Button
            {...btnProps}
            color={display === "map" ? "secondary" : "default"}
            onClick={this.changeDisplay.bind(this, "map")}
          >
            Map
          </Button>
        </div>
      )
    };

    return (
      <Consumer>
        {value => {
          const {AllHostingList, HouseList} = value;

          return (

            <div className="d-flex p-2 flex-column justify-content-center">
              <SearchSection/>

              <MapListSwitch/>

              {this.state.display === "list"
                ? <AllHosting
                  key="list"
                  history={this.props.history}
                  AllHostingList={AllHostingList}
                  HouseList={HouseList}/>
                : <Map/>
              }
            </div>

          )
        }}
      </Consumer>
    )
  }
}
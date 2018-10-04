import React from 'react'
import {Consumer} from '../../Context.js'
import AllHosting from '../Function/AllHosting'
import SearchSection from '../Search/SearchSection'
import MapList from '../Search/MapList'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class AllHostingContext extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: 'list',
    }
  }

  changeDisplay(display) {
    this.setState({
      display: display
    })
  }

  render () {
    return(
    <Consumer>
      {value => {
        const {AllHostingList,HouseList} = value;

        var rendering = []

        if (this.state.display === "list") {
          rendering.push(<AllHosting key="list" history={this.props.history} AllHostingList={AllHostingList} HouseList={HouseList}></AllHosting>)
        } else {
          rendering.push(<h1 key="map">RENDER MAP BRO</h1>)
        }
        console.log("RENDERING LIST MAP",rendering);

        return (
          <div>
            <SearchSection />
            <MapList display={this.state.display} changeDisplay={this.changeDisplay.bind(this)}/>
            {rendering}

          </div>
        )
      }}

    </Consumer>
  );
  }
}

export default withStyles(styles)(AllHostingContext);

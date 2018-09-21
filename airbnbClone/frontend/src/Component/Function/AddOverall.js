import React from 'react'
import AddHouse from './AddHouse.js'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Consumer} from '../../Context.js';
import Forbidden from '../layout/Forbidden';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
});

class AddOverAll extends React.Component {

  constructor() {
    super();

    this.state = {
      swipe: 0
    }

  }

  changeTab(event, swipe) {
    this.setState({ swipe });
  };

  switchIndex(index){
    this.setState({ swipe: index });
  };

  render () {

    const {swipe} = this.state;
    const { theme } = this.props;

    return (
      <Consumer>
        {value => {
          const { currentUser } = value;
          if(currentUser.length === 0){
               return (
                <Forbidden/>
              );
          } else {
            return (
              <div>
                <AppBar position="static" color="default" style={{marginBottom: '15px'}}>
                  <Tabs
                    value={swipe}
                    onChange={this.changeTab.bind(this)}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                  >
                    <Tab label="Property Information" />
                    <Tab disabled label="Picture" />
                    <Tab disabled label="Host" />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={swipe}
                  onChangeIndex={this.switchIndex.bind(this)}
                >

                <AddHouse history={this.props.history}
                   AllHostingList={this.props.AllHostingList}
                   HouseList={this.props.HouseList}
                   CurrentUser={this.props.CurrentUser}
                   dir={theme.direction}
                   >
                 </AddHouse>
                   <h1 dir={theme.direction}>hihi</h1>
                   <h1 dir={theme.direction}>haha</h1>


                </SwipeableViews>
              </div>
            )
          }
        }}
      </Consumer>

    )
  }
}

export default withStyles(styles, { withTheme: true })(AddOverAll);

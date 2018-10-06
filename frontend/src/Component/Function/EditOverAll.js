import React from 'react'
import EditHouse from './EditHouse.js'
import Images from './Images.js'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Forbidden from '../layout/Forbidden'

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
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class EditOverAll extends React.Component {

  constructor() {
    super();
    this.state = {
      HouseList: [],
      swipe: 1
    }
  }

  changeTab(event, swipe) {
    this.setState({ swipe });
  };

  switchIndex(index){
    this.setState({ swipe: index });
  };

  imgNumber(number) {
    if (number >= 2) {
      this.setState({picture: true})
    } else {
      this.setState({picture: false})
    }
  }

  render () {
    const { theme, classes } = this.props;
    const {swipe} = this.state;
    const {hasHost, currentUser} = this.props;
    if (currentUser.length === 0) {
      return (
       <Forbidden/>
     )
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
              <Tab label="Picture" />
              <Tab label="Host" />
            </Tabs>
          </AppBar>
          <main className={classes.layout}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={swipe}
            onChangeIndex={this.switchIndex.bind(this)}

          >
              <EditHouse
                dir={theme.direction}
                history={this.props.history}
                id={this.props.id}
                currentUser={this.props.currentUser}
                HouseList={this.props.HouseList}
               >
               </EditHouse>
             <Images imgNumber={this.imgNumber.bind(this)} dir={theme.direction} id={this.props.id} />
             <div >{ hasHost[0]}</div>
          </SwipeableViews>
          </main>
        </div>
      )
    }
  }
}
export default withStyles(styles, { withTheme: true })(EditOverAll);

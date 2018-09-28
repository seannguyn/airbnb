import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import GuestSelect from '../AccommodationDetail/GuestSelect';
import axios from 'axios';
import {Consumer} from '../../Context.js'
import SearchStatus from './SearchStatus'


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class SearchSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',

      price_lower: '',
      price_upper: '',

      guest: 1,

      startDate: null,
      endDate: null,

      error: false,
    }
  }

  handleGuest(ops, num) {
    const limit = 5;
    if (ops === "-" && num > 1) {
      this.setState({guest: parseFloat(num) - 1})
    } else if( ops === "+" && num < limit) {
      this.setState({guest: parseFloat(num) + 1})
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, () => {
      if (this.state.price_lower.length > 0 && this.state.price_upper.length > 0) {
        if (parseInt(this.state.price_lower,10) > parseInt(this.state.price_upper,10)) {
          this.setState({error: true})
        } else {
          this.setState({error: false})
        }
      }
      else {
        this.setState({error: false})
      }
    });
  };

  async onSubmit(dispatch,e) {
    e.preventDefault();


    const tempStartDate = moment(this.state.startDate).format('YYYY-MM-DD');;
    const tempEndDate = moment(this.state.endDate).format('YYYY-MM-DD');;

    // "https://localhost:8000/search/?start=2018-11-4&end=2018-11-8"
    // "https://localhost:8000/search/?price_lower=12&price_upper=13"
    var url = `https://localhost:8000/search/?guest=${this.state.guest}`;

    if (this.state.location.length > 0) {
      url = url.concat(`&location=${this.state.location}`);
    }
    if (this.state.price_lower.length > 0) {
      url = url.concat(`&price_lower=${this.state.price_lower}`);
    }
    if (this.state.price_upper.length > 0) {
      url = url.concat(`&price_upper=${this.state.price_upper}`);
    }
    if (this.state.startDate !== null &&  this.state.endDate !== null) {
      url = url.concat(`&start=${tempStartDate}&end=${tempEndDate}`);
    }

    const res = await axios.get(url);

    console.log("SUBMITTED",res.data);

    dispatch({
      type: 'SEARCH',
      payload: res.data
    })

    this.setState({
      location: '',

      price_lower: '',
      price_upper: '',

      guest: 1,

      startDate: null,
      endDate: null,

      error: false,
    })

  }

  checkSearchDisable() {
    const {location, startDate, endDate, price_lower, price_upper} = this.state;
    // || price_lower.length > 0 || price_upper.length > 0 || (startDate === null && endDate === null) || (startDate !== null && endDate !== null)
    if (location.length > 0 || price_lower.length > 0 || price_upper.length > 0 ) {
      if ((startDate === null && endDate === null) || (startDate !== null && endDate !== null)) {
        return false;
      }
      else {
        return true;
      }

    } else if (startDate !== null && endDate !== null) {
      return false;
    } else {
      return true;
    }

  }

  render () {
    const { classes } = this.props;
    const disabledSearch = this.checkSearchDisable();
    const {location, startDate, endDate, price_lower, price_upper, guest} = this.state;
    return(
      <Consumer>
        {value => {
          const {dispatch, searchStatus, AllHostingList} = value;

          return (
            <div>
              <div className="container">
                <div className="row">
                  <div className="col-8">
                    <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                      <Paper className={classes.root} elevation={1}>
                        <Typography align="center" variant="display1" component="h3">
                          Find your next stay
                        </Typography>
                        <div className="container">
                          <div className="row">
                            <div className="col-12">
                              <TextField
                                id="outlined-name"
                                label="Where"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange('location')}
                                margin="normal"
                                variant="outlined"
                                type="text"
                                fullWidth
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <TextField
                                id="outlined-name"
                                label="Price Upper"
                                error={this.state.error}
                                className={classes.textField}
                                value={this.state.price_upper}
                                onChange={this.handleChange('price_upper')}
                                margin="normal"
                                variant="outlined"
                                type="number"
                                fullWidth
                              />
                            </div>

                            <div className="col-6">
                              <TextField
                                id="outlined-name"
                                label="Price Lower"
                                error={this.state.error}
                                className={classes.textField}
                                value={this.state.price_lower}
                                onChange={this.handleChange('price_lower')}
                                margin="normal"
                                variant="outlined"
                                type="number"
                                fullWidth
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <GuestSelect guest={this.state.guest} handleGuest={this.handleGuest.bind(this)}/>
                            </div>
                            <div className="col-6">
                              <br/>
                              <DateRangePicker
                                startDate={this.state.startDate}
                                startDateId=""
                                endDateId=""
                                endDate={this.state.endDate}
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({ focusedInput })}
                                showClearDates={true}
                                minimumNights = {2}
                                />
                            </div>
                          </div>

                          <br/>
                          <Divider/>

                          <div className="row" style={{marginTop:'10px'}}>

                            <div className="col-2"></div>
                            <div className="col-8">
                              <Button
                                color="primary"
                                fullWidth
                                variant="contained"
                                type="submit"
                                disabled={disabledSearch}

                                >
                                Search
                              </Button>
                            </div>
                            <div className="col-2"></div>
                          </div>



                        </div>


                      </Paper>
                    </form>


                  </div>
                </div>
              </div>
              <Divider/>
              <SearchStatus
                search={searchStatus}
                location={location}
                startDate={startDate}
                endDate={endDate}
                price_lower={price_lower}
                price_upper={price_upper}
                guest={guest}
                accommNum={AllHostingList.length}/>
            </div>
          )
        }}
      </Consumer>

    )
  }
}
SearchSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchSection);

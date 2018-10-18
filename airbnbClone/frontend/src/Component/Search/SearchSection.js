import React from "react"
import axios from "axios"
import moment from "moment"

import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl/FormControl";

import {DateRangePicker} from "react-dates"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"

import GuestSelect from "../AccommodationDetail/GuestSelect"
import {Consumer} from "../../Context.js"
import SearchStatus from "./SearchStatus"

export default class SearchSection extends React.Component {
  handleChange = name => event => {
    this.setState(
      {[name]: event.target.value},
      () => {
        if (this.state.price_lower.length > 0 && this.state.price_upper.length > 0) {
          if (parseInt(this.state.price_lower, 10) > parseInt(this.state.price_upper, 10)) {
            this.setState({error: true})
          } else {
            this.setState({error: false})
          }
        } else {
          this.setState({error: false})
        }
      }
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      location: "",
      price_lower: "",
      price_upper: "",
      guest: 1,
      Accommodation_Type: "",
      startDate: null,
      endDate: null,
      error: false
    }
  }

  handleGuest(ops, num) {
    const limit = 5;
    if (ops === "-" && num > 1) {
      this.setState({guest: parseFloat(num) - 1})
    } else if (ops === "+" && num < limit) {
      this.setState({guest: parseFloat(num) + 1})
    }
  }

  async onSubmit(dispatch, HouseList, e) {
    e.preventDefault();

    const tempStartDate = moment(this.state.startDate).format("YYYY-MM-DD");
    const tempEndDate = moment(this.state.endDate).format("YYYY-MM-DD");

    let url = `/searchHosting/?guest=${this.state.guest}`;

    if (this.state.location.length > 0) {
      url = url.concat(`&location=${this.state.location}`)
    }
    if (this.state.Accommodation_Type.length > 0) {
      url = url.concat(`&Accommodation_Type=${this.state.Accommodation_Type}`)
    }
    if (this.state.price_lower.length > 0) {
      url = url.concat(`&price_lower=${this.state.price_lower}`)
    }
    if (this.state.price_upper.length > 0) {
      url = url.concat(`&price_upper=${this.state.price_upper}`)
    }
    if (this.state.startDate !== null && this.state.endDate !== null) {
      url = url.concat(`&start=${tempStartDate}&end=${tempEndDate}`)
    }

    const res = await axios.get(url);

    dispatch({
      type: "SEARCH",
      payload: {AllHostingList: res.data, HouseList: HouseList}
    });

    this.setState({
      location: "",
      price_lower: "",
      price_upper: "",
      guest: 1,
      Accommodation_Type: "",
      startDate: null,
      endDate: null,
      error: false
    })
  }

  checkSearchDisable() {
    const {
      location,
      startDate,
      endDate,
      price_lower,
      price_upper,
      Accommodation_Type
    } = this.state;

    if (location.length > 0 || price_lower.length > 0 ||
      price_upper.length > 0 || Accommodation_Type.length > 0) {
      return !((startDate === null && endDate === null) ||
        (startDate !== null && endDate !== null));
    } else
      return !(startDate !== null && endDate !== null);
  }

  render() {
    const disabledSearch = this.checkSearchDisable();
    const {
      location,
      startDate,
      endDate,
      price_lower,
      price_upper,
      guest,
      Accommodation_Type,
    } = this.state;


    return (
      <Consumer>
        {value => {
          const {dispatch, searchStatus, AllHostingList, HouseList} = value;
          return (
            <div className="d-flex justify-content-center my-5">
              <div className="d-flex flex-column my-5">

                <Paper className="d-inline-flex" elevation={1}>
                  <div className="container mx-5">
                    <Typography className="mt-1" align="center" component="h2" variant="display3" gutterBottom>
                      Find your next stay
                    </Typography>

                    <form onSubmit={this.onSubmit.bind(this, dispatch, HouseList)}>
                      <div className="row">
                        <div className="col-12">
                          <TextField
                            label="Location"
                            value={this.state.location}
                            onChange={this.handleChange("location")}
                            margin="normal"
                            variant="outlined"
                            type="text"
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-6">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="accom-type">Accommodation type</InputLabel>
                            <Select
                              value={Accommodation_Type}
                              onChange={this.handleChange("Accommodation_Type")}
                              inputProps={{
                                name: "Accommodation_Type",
                                id: "accom-type"
                              }}
                            >
                              <MenuItem value="Room">Room</MenuItem>
                              <MenuItem value="Studio">Studio</MenuItem>
                              <MenuItem value="House">House</MenuItem>
                              <MenuItem value="Apartment">Apartment</MenuItem>
                              <MenuItem value="Villa">Villa</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <TextField
                            label="Min price"
                            name="price_lower"
                            error={this.state.error}
                            value={this.state.price_lower}
                            onChange={this.handleChange("price_lower")}
                            margin="normal"
                            variant="outlined"
                            type="number"
                            fullWidth
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Max price"
                            name="price_upper"
                            error={this.state.error}
                            value={this.state.price_upper}
                            onChange={this.handleChange("price_upper")}
                            margin="normal"
                            variant="outlined"
                            type="number"
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <GuestSelect
                            guest={this.state.guest}
                            handleGuest={this.handleGuest.bind(this)}
                          />
                        </div>
                        <div className="col-6">
                          <DateRangePicker
                            startDate={this.state.startDate}
                            startDateId="1"
                            endDateId="2"
                            endDate={this.state.endDate}
                            onDatesChange={({startDate, endDate}) => this.setState({startDate, endDate})}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({focusedInput})}
                            showClearDates={true}
                            minimumNights={2}
                          />
                        </div>
                      </div>

                      <br/>
                      <Divider/>

                      <div className="row justify-content-center mt-3">
                        <div className="col-6">
                          <Button color="primary" variant="contained" type="submit"
                                  fullWidth disabled={disabledSearch}>
                            Search
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Paper>

                <Divider/>

                <SearchStatus
                  search={searchStatus}
                  location={location}
                  startDate={startDate}
                  endDate={endDate}
                  price_lower={price_lower}
                  price_upper={price_upper}
                  guest={guest}
                  Accommodation_Type={Accommodation_Type}
                  accommNum={AllHostingList.length}
                />
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
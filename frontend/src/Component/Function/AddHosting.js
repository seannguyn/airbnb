import React, { Component } from "react"
import { Consumer } from "../../Context.js"
import axios from "axios"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import { enumerateDaysBetweenDates } from "../Helper/Helper"
import FormControl from "@material-ui/core/FormControl"
import { withSnackbar } from "notistack"
import Button from "@material-ui/core/Button"

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  paper: {
    margin: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px`
  },
  form: {
    width: "80%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  typo: {
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    minWidth: 400
  }
})

class Hosting extends Component {
  constructor() {
    super()
    this.state = {
      accommodation: "", //accommodation id
      user: "", //user id
      date_start: "2018-06-01",
      date_end: "2023-06-01",
      check_in: "14:30",
      check_out: "10:00",
      price: "",
      guest: 2,
      description: "",

      startDate: {},
      endDate: {},

      error_guest: false,
      error_price: false,
    }
  }

  //set State when changing text
  onChange = e => {
    if (e.target.name === "guest") {
      this.setState({
        error_guest: e.target.value <= 0 ? true : false,
      })
    }
    if (e.target.name === "price") {
      this.setState({
        error_price: e.target.value <= 0 ? true : false,
      })
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  // handle when form is submitted
  onSubmit = async (dispatch, currUser, e) => {
    e.preventDefault()
    const {
      date_start,
      date_end,
      check_in,
      check_out,
      price,
      guest,
      description
    } = this.state

    const hostingHouse = {
      // user: should be the current login user
      accommodation: this.props.id, //accommodation id
      date_start: date_start,
      date_end: date_end,
      check_in: check_in,
      check_out: check_out,
      guest: guest,
      price: price,
      description: description
    }
    const date_free = enumerateDaysBetweenDates(date_start, date_end)

    const res = await axios.get(`/accommodation/${this.props.id}/`)

    const searchAccommodation = {
      accommodation: res.data.id,
      date_free: date_free,
      price: price,
      guest: guest,
      location: res.data.address,
      Accomodation_Type: res.data.Accomodation_Type,
    }

    await axios.post("/search/", searchAccommodation).catch(error => {
      console.log(error.response)
    })
    // AXIOS call here
    // Notes: need backend validation for date and available date to
    //        avoid conflicts.
    const { token } = currUser[0] //GET TOKEN FROM CURRENT USER
    const postHosting = await axios.post(
      "/accommodationHosting/",
      hostingHouse,
      {
        headers: {
          Authorization: { token }
        }
      }
    )

    dispatch({ type: "HOSTING", payload: postHosting.data })
    window.location.reload()
    this.props.history.push("/myHouses")

    this.props.onPresentSnackbar("success", "Accommodation is live")
  }

  render() {
    const { classes } = this.props
    const {
      price,
      description,
      check_in,
      check_out,
      date_start,
      date_end,
      guest,
    } = this.state
    const disable = price === "" || guest <= 0 ? true : false;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          const { currentUser } = value
          return (
            <div className="card-body mb-3">
              <div className="card-header">Host Accommodation</div>
              <Paper className={classes.paper}>
                <form
                  className={classes.form}
                  onSubmit={this.onSubmit.bind(this, dispatch, currentUser)}
                >
                  <FormControl
                    margin="normal"
                    required
                    fullWidth
                    style={{ marginBottom: "15px" }}
                  >
                    <TextField
                      id="date"
                      name="date_start"
                      label="Start date"
                      type="date"
                      value={date_start}
                      className={classes.textField}
                      onChange={this.onChange.bind(this)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </FormControl>
                  <FormControl
                    margin="normal"
                    required
                    fullWidth
                    style={{ marginBottom: "15px" }}
                  >
                    <TextField
                      id="date"
                      name="date_end"
                      label="End date"
                      type="date"
                      value={date_end}
                      className={classes.textField}
                      onChange={this.onChange.bind(this)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </FormControl>
                  <FormControl
                    margin="normal"
                    required
                    fullWidth
                    style={{ marginBottom: "15px" }}
                  >
                    <TextField
                      id="time"
                      label="Check In"
                      name="check_in"
                      value={check_in}
                      type="time"
                      className={classes.textField}
                      onChange={this.onChange.bind(this)}
                      InputLabelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        step: 300 // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      label="Check Out"
                      name="check_out"
                      value={check_out}
                      type="time"
                      className={classes.textField}
                      onChange={this.onChange.bind(this)}
                      InputLabelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        step: 300 // 5 min
                      }}
                    />
                  </FormControl>
                  <FormControl
                    margin="normal"
                    required
                    fullWidth
                    style={{ marginBottom: "15px" }}>
                    <TextField
                      error={this.state.error_guest}
                      label="Guest"
                      value={guest}
                      onChange={this.onChange.bind(this)}
                      name="guest"
                      type="number"
                      className={classes.textField}
                    />
                  </FormControl>
                  <FormControl
                    margin="normal"
                    required
                    fullWidth
                    style={{ marginBottom: "15px" }}
                  >
                    <TextField
                      error={this.state.error_price}
                      label="price"
                      value={price}
                      onChange={this.onChange.bind(this)}
                      name="price"
                      type="text"
                      className={classes.textField}
                    />
                  </FormControl>
                  <FormControl
                    margin="normal"
                    required
                    fullWidth
                    style={{ marginBottom: "15px" }}
                  >
                    <TextField
                      label="description"
                      value={description}
                      onChange={this.onChange.bind(this)}
                      name="description"
                      type="text"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                    disabled={disable}
                  >
                    Host this accommodation
                  </Button>
                </form>
              </Paper>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default withSnackbar(withStyles(styles)(Hosting))

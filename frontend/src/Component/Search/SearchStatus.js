import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import {withStyles} from "@material-ui/core/styles"
import {Consumer} from "../../Context.js"
import axios from "axios"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import Chip from "@material-ui/core/Chip"
import PlaceIcon from "@material-ui/icons/Place"
import HomeIcon from "@material-ui/icons/Home"
import FaceIcon from "@material-ui/icons/Face"
import DateRangeIcon from "@material-ui/icons/DateRange"
import AssessmentIcon from "@material-ui/icons/Assessment"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"
import {findDateRange} from "../Helper/Helper"

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  chip: {
    margin: theme.spacing.unit
  }
})

// const locationChip = (<Chip label="date" color="secondary" avatar={<Avatar><PlaceIcon /></Avatar>} variant="outlined" className={classes.chip}/>)

class SearchStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: props.search,
      accommodationNum: props.accommNum,
      location: props.location
    }
  }

  async clearSearch(dispatch, HouseList) {
    const allHosting = await axios.get("/accommodationHosting/");

    dispatch({
      type: "CLEAR_SEARCH",
      payload: {AllHostingList: allHosting.data, HouseList: HouseList}
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      location,
      startDate,
      endDate,
      price_lower,
      price_upper,
      search,
      Accommodation_Type
    } = nextProps
    var params = 0
    if (location.length > 0) {
      params += 1
    }
    if (Accommodation_Type.length > 0) {
      params += 1
    }
    if (startDate !== null && endDate !== null) {
      params += 1
    }
    if (price_lower.length > 0) {
      params += 1
    }
    if (price_upper.length > 0) {
      params += 1
    }

    if (search === false) return true;
    else if (params === 0) return false;
    else return true
  }

  makechip(classes) {
    const {
      location,
      startDate,
      endDate,
      guest,
      price_lower,
      price_upper,
      Accommodation_Type,
    } = this.props
    var chips = []
    if (Accommodation_Type.length > 0) {
      chips.push(
        <Chip
          key="type"
          label={Accommodation_Type}
          color="secondary"
          avatar={
            <Avatar>
              <HomeIcon/>
            </Avatar>
          }
          variant="outlined"
          className={classes.chip}
        />
      )
    }
    if (location.length > 0) {
      chips.push(
        <Chip
          key="location"
          label={location}
          color="secondary"
          avatar={
            <Avatar>
              <PlaceIcon/>
            </Avatar>
          }
          variant="outlined"
          className={classes.chip}
        />
      )
    }
    if (guest > 0) {
      chips.push(
        <Chip
          key="guest"
          label={guest}
          color="secondary"
          avatar={
            <Avatar>
              <FaceIcon/>
            </Avatar>
          }
          variant="outlined"
          className={classes.chip}
        />
      )
    }
    if (startDate !== null && endDate !== null) {
      const date = findDateRange(startDate, endDate);
      chips.push(
        <Chip
          key="date"
          label={date}
          color="secondary"
          avatar={
            <Avatar>
              <DateRangeIcon/>
            </Avatar>
          }
          variant="outlined"
          className={classes.chip}
        />
      )
    }
    if (price_lower.length > 0 && price_upper.length > 0) {
      const string = ` $${price_lower} - $${price_upper}`;
      chips.push(
        <Chip
          key="price"
          label={string}
          color="secondary"
          avatar={
            <Avatar>
              <AssessmentIcon/>
            </Avatar>
          }
          variant="outlined"
          className={classes.chip}
        />
      )
    } else if (price_lower.length > 0) {
      const string = `$${price_lower}`;
      chips.push(
        <Chip
          key="price"
          label={string}
          color="secondary"
          avatar={
            <Avatar>
              <ArrowForwardIosIcon/>
            </Avatar>
          }
          variant="outlined"
          className={classes.chip}
        />
      )
    } else if (price_upper.length > 0) {
      const string = `$${price_upper}`;
      chips.push(
        <Chip
          key="price"
          label={string}
          color="secondary"
          avatar={
            <Avatar>
              <ArrowBackIosIcon/>
            </Avatar>
          }
          variant="outlined"
          className={classes.chip}
        />
      )
    }

    return chips
  }

  render() {
    const {classes} = this.props;

    const chips = this.makechip(classes)
    if (this.props.search === true) {
      return (
        <Consumer>
          {value => {
            const {dispatch, HouseList} = value

            return (
              <div className="row mt-3">
                <div className="col-12">
                  <div>
                    <Paper className={classes.root} elevation={1}>
                      <Typography
                        align="center"
                        variant="headline"
                        component="h3"
                      >
                        Found {this.props.accommNum} Accomodations
                      </Typography>
                      <div align="center">{chips}</div>
                      <div align="right">
                        <Button
                          onClick={this.clearSearch.bind(
                            this,
                            dispatch,
                            HouseList
                          )}
                          color="secondary"
                          size="small"
                        >
                          Clear Search
                        </Button>
                      </div>
                    </Paper>
                  </div>
                </div>
              </div>
            )
          }}
        </Consumer>
      )
    } else {
      return <div/>
    }
  }
}

SearchStatus.propTypes = {
  classes: PropTypes.object.isRequired
}

SearchStatus.defaultProps = {
  location: "",
  startDate: null,
  endDate: null,
  guest: 0,
  price_lower: "",
  price_upper: "",
  Accommodation_Type: "",
}

export default withStyles(styles)(SearchStatus)

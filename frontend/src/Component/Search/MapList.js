import React from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})
class MapList extends React.Component {
  changeDisplay(display) {
    this.props.changeDisplay(display)
  }

  render() {
    const { classes } = this.props
    if (this.props.display === "list") {
      return (
        <div className="row">
          <div className="col-2">
            <Button
              className={classes.button}
              size="medium"
              color="secondary"
              variant="contained"
            >
              List
            </Button>
            <Button
              onClick={this.changeDisplay.bind(this, "map")}
              className={classes.button}
              size="medium"
            >
              Map
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col-2">
            <Button
              className={classes.button}
              size="medium"
              onClick={this.changeDisplay.bind(this, "list")}
            >
              List
            </Button>
            <Button
              className={classes.button}
              size="medium"
              color="secondary"
              variant="contained"
            >
              Map
            </Button>
          </div>
        </div>
      )
    }
  }
}

export default withStyles(styles)(MapList)

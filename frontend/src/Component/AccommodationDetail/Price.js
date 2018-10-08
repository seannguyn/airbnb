import React from "react"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import Divider from "@material-ui/core/Divider"

const styles = theme => ({
  typo: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
})

const Price = props => {
  const { classes } = props
  return (
    <div>
      <div className="row">
        <div className="col md-6">
          <Typography
            align="left"
            className={classes.typo}
            style={{ marginTop: "30px" }}
            variant="subheading"
          >
            ${parseFloat(props.pricePerNight)} x {props.daysDiff} nights
          </Typography>
        </div>
        <div className="col md-6">
          <Typography
            align="right"
            className={classes.typo}
            style={{ marginTop: "30px" }}
            variant="subheading"
          >
            ${parseFloat(props.pricePerNight) * props.daysDiff}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="col md-6">
          <Typography
            align="left"
            className={classes.typo}
            variant="subheading"
          >
            Promotion -{props.promotion * 100}%
          </Typography>
        </div>
        <div className="col md-6">
          <Typography
            align="right"
            className={classes.typo}
            variant="subheading"
          >
            -$
            {parseFloat(props.pricePerNight) * props.daysDiff * props.promotion}
          </Typography>
        </div>
      </div>
      <Divider />
      <div className="row">
        <div className="col md-6">
          <Typography align="left" className={classes.typo} variant="headline">
            Total
          </Typography>
        </div>
        <div className="col md-6">
          <Typography align="right" className={classes.typo} variant="title">
            $
            {parseFloat(props.pricePerNight) *
              props.daysDiff *
              (1 - props.promotion)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Price)

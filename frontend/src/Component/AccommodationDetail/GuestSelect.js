import React from "react"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "50%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },

  typo: {
    margin: `${theme.spacing.unit * 2}px`
  },
  panel: {
    marginTop: `${theme.spacing.unit * 2}px`,
    overflow: "hidden"
  }
})

class GuestSelect extends React.Component {
  state = {
    expanded: false
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleGuest(ops, num) {
    console.log(ops)
    this.props.handleGuest(ops, num)
  }

  render() {
    const { classes } = this.props
    const { expanded } = this.state
    return (
      <ExpansionPanel
        className={classes.panel}
        expanded={expanded}
        onChange={this.handleChange()}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {this.props.guest} Guest
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Typography className={classes.typo} variant="headline">
              Guest
            </Typography>
          </div>

          <div className={classNames(classes.column)}>
            <Typography className={classes.typo} variant="headline">
              <AddCircleIcon
                onClick={this.handleGuest.bind(this, "+", this.props.guest)}
              />{" "}
              {this.props.guest}{" "}
              <RemoveCircleIcon
                onClick={this.handleGuest.bind(this, "-", this.props.guest)}
              />
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails className={classes.details}>
          <Typography variant="caption">
            A maximum number of 3 infants are allowed
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary" onClick={this.handleChange()}>
            Close
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    )
  }
}
export default withStyles(styles)(GuestSelect)

import React from "react"

import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Divider from "@material-ui/core/Divider"

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

class Reminder extends React.Component {
  render() {
    return (
      <div style={{ marginTop: "50px", marginBottom: "50px" }}>
        <div className="row">
          <div className="col-12">
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h1>Reminder</h1>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Check in and checkout on time
                </Typography>
              </ExpansionPanelDetails>
              <Divider />
              <Divider />
              <ExpansionPanelDetails>
                <Typography>
                  Be respectful to the premise
                </Typography>
              </ExpansionPanelDetails>
              <Divider />
              <Divider />
              <ExpansionPanelDetails>
                <Typography>
                  If there is anything, contact us or the host
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Reminder)

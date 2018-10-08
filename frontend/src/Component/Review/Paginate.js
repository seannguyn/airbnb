import React from "react"
import { withStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import FirstPageIcon from "@material-ui/icons/FirstPage"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import Typography from "@material-ui/core/Typography"
import LastPageIcon from "@material-ui/icons/LastPage"
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
})

class Paginate extends React.Component {
  render() {
    const { classes, theme } = this.props

    return (
      <div className={classes.root}>
        <div className="row">
          <IconButton
            aria-label="First Page"
            disabled={this.props.currentPage === 1}
            onClick={this.props.firstPage}
          >
            {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            aria-label="Previous Page"
            disabled={this.props.currentPage === 1}
            onClick={this.props.prevPage}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
          <IconButton
            aria-label="Next Page"
            disabled={this.props.currentPage === this.props.totalPage}
            onClick={this.props.nextPage}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
          <IconButton
            aria-label="Last Page"
            disabled={this.props.currentPage === this.props.totalPage}
            onClick={this.props.lastPage}
          >
            {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
          <Typography style={{ margin: theme.spacing.unit }} variant="caption">
            Page {this.props.currentPage} of {this.props.totalPage}
          </Typography>
        </div>
      </div>
    )
  }
}

export default withStyles(actionsStyles, { withTheme: true })(Paginate)

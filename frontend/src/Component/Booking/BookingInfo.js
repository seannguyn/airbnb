import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import Divider from '@material-ui/core/Divider'
import PeopleIcon from '@material-ui/icons/People'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const styles = theme => ({
  paper: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    width: 'relative'
  },
  typo: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
})

class BookingInfo extends React.Component {
  render() {
    const { classes, price, firstImage } = this.props
    const { guest, startDate, endDate, accommodation } = this.props.detail
    return (
      <Paper className={classes.paper}>
        <div className="row">
          <div className="col-6">
            <Typography align="left" className={classes.typo} variant="title">
              {accommodation.title}
            </Typography>
            <Typography align="left" className={classes.typo} variant="caption">
              Entire {accommodation.Accomodation_Type} in{' '}
              {accommodation.addr_city}
            </Typography>
          </div>
          <div className="col-6">
            {firstImage ? (
              <img
                src={firstImage.a_image}
                height="60"
                width="120"
                alt="hostingimg"
              />
            ) : (
              <img
                src="https://vignette.wikia.nocookie.net/max-steel-reboot/images/7/72/No_Image_Available.gif/revision/latest?cb=20130902173013"
                height="60"
                width="120"
                alt="hostingimg"
              />
            )}
          </div>
        </div>
        <Divider />

        <div className="row">
          <div className="col-12">
            <Typography
              align="left"
              className={classes.typo}
              variant="subheading"
            >
              <PeopleIcon /> {guest} guests
            </Typography>
            <Typography
              align="left"
              className={classes.typo}
              variant="subheading"
            >
              {startDate} <ArrowForwardIcon /> {endDate}
            </Typography>
          </div>
        </div>

        <Divider />
        {price}
        <Divider />
        <div className="row">
          <div className="col-12">
            <Typography align="left" className={classes.typo} variant="title">
              Cancellation
            </Typography>
            <Typography align="left" className={classes.typo} variant="caption">
              Cancel within 48 hours of booking to get a full refund.
            </Typography>
          </div>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BookingInfo)

import React from 'react'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  typo: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
});

const HeaderPrice = (props) => {
  const {classes} = props;
  return (
    <div className="row">
      <div className="col-3">
        <Typography className={classes.typo} align="left" variant="headline">${props.totalPrice}</Typography>
      </div>
      <div className="col-19">
        <Typography className={classes.typo} align="left" variant="caption">{props.caption}</Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(HeaderPrice);

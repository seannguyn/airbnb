import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    display:'inline'
  },
});

class PaymentOptions extends React.Component {
  state = {
    expanded: false,
    payment: 'credit'
  };

  handleChange = (payment) => (event, expanded) => {
    this.setState({
      expanded: !this.state.expanded,
      payment: payment,
    });
    this.props.changePayment(payment);
  };
  render () {
    const { classes } = this.props;
    const { expanded, payment } = this.state;
    var head;
    const check = (<FontAwesomeIcon icon="check" size="sm"/>);

    if (expanded === false) {
      if (payment === 'credit') {
        head = (
          <div className="row">
          <div className="col-2">
            <Typography className={classes.heading}>
              <FontAwesomeIcon icon="credit-card" size='2x'/>
            </Typography>
          </div>

          <div className="col-10">
            <Typography className={classes.secondaryHeading}> Credit Card</Typography>
          </div>
          </div>
        )
      } else if (payment === 'paypal') {
        head = (
          <div className="row">
            <div className="col-4">
              <Typography className={classes.heading}>
                <FontAwesomeIcon icon={['fab', 'cc-paypal']} size='2x'/>
              </Typography>
            </div>
            <div className="col-8">
              <Typography className={classes.secondaryHeading}>PayPal</Typography>
            </div>
          </div>
        )



      }
    }
    else {
      head = (<div>
        <Typography className={classes.heading}>Select Payment</Typography>
      </div>)
    }
    return (
      <div className="row" style={{marginBottom:'50px'}}>
        <div className="col-12">
          <div className={classes.root}>
            <ExpansionPanel expanded={expanded} onChange={(expanded === false) ? this.handleChange(this.state.payment):null}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  {head}

              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List className={classes.root}>
                  <ListItem button onClick={this.handleChange("credit")}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon="credit-card" size='2x'/>
                    </ListItemIcon>
                    <ListItemText primary="Credit Card" />
                    {this.state.payment === 'credit' ? check : null}
                  </ListItem>
                  <ListItem button onClick={this.handleChange("paypal")}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={['fab', 'cc-paypal']} size='2x'/>
                    </ListItemIcon>
                    <ListItemText primary="Paypal" />
                    {this.state.payment === 'paypal' ? check : null}
                  </ListItem>
                </List>

              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaymentOptions);

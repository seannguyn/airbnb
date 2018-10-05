import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class FilledTextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    multiline: 'Controlled',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="5"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
          className={classes.textField}
          margin="dense"
          //helperText="hello"
          variant="filled"
        />
    );
  }
}

FilledTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextField);
import React from 'react'
import Cards from 'react-credit-cards';

import {withStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";

const styles = theme => ({
  form: {
    width: '80%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
});

class CardForm extends React.Component {
  state = {
    value: 0,
    error: false,
    card_number: '4900000000000000',
    name: 'sean',
    valid: '12/12',
    cvc: '555',
    focus: 'name',

  };

  errorCheck(credit) {
    if (credit.card_number.length < 16 ||
      credit.name.length === 0 ||
      credit.valid.length < 5 ||
      credit.cvc.length < 3) {
      this.setState({error: true})
      return true;
    } else {
      this.setState({error: false})
      return false;
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.errorCheck(this.state)) {
      this.props.submitPayment();
    }
  }

  onChange(e) {
    this.setState({error: false})
    if (e.target.name === 'valid' && e.target.value.length <= 5) {
      if (e.target.value.length === 1) {
        if (e.target.value > 1) {
          this.setState({[e.target.name]: '0' + e.target.value + '/'})
        }
        else {
          this.setState({[e.target.name]: e.target.value})
        }
      } else if (e.target.value.length === 2) {
        if (this.state.valid.length === 3) {
          this.setState({[e.target.name]: ''})
        } else {
          this.setState({[e.target.name]: e.target.value + '/'})
        }
      } else if (e.target.value.length >= 3) {
        this.setState({[e.target.name]: e.target.value})
      } else {
        this.setState({[e.target.name]: e.target.value})
      }
    } else if (e.target.name === 'cvc' && e.target.value.length <= 4) {
      this.setState({[e.target.name]: e.target.value})
    } else if (e.target.name === 'card_number' && e.target.value.length <= 16) {
      this.setState({[e.target.name]: e.target.value})
    } else if (e.target.name === 'name') {
      this.setState({[e.target.name]: e.target.value})
    }

    const credit = {
      card_number: this.state.card_number,
      name: this.state.name,
      valid: this.state.valid,
      cvc: this.state.cvc,
    };

    this.props.onChange(credit);

  }

  onFocus(focus) {
    this.setState({focus: focus});
  }

  goBack() {
    this.props.handleChange(0);
  }

  render() {
    const {card_number, name, valid, cvc, focus, error} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <div style={{marginTop: '20px'}}>
              <Cards
                number={card_number}
                name={name}
                expiry={valid}
                cvc={cvc}
                focused={focus}
                preview={false}
              />
            </div>
          </div>
          <div className="col-6">
            <form className={classes.form} onSubmit={this.onSubmit.bind(this)} id="form1">
              <FormControl margin="normal" required fullWidth style={{marginBottom: '10px'}}>
                <TextField
                  error={error}
                  label="Card Number"
                  name="card_number"
                  value={card_number}
                  onChange={this.onChange.bind(this)}
                  onFocus={this.onFocus.bind(this, "number")}
                  InputLabelProps={{shrink: true}}
                  type="number"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth style={{marginBottom: '10px'}}>
                <TextField
                  error={error}
                  label="Name"
                  name="name"
                  value={name}
                  onChange={this.onChange.bind(this)}
                  onFocus={this.onFocus.bind(this, "name")}
                  InputLabelProps={{shrink: true}}
                  type="text"
                />
              </FormControl>
              <div className="row">
                <div className="col-6">
                  <FormControl margin="normal" required fullWidth style={{marginBottom: '10px'}}>
                    <TextField
                      error={error}
                      label="Valid till"
                      name="valid"
                      value={valid}
                      onChange={this.onChange.bind(this)}
                      onFocus={this.onFocus.bind(this, "expiry")}
                      InputLabelProps={{shrink: true}}
                      type="text"
                    />
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl margin="normal" required fullWidth style={{marginBottom: '10px'}}>
                    <TextField
                      error={error}
                      label="CVC"
                      name="cvc"
                      value={cvc}
                      onChange={this.onChange.bind(this)}
                      onFocus={this.onFocus.bind(this, "cvc")}
                      InputLabelProps={{shrink: true}}
                      type="number"
                    />
                  </FormControl>
                </div>
              </div>
            </form>

          </div>

        </div>
        <div className="row" style={{marginTop: '15px'}}>
          <Button variant="contained" color="primary" type="submit" form="form1">Confirm and Pay</Button>
          <Button onClick={this.goBack.bind(this)}>Review detail</Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(CardForm);

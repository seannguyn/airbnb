import React from 'react'

import Cards from 'react-credit-cards'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  form: {
    width: '80%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  }
})

class CardFormComplete extends React.Component {
  state = {
    error: false,
    card_number: '4900000000000000',
    name: 'sean',
    valid: '12/12',
    cvc: '555',
    focus: 'name'
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.handleChange(2)
  }

  goBack() {
    this.props.handleChange(0)
  }

  render() {
    const { card_number, name, valid, cvc, focus, error } = this.state
    const { classes } = this.props
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <div style={{ marginTop: '20px' }}>
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
            <form
              className={classes.form}
              onSubmit={this.onSubmit.bind(this)}
              id="form1"
            >
              <FormControl
                margin="normal"
                required
                fullWidth
                style={{ marginBottom: '10px' }}
              >
                <TextField
                  error={error}
                  label="Card Number"
                  name="card_number"
                  value={card_number}
                  disabled={true}
                  InputLabelProps={{ shrink: true }}
                  type="number"
                />
              </FormControl>
              <FormControl
                margin="normal"
                required
                fullWidth
                style={{ marginBottom: '10px' }}
              >
                <TextField
                  error={error}
                  label="Name"
                  name="name"
                  value={name}
                  disabled={true}
                  InputLabelProps={{ shrink: true }}
                  type="text"
                />
              </FormControl>
              <div className="row">
                <div className="col-6">
                  <FormControl
                    margin="normal"
                    required
                    fullWidth
                    style={{ marginBottom: '10px' }}
                  >
                    <TextField
                      error={error}
                      label="Valid till"
                      name="valid"
                      value={valid}
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                      type="text"
                    />
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl
                    margin="normal"
                    required
                    fullWidth
                    style={{ marginBottom: '10px' }}
                  >
                    <TextField
                      error={error}
                      label="CVC"
                      name="cvc"
                      value={cvc}
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                      type="number"
                    />
                  </FormControl>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row" style={{ marginTop: '15px' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            form="form1"
          >
            Confirm and Pay
          </Button>
          <Button onClick={this.goBack.bind(this)}>Review detail</Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CardFormComplete)

import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import { Consumer } from '../../Context'
import Avatar from '@material-ui/core/Avatar'
import FormControl from '@material-ui/core/FormControl'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'
import { withSnackbar } from 'notistack'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    height: 60
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  typo: {
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit * 3
  }
})

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      password_confirm: '',
      error: {},
      error_bool: false
    }
  }

  closeDiaglog(dispatch) {
    dispatch({ type: 'CLOSE_DIALOG' })
  }

  errorCheck() {
    const { password, password_confirm } = this.state
    if (password.length === 0) {
      this.setState({
        error: { password: 'please enter password' },
        error_bool: true
      })
      return true
    } else if (password.length < 5) {
      this.setState({
        error: { password: 'password too short (>5)' },
        error_bool: true
      })
      return true
    }
    if (this.props.Signin_form === false && password !== password_confirm) {
      this.setState({
        error: { password: 'password dont match' },
        error_bool: true
      })
      return true
    }
  }

  async handleLogin(dispatch, e) {
    e.preventDefault()
    var userInfo
    if (this.errorCheck() === true) {
      return
    } else if (this.props.Signin_form === true) {
      const account = {
        username: this.state.username,
        password: this.state.password
      }
      // dispatch({type:"LOGIN", payload: account});

      await axios
        .post('/api-token-auth/', account)
        .then(response => {
          userInfo = response.data
          dispatch({ type: 'LOGIN', payload: response.data })
          this.setState({ error: {}, error_bool: false })
          this.loggedInUser(userInfo)
        })
        .catch(error => {
          this.setState({
            error: {
              username: 'Check your username again',
              password: 'Check your password again'
            },
            error_bool: true
          })
        })
    } else {
      const { username, password, password_confirm } = this.state
      const newAccount = {
        username: username,
        password1: password,
        password2: password_confirm,
        email: username + '@zmail.com'
      }
      await axios
        .post('/rest-auth/registration/', newAccount)
        .then(response => {})
        .catch(error => {
          if (error.response.data.username) {
            this.setState({
              error: { username: error.response.data.username },
              error_bool: true
            })
          }
          if (error.response.data.password1) {
            this.setState({
              error: {
                password: 'password needs more sophistication',
                username: this.state.error.username
              },
              error_bool: true
            })
          }
        })

      const account = {
        username: username,
        password: password
      }

      await axios.post('/api-token-auth/', account).then(response => {
        userInfo = response.data
        dispatch({ type: 'LOGIN', payload: response.data })
        this.setState({ error: {}, error_bool: false })
        this.loggedInUser(userInfo)
      })
    }
  }

  loggedInUser(userInfo) {
    var string = 'Welcome '.concat(userInfo.username)
    this.props.onPresentSnackbar('success', string)

    var array = []
    array.push(userInfo)
    localStorage.setItem('currentUser', JSON.stringify(array))
  }

  toggleSignIn(dispatch) {
    this.setState({ error: {}, error_bool: false })
    dispatch({ type: 'TOGGLE_SIGNIN' })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error_bool: false,
      error: {}
    })
  }

  render() {
    const { backdrop } = this.state
    const { classes } = this.props
    return (
      <Consumer>
        {value => {
          const { dispatch, dialog } = value
          return (
            <Dialog
              open={dialog.open}
              aria-labelledby="form-dialog-title"
              disableBackdropClick={backdrop}
              className={classes.layout}
            >
              <CloseIcon
                onClick={this.closeDiaglog.bind(this, dispatch)}
                style={{ float: 'right' }}
              />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography variant="headline">Authentication</Typography>
                <form
                  className={classes.form}
                  onSubmit={this.handleLogin.bind(this, dispatch)}
                >
                  {dialog.login === true ? (
                    <div>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_bool}
                          helperText={
                            this.state.error_bool === true
                              ? this.state.error.username
                              : null
                          }
                          label="Username"
                          autoFocus
                          onChange={this.onChange.bind(this)}
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_bool}
                          helperText={
                            this.state.error_bool === true
                              ? this.state.error.password
                              : null
                          }
                          label="Password"
                          onChange={this.onChange.bind(this)}
                          name="password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        fullWidth
                        variant="raised"
                        color="primary"
                      >
                        Sign in
                      </Button>
                      <Divider />
                      <Typography className={classes.typo}>
                        Don't have an account?
                        <Button
                          variant="contained"
                          onClick={this.toggleSignIn.bind(this, dispatch)}
                          color="secondary"
                          className={classes.button}
                        >
                          Sign up
                        </Button>
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_bool}
                          helperText={
                            this.state.error_bool
                              ? this.state.error.username
                              : null
                          }
                          label="Username"
                          autoFocus
                          onChange={this.onChange.bind(this)}
                          id="username"
                          name="username"
                          autoComplete="username"
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_bool}
                          helperText={
                            this.state.error_bool === true
                              ? this.state.error.password
                              : null
                          }
                          label="Password"
                          onChange={this.onChange.bind(this)}
                          name="password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_bool}
                          helperText={
                            this.state.error_bool === true
                              ? this.state.error.password
                              : null
                          }
                          label="Confirm Password"
                          onChange={this.onChange.bind(this)}
                          name="password_confirm"
                          type="password"
                          id="password_confirm"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        fullWidth
                        variant="raised"
                        color="secondary"
                        className={classes.submit}
                      >
                        Sign up
                      </Button>
                      <Typography className={classes.typo}>
                        Have an account?
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={this.toggleSignIn.bind(this, dispatch)}
                        >
                          Sign in
                        </Button>
                      </Typography>
                    </div>
                  )}
                </form>
              </Paper>
            </Dialog>
          )
        }}
      </Consumer>
    )
  }
}

export default withSnackbar(withStyles(styles)(LoginDialog))

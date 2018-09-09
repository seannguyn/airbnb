import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import {Consumer} from '../../Context';
import Avatar from '@material-ui/core/Avatar';
// import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    height: 60,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  typo: {
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit*3,
  },
});

// const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LoginDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirm:'',
      error: {},
      error_bool: false,
    }
  }


  closeDiaglog(dispatch) {
    dispatch({type:"CLOSE_DIALOG"})
  }

  errorCheck() {
    const {password,password_confirm} = this.state;
    console.log(this.props.Signin_form,"hihi");
    if (password.length === 0) {
      this.setState({error:{password:'please enter password'}, error_bool:true})
      return true;
    }
    else if (password.length < 5) {
      this.setState({error:{password:'password too short (>5)'}, error_bool:true})
      return true;
    }
    if (this.props.Signin_form === false && password !== password_confirm) {
      console.log("ENTER");
      this.setState({error:{password:'password dont match'}, error_bool:true})
      return true;
    }
  }

  async handleLogin(dispatch,e) {
    e.preventDefault()
    if (this.errorCheck() === true) {
      return
    } else if (this.props.Signin_form === true){
      const account = {
        username: this.state.username,
        password: this.state.password
      }
      // dispatch({type:"LOGIN", payload: account});

      let res;
      let err;
      await axios.post('https://localhost:8000/api-token-auth/', account)
          .then(response => {
              res = response.data;
              dispatch({type:'LOGIN', payload:response.data});
              this.setState({error:{}, error_bool: false})
          })
          .catch(error => {
              console.log("ERR: ", error.response);
              err = error.response;
              this.setState({error:{username:"Check your username again", password:"Check your password again"}, error_bool: true});
          });
          this.setState({
            username: '',
            password: '',
            password_confirm:'',

          })

    } else {
      console.log("signup");
      const {username, password, password_confirm} = this.state;
      const newAccount = {
          username: username,
          password1: password,
          password2: password_confirm,
          email: username+'@zmail.com'
      }
      await axios.post('https://localhost:8000/rest-auth/registration/', newAccount)
          .then((response) => {

          })
          .catch(error => {
              console.log("ERR: ", error.response.data);
              if (error.response.data.username) {
                this.setState({error:{username:error.response.data.username}, error_bool: true});
              }
              if (error.response.data.password1) {
                this.setState({error:{password:"password needs more sophistication", username: this.state.error.username}, error_bool: true});
              }
              console.log(this.state);
          });

          const account = {
            username: username,
            password: password,
          }

          await axios.post('https://localhost:8000/api-token-auth/', account)
              .then(response => {
                  dispatch({type:'LOGIN', payload:response.data});
                  this.setState({error:{}, error_bool: false})
              })

    }

  }

  toggleSignIn(dispatch) {
    this.setState({error:{}, error_bool: false})
    dispatch({type:"TOGGLE_SIGNIN"})
  }

  onChange(e) {
    console.log("here",e.target.name,e.target.value);
    this.setState({ [e.target.name] : e.target.value})
  }


  haha() {
    console.log("wtf");
  }

  render () {
    const {backdrop} = this.state;
    const { classes } = this.props;
    return (
      <Consumer>
        {value => {
          const {dispatch, dialog} = value
          return (
            <Dialog
              open={dialog.open}
              aria-labelledby="form-dialog-title"
              disableBackdropClick={backdrop}
              className={classes.layout}
            >

            <CloseIcon onClick={this.closeDiaglog.bind(this, dispatch)}style={{float:'right'}}/>
              <Paper className={classes.paper}>

                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography variant="headline">Authentication</Typography>
                <form className={classes.form} onSubmit={this.handleLogin.bind(this, dispatch)}>
                {dialog.login === true ?
                  <div>
                    <FormControl margin="normal" required fullWidth>
                      <TextField
                          error={this.state.error_bool}
                          helperText={this.state.error_bool === true ? this.state.error.username : null}
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
                          helperText={this.state.error_bool === true ? this.state.error.password : null}
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
                    <Typography className={classes.typo}>Don't have an account?
                      <Button
                        variant="contained"
                        onClick={this.toggleSignIn.bind(this, dispatch)}
                        color="secondary" className={classes.button}>
                        Sign up
                      </Button>
                    </Typography>
                  </div> :
                  <div>
                    <FormControl margin="normal" required fullWidth>
                      <TextField
                        error={this.state.error_bool}
                        helperText={this.state.error_bool ? this.state.error.username : null}
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
                        helperText={this.state.error_bool === true ? this.state.error.password : null}
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
                        helperText={this.state.error_bool === true ? this.state.error.password : null}
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
                    <Typography className={classes.typo}>Have an account?
                      <Button variant="contained" color="primary" className={classes.button} onClick={this.toggleSignIn.bind(this, dispatch)}>
                        Sign in
                      </Button>
                    </Typography>
                  </div>
                    }

                </form>
              </Paper>
            </Dialog>
          )
        }}
      </Consumer>
    )
  }
}

export default withStyles(styles)(LoginDialog);

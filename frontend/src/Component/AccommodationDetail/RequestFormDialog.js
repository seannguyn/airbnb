import React from 'react';
import axios from "axios";
import {Consumer} from '../../Context'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSnackbar } from "notistack"

class RequestFormDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: '',
      title: '',
      content: '',
    }
  }

  handleClose = () => {
    this.props.handleClose()
  };

  async handleSubmit(dispatch, e) {
    e.preventDefault();

    const hostID = this.props.host;
    const request = {
      title: this.state.title,
      date: 'Oct 5 2016',
      content: this.state.content,
      sender: this.state.email,
      toHost: hostID,
      hasReply: false,
      reply: "",
    };
    const newRequest = await axios.post('/bookRequest/', request)

    dispatch({
      type: 'NEW_REQUEST',
      payload: newRequest.data
    });

    this.props.handleClose();
    this.props.onPresentSnackbar('success', 'Request Sent to Host')
  };

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {email, title, content} = this.state;
    const disabled = (email.length === 0 || title.length === 0 || content.length === 0);

    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div>
              <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Request</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Send a request or enquiry to this accommodation host.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={this.onChange.bind(this)}
                    type="email"
                    margin="normal"
                    fullWidth/>
                  <TextField
                    id="title"
                    label="Subject"
                    name="title"
                    value={title}
                    onChange={this.onChange.bind(this)}
                    type="text"
                    margin="normal"
                    fullWidth/>
                  <TextField
                    id="message"
                    label="Your message"
                    name={"content"}
                    value={content}
                    onChange={this.onChange.bind(this)}
                    variant="filled"
                    margin="normal"
                    multiline
                    rowsMax="5"
                    fullWidth/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button disabled={disabled} variant="contained" onClick={this.handleSubmit.bind(this, dispatch)} color="primary">
                    Send Request
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )
        }}
      </Consumer>

    );
  }
}

export default withSnackbar(RequestFormDialog)

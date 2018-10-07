import React from 'react';
import axios from "axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {

  handleClose = () => {
    this.props.handleClose()
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({submitted: true});

    console.log("FORM STUFF: ", this.state);

    const hostID = this.props.host;
    const request = {
      title: "Pet Request",
      date: 'Oct 5 2016',
      content: "Can i bring my dog?",
      sender: "seannguyen5696@gmail.com",
      toHost: hostID,
      hasReply: false,
      reply: "",
    };
    //const res = await axios.post('/requests/', request);
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: '',
      title: '',
      content: '',
      submitted: false,
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {email, title, content, submitted} = this.state;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">

          <DialogTitle id="form-dialog-title">Request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Send a request or enquiry to this accommodation's host.
            </DialogContentText>

            <TextField
              autoFocus
              id="email"
              label="Email Address"
              name="email"
              value={email}
              error={submitted && email === ""}
              onChange={this.onChange.bind(this)}
              type="email"
              margin="normal"
              fullWidth/>

            <TextField
              id="title"
              label="Subject"
              name="title"
              value={title}
              error={submitted && title === ""}
              onChange={this.onChange.bind(this)}
              type="text"
              margin="normal"
              fullWidth/>

            <TextField
              id="message"
              label="Your message"
              name={"content"}
              value={content}
              error={submitted && content === ""}
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
            <Button onClick={this.handleSubmit} color="primary">
              Send Request
            </Button>
          </DialogActions>

        </Dialog>
      </div>
    );
  }
}
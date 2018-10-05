import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MultilineTextField from '../MaterialUI/MultilineTextField'

export default class FormDialog extends React.Component {

  handleClose = () => {
    this.props.handleClose()
  };

  handleSubmit = () => {

  };

  render() {
    return (
      <div>
        <Dialog
          open = {this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title" >

          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>

            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Email Address"
              type="email"
              fullWidth />

            <TextField
              id="filled-multiline-flexible"
              label="Your message"
              multiline
              rowsMax="5"
              margin="dense"
              variant="filled"
              fullWidth
            />
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
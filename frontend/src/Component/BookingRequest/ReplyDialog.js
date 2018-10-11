import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withSnackbar } from 'notistack';
import {Consumer} from '../../Context'

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
  },
  dialogPaper: {
        minHeight: '40vh',
        maxHeight: '40vh',
        minWidth: '60vh',
        maxWidth: '60vh',
    },
});

class ReplyDialog extends React.Component {


constructor(props) {
  super(props)
  this.state = {
    content: '',
  }
}

  handleClose = () => {
    this.props.handleOpenReplyForm();
  };

  handleSend(dispatch) {

    const {reply} = this.props;
    var newMail = {
      email: reply.sender,
      title: reply.title,
      content: this.state.content,
    }
    this.props.sendReply(newMail,dispatch)
    // axios back to server

    this.props.onPresentSnackbar('success','Reply sent');
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {classes} = this.props
    const disable = (this.state.content.length === 0 ? true : false)
    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div>
              <Dialog
                open={true}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth='lg'
                classes={{ paper: classes.dialogPaper }}
              >
                <DialogContent>
                  <Typography style={{width: '100%', marginBottom:'10px'}} variant="headline">{this.props.reply.title}</Typography>
                  <Typography style={{width: '100%', marginBottom:'10px'}}>{this.props.reply.content}</Typography>
                  <TextField
                    className={classes.textField}
                    label="Enter message here"
                    name="content"
                    multiline
                    fullWidth
                    variant="outlined"
                    onChange={this.onChange.bind(this)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="secondary" variant="contained">
                    Cancel
                  </Button>
                  <Button disabled={disable} onClick={this.handleSend.bind(this,dispatch)} color="primary" variant="contained">
                    Send
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

ReplyDialog.defaultProps = {
  reply: {
    title: 'Re: Request Pet',
    date: "Oct 4 2018",
    content: "Can I bring my dog?",
    sender: "seannguyen5696@gmail.com",
    hasReply: true,
    reply: "yes you can",
    toHost: 1,
  }
}

export default withSnackbar(withStyles(styles)(ReplyDialog));

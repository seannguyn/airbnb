import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ReviewComponent from '../Review/ReviewComponent'

const styles = theme => ({
  dialogPaper: {
    minHeight: '40vh',
    maxHeight: '80vh',
    minWidth: '40vw',
    maxWidth: '60vw',
  },
});

class ReviewPreview extends React.Component {

  handleClose = () => {
    this.props.handleClose()
  };

  render() {
    const {classes} = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        maxWidth='lg'
        classes={{paper: classes.dialogPaper}}
      >
        <DialogContent>
          <ReviewComponent review={this.props.reviews}/>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ReviewPreview);

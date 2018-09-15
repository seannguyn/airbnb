import React from 'react';
import axios from 'axios'

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Rating
import Rating from 'react-rating'
import like from '../../assets/img/icons/like.png'
import like_empty from '../../assets/img/icons/like_empty.png'

export default class FormDialog extends React.Component {
  state = {
		open: true,
		star: 0,
		comment: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

	handleSubmit = async () => {
		const { star, comment, currentUser } = this.state;
		const { requireReviewItem } = this.props;
		console.log("THIS PROPSSSS: ", this.props);
		console.log("CLOASE: ", star, " ", comment, currentUser);
		let newReview = {
			user: currentUser[0].user_id,
			accommodation: requireReviewItem.accommodation,
			user: requireReviewItem.booker,
			booking: requireReviewItem.id,
			star: star,
			review: comment
		}
		const res = await axios.post("https://localhost:8000/reviews/", newReview);
		console.log("Review Successfully");
		this.setState({ open: false });
	}

	handleReviewOnChange = (value) => {
		console.log("Star Given: ", value);
		this.setState({star: value});
	}

	handleTextFieldChange = (e) => {
		this.setState({comment: e.target.value});
		console.log("TEXT: ", e.target.value);
	}

	componentDidMount(){
		localStorage.getItem('currentUser')
			&& this.setState({
				currentUser: JSON.parse(localStorage.getItem('currentUser'))
			});;
	}

  render() {
    console.log("Dialog Props: ", this.props);
		const { requireReviewItem } = this.props,
					{ star, comment} = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You recently stay from ACCOMM_NAME from {requireReviewItem.date_start} to {requireReviewItem.date_end}
						</DialogContentText>
						<DialogContentText>
						Can you kindly give us your thought about it?
						</DialogContentText>
						<Rating
							initialRating={this.state.star}
							emptySymbol={<img src={like_empty} className="icon" />}
							fullSymbol={<img src={like} className="icon" />}
							onChange={this.handleReviewOnChange}
						/>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Comment"
              type="email"
							fullWidth
							onChange={this.handleTextFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No, thanks
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

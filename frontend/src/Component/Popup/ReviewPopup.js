import React from 'react'

// Material UI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

// Rating
import Rating from 'react-rating'
import like from '../../assets/img/icons/like.png'
import like_empty from '../../assets/img/icons/like_empty.png'

export default class ReviewPopup extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			accommodation: props.accommodation,
			open: props.open,
			star: 0,
			comment: ''
		};
	}


  handleClose = () => {
    this.setState({ open: false });
  };

	handleReviewOnChange = (value) => {
		this.setState({star: value});
	}

	handleTextFieldChange = (e) => {
		this.setState({comment: e.target.value});
	}

	componentDidMount(){
		localStorage.getItem('currentUser')
			&& this.setState({
				currentUser: JSON.parse(localStorage.getItem('currentUser'))
			});;
	}

  render() {
		const { requireReviewItem } = this.props;
		const { star, comment, currentUser } = this.state;
		const { open, accommodation } = this.state
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Review</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You recently stay from {accommodation.title} from {requireReviewItem.date_start} to {requireReviewItem.date_end}
						</DialogContentText>
						<DialogContentText>
						Can you kindly give us your thought about it?
						</DialogContentText>
						<Rating
							initialRating={this.state.star}
							emptySymbol={<img src={like_empty} className="icon" alt="emptyicon" />}
							fullSymbol={<img src={like} className="icon" alt="fullicon" />}
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
            <Button onClick={this.props.handleSubmitReview.bind(
							this, star, comment, currentUser, requireReviewItem
						)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

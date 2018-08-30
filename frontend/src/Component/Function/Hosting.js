import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Review from '../Review/Review';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class Hosting extends React.Component {

  constructor() {
    super();
    this.state = {
      showHosting: false,
      reviews: {},
      seeReviews: false,
      id: ''
    }

  }

  handleExpand() {
    this.setState({showHosting : !this.state.showHosting})
  }

  starCalculator(reviews){
    let avgRating = 0; 

    for(let key in reviews){
      if(reviews.hasOwnProperty(key)){
        avgRating = avgRating + reviews[key].star;
      }
    }

    return avgRating/reviews.length;
  }

  showReview = () => {
    this.setState({seeReviews: !this.state.seeReviews});
  }

  async componentDidMount  () {
    // console.log(this.props.house.id," pamramm")
    // this.setState({id: this.props.match.params})
    const {id} = this.props.house;
    let reviews, err;
    await axios.get(`https://localhost:8000/accommodation/${id}/reviews/`)
                .then(
                    response => {
                      reviews = response.data
                    }
                ).catch(
                  error => {
                    err = error.response;
                  }
                )

    if(err == null && reviews.length > 0)
      this.setState({reviews:reviews});
  }

  render () {
    let Rating = require('react-rating');
    const readonly = true;

    const {reviews} = this.state;
    const avgRating =  this.starCalculator(reviews);
    console.log('PROPS ', this.props);
    const {house, SingleHost} = this.props;
    const {id} = this.props.house;
    const {showHosting} = this.state;

    const { classes} = this.props;

    return (
      <div style={{padding:"1rem"}}>
      <Card className={classes.card} style={{}}>
        <CardActionArea>
          <CardMedia>
              <img src="/" height="250" width="345"/>
          </CardMedia>
          
        </CardActionArea>

          <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {house.Accomodation_Type} ${SingleHost.price}/night
                
              </Typography>
                
              <Typography component="p">
                  {house.addr_number}, {house.addr_street}, {house.addr_city}, {house.addr_state}
                  <i onClick={this.handleExpand.bind(this)} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>
                </Typography>
            </CardContent>

          {showHosting === true ?
            <ul className="list-group">
              <li className="list-group-item">start_date : {SingleHost.date_start}</li>
              <li className="list-group-item">end_date :  {SingleHost.date_end}</li>
              <li className="list-group-item">price :  {SingleHost.price}</li>
            </ul>
          : null}

          {reviews.length > 0 ?
          <CardContent>
            <Rating 
                readonly={readonly} 
                initialRating={avgRating}
            />
            <Link to="" onClick={() => this.setState({seeReviews: !this.state.seeReviews})}>({reviews.length})</Link>
            </CardContent>
          : <CardContent>
              <Rating 
                readonly={readonly} 
                initialRating={0}
            />
              No reviews yet
            </CardContent> 
          }
          
          {this.state.seeReviews ?
            <CardContent>{
              reviews.map(review =>
                <Review
                  key={review.id}
                  accommodation={review.accommodation}
                  star={review.star}
                  user={review.user}
                  review={review.review}
                  text='Close'
                  closeReview={this.showReview.bind(this)}
              />
              )
              
            }
              <button onClick={this.showReview.bind(this)}>Close</button>
            </CardContent>
            : null
          }
      </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Hosting);

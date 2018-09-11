import React, { Component } from 'react';
import axios from 'axios';

class Review extends Component {
    state = {  }

    async componentDidMount(){
        console.log("DIDMOUTNREVIEW: ", this.props);
        const res = await axios.get("https://localhost:8000/users/1/");
        console.log("RES: ", res.data);
    }

    render() {
        console.log("GO TO REVIEW");
        console.log("props reivw: ", this.props)
        const {text, closeReview, star, review, user} = this.props;
        return (
            <React.Fragment>

                    <div className="container" style={{background:"#f7f7f7"}}>
                    Rating {star}
                    <p><b>{review}  <i>(by {user})</i></b></p> 
                    </div>

            </React.Fragment>
        );
      }
    }

export default Review;

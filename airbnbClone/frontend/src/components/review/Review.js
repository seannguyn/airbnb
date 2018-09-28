import React from 'react';
import axios from 'axios';

class Review extends React.Component {
  state = {};

  componentDidMount() {
    console.log("DIDMOUTNREVIEW: ", this.props);
    const res = axios.get("https://localhost:8000/users/1/");
    console.log("RES: ", res.data);
  }

  render() {
    const {star, review, user} = this.props;
    return (
      <React.Fragment>
        <div className="container" style={{background: "#f7f7f7"}}>
          Rating {star}
          <p><b>{review} <i>(by {user})</i></b></p>
        </div>
      </React.Fragment>
    );
  }
}

export default Review;

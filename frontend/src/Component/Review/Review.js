import React, { Component } from "react"
import axios from "axios"

class Review extends Component {
  state = {}

  async componentDidMount() {
    const res = await axios.get("/users/1/")
  }
  render() {
    const { /*text, closeReview, */ star, review, user } = this.props
    return (
      <React.Fragment>
        <div className="container" style={{ background: "#f7f7f7" }}>
          Rating {star}
          <p>
            <b>
              {review} <i>(by {user})</i>
            </b>
          </p>
        </div>
      </React.Fragment>
    )
  }
}

export default Review

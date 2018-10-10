import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import { Consumer } from "../../Context"

class ReviewRow extends React.Component {
  state = {
    reply: false
  }

  openReply = () => {
    this.setState({
      reply: true
    })
  }

  closeReply = () => {
    this.setState({
      reply: false
    })
  }

  render() {
    const monthNames = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    const month = monthNames[new Date(this.props.review.date_posted).getMonth()]
    const year = new Date(this.props.review.date_posted).getFullYear()
    const month_year = month + " " + year

    console.log("USERNAME: ", this.props.review)

    return (
      <Consumer>
        {value => {
          return (
            <div>
              <div style={{ marginTop: "15px", marginLeft: "15px" }}>
                <div className="row">
                  <div className="col-1">
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </div>
                  <div className="col-11">
                    <Typography variant="subheading">
                      {this.props.review.username}
                    </Typography>
                    <Typography variant="caption">{month_year}</Typography>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                <div className="row">
                  <div className="col-12">
                    <p>{this.props.review.review}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default ReviewRow

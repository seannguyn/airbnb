import React from "react"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import PersonIcon from "@material-ui/icons/Person"
import { Consumer } from "../../Context"
import ReplyForm from "./ReplyForm"

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
                      {this.props.review.user}
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
              <Button color="secondary" onClick={this.openReply}>
                {" "}
                Reply{" "}
              </Button>
              {this.state.reply === true && (
                <ReplyForm close={this.closeReply} />
              )}
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default ReviewRow

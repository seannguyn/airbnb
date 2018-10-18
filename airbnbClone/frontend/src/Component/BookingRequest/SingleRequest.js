import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import BlockIcon from "@material-ui/icons/Block";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import uuid from 'uuid';
import ReplyDialog from './ReplyDialog'
import {Consumer} from '../../Context'
import axios from 'axios';

const styles = theme => ({
  card: {
    width: '60%'
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class SingleRequest extends React.Component {
  state = { expanded: false, dialog: false };

  // need a msg props

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleOpenReplyForm(){
    this.setState({
      dialog: !this.state.dialog,
    })
  }

  async sendReply(mail,dispatch) {

    this.handleOpenReplyForm()

    // do it here, sent mail axios etc
    // put this.props.request

    const singleRequest = {
      ...this.props.request,
      hasReply: true,
      reply: mail.content
    }

    dispatch({
      type: 'REPLY_SENT',
      payload: {singleRequest: singleRequest}
    })

    await axios.put(`/bookRequest/${this.props.request.id}/`,singleRequest)
  }

  async handleDeleteRequest(dispatch) {

    dispatch({
      type: 'DELETE_NEW_REQUEST',
      payload: {singleRequest: this.props.request}
    })

    await axios.delete(`/bookRequest/${this.props.request.id}/`)
  }

  render() {
    const { classes } = this.props;
    const { request } = this.props;

    return (
      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div>
              {this.state.dialog === true ? <ReplyDialog reply={this.props.request} sendReply={this.sendReply.bind(this)} handleOpenReplyForm={this.handleOpenReplyForm.bind(this)}/> : null}
              <div className="row" style={{margin:'10px'}}>
                <Card className={classes.card}>
                  <CardHeader
                    title={request.title}
                    subheader={request.date}
                  />

                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                    <Button color="secondary" onClick={this.handleOpenReplyForm.bind(this)}>Reply</Button>
                    <IconButton aria-label="Share" onClick={this.handleDeleteRequest.bind(this, dispatch)}>
                      <BlockIcon />
                    </IconButton>
                  <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography variant="headline">
                        {request.content}
                      </Typography>

                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

SingleRequest.propTypes = {
  classes: PropTypes.object.isRequired
};

SingleRequest.defaultProps = {
  request: {
    id: uuid.v4(),
    title: 'Regarding Pets',
    date: 'September 14, 2016',
    content: 'can i bring my dogs???',
    sender: 'seannguyen5696@gmail.com',
    toHost: 1
  }
}

export default withStyles(styles)(SingleRequest);

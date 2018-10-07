import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import BlockIcon from "@material-ui/icons/Block";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from 'axios'
import {RequestConsumer} from './RequestContext';

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

class RepliedRequest extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  async handleDelete(dispatch) {

    const sentRequest     = await axios.delete(`/bookRequest/${this.props.request.id}/`)
    const newRequest      = await axios.get(`/bookRequest/?toHost=${this.props.request.toHost}&hasReply=False`)
    const repliedRequest  = await axios.get(`/bookRequest/?toHost=${this.props.request.toHost}&hasReply=True`)

    dispatch({
      type: 'DELETE_REQUEST',
      payload: {newRequest: newRequest.data, repliedRequest: repliedRequest.data}
    })

  }

  render() {
    const { classes, request } = this.props;

    return (
      <RequestConsumer>
        {value => {
          const {dispatch} = value;
          return (
            <div className="row" style={{margin:'10px'}}>
              <Card className={classes.card}>
                <CardHeader title={<Typography variant="display1">{request.title}</Typography>} subheader={request.date} />
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
                <IconButton onClick={this.handleDelete.bind(this, dispatch)}>
                  <BlockIcon />
                </IconButton>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="headline">
                      {request.content}
                    </Typography>
                    <Divider style={{ margin: "10px" }} />
                    <Typography variant="headline" style={{ color: '#F50057' }}>Replied:</Typography>
                    <Typography variant="headline" style={{ margin: "10px" }}>
                      {request.reply}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          )
        }}
      </RequestConsumer>
    );
  }
}

RepliedRequest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RepliedRequest);

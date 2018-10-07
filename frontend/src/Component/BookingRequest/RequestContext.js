import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


const RequestContext = React.createContext()

const requests = [
  {
    id: 1,
    title: "Pet Request",
    date: 'Oct 4 2016',
    content: "Can i bring my dog?",
    sender: "seannguyen5696@gmail.com",
    toHost: 1,
    hasReply: false,
    reply: "",
  },
  {
    id: 1,
    title: "Car Request",
    date: 'Oct 5 2016',
    content: "Can i bring my car?",
    sender: "seannguyen5696@gmail.com",
    toHost: 1,
    hasReply: true,
    reply: "Yes you can",
  },
]

const reducer = (state, action) => {

  switch(action.type) {

    case 'REPLY_SENT':
      console.log("SEND.....");
      return {
        ...state,
        newRequest:       action.payload.newRequest,
        repliedRequest:   action.payload.repliedRequest,
      }
    case 'DELETE_REQUEST':
      return {
        ...state,
        newRequest:       action.payload.newRequest,
        repliedRequest:   action.payload.repliedRequest,
      }

    case 'LOGIN':
      console.log('login from request');
      return {
        ...state,
        userInfo: action.payload,
        init: false,
      }

    default:
      return state;
  }

}

export class RequestProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      init: false,
      newRequest: [],
      repliedRequest: [],
      userInfo: [],
      dispatch: (action) => {
        this.setState((state) => reducer(state,action))
      }
    }
  }

  async getData(userInfo) {
    const newRequest      = await axios.get(`http://localhost:8000/bookRequest/?toHost=${userInfo.user_id}&hasReply=False`)
    const repliedRequest  = await axios.get(`http://localhost:8000/bookRequest/?toHost=${userInfo.user_id}&hasReply=True`)
    this.setState({
      newRequest    : newRequest.data,
      repliedRequest: repliedRequest.data,
      init          : true,
    })
  }

  async componentDidMount() {
    // axios request from db
    var currentUser= JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser,"...USER..");

    if (currentUser!==null) {
      this.getData(currentUser[0])
    }
    this.setState({
      init:true,
    })

    // var newRequest = [];
    // var repliedRequest = [];
    //
    // requests.map((r) => {
    //   if (r.hasReply === false) {
    //     newRequest.push(r)
    //   } else {
    //     repliedRequest.push(r)
    //   }
    //   return 1;
    // })
    //
    // this.setState({
    //   init: true,
    //   bookRequest: requests,
    //   newRequest: newRequest,
    //   repliedRequest: repliedRequest,
    // })
  }

  render () {
    if (this.state.init === false) {
      return(
        <div>
          <CircularProgress color="primary" size={50}/>
        </div>
      )
    }
    else {
      return(
        <RequestContext.Provider value={this.state}>
          {this.props.children}
        </RequestContext.Provider>
      );
    }

  }

}

export const RequestConsumer = RequestContext.Consumer;

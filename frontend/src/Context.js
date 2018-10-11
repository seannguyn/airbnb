import React, {Component} from "react"
import {addPlaceMaker} from "./Component/GoogleMap/helper"
import axios from "axios"
import CircularProgress from "@material-ui/core/CircularProgress"

const Context = React.createContext()

const reducer = (state, action) => {
  let places = [];

  switch (action.type) {
    case "DELETE_HOUSE":
      console.log("deleting house", action.payload)
      return {
        HouseList: state.HouseList.filter(
          eachHouse => eachHouse.id !== action.payload
        )
      };

    case "ADD_HOUSE":
      console.log("ADD_HOUSE")

      return {
        ...state,
        HouseList: action.payload
      };

    case "EDIT_HOUSE":
      console.log("edit house")
      return {
        ...state,
        HouseList: state.HouseList.map(
          eachHouse =>
            eachHouse.id === action.payload.id
              ? (eachHouse = action.payload)
              : eachHouse
        )
      };

    case "LOGIN":
      console.log("login user login")
      return {
        ...state,
        currentUser: [action.payload],
        logged_in: true,
        dialog: {
          open: false,
          login: true
        }
      };

    case "SEARCH":
      places = addPlaceMaker(
        action.payload.AllHostingList,
        action.payload.HouseList
      );
      return {
        ...state,
        AllHostingList: action.payload.AllHostingList,
        places: places,
        searchStatus: true
      };

    case 'TOGGLE_SIDEBAR':
      const {sidebar_show} = state;
      return {
        ...state,
        sidebar_show: !sidebar_show
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        logged_in: false,
        sidebar_show: false,
        currentUser: [],
      };

    case 'OPEN_DIALOG':
      return {
        ...state,
        dialog: action.payload
      };

    case 'CLOSE_DIALOG':
      return {
        ...state,
        dialog: {
          open: false,
          login: true,
        },
      };

    case 'TOGGLE_SIGNIN':
      return {
        ...state,
        dialog: {
          open: true,
          login: !state.dialog.login,
        },
      };

    case 'REPLY_SENT':
      console.log("SEND.....");
      return {
        ...state,
        newRequest: state.newRequest.filter((request) => request.id !== action.payload.singleRequest.id),
        repliedRequest: [...state.repliedRequest, action.payload.singleRequest],
      };

    case 'NEW_REQUEST':
      console.log("SEND.....");
      return {
        ...state,
        newRequest: [...state.newRequest, action.payload],
      };

    case 'DELETE_NEW_REQUEST':
      return {
        ...state,
        newRequest: state.newRequest.filter((request) => request.id !== action.payload.singleRequest.id),
      };

    case 'DELETE_REPLIED_REQUEST':
      return {
        ...state,
        repliedRequest: state.repliedRequest.filter((request) => request.id !== action.payload.singleRequest.id),
      };

    case "CLEAR_SEARCH":
      places = addPlaceMaker(
        action.payload.AllHostingList,
        action.payload.HouseList
      );
      return {
        ...state,
        AllHostingList: action.payload.AllHostingList,
        places: places,
        searchStatus: false
      };

    case "HOSTING":
      return {
        ...state,
        myHostingList: [action.payload, ...state.myHostingList],
        AllHostingList: [action.payload, ...state.AllHostingList]
      };

    case "EDITHOST":
      return {
        ...state,
        myHostingList: state.myHostingList.map(
          host =>
            host.id === action.payload.id ? (host = action.payload) : host
        )
      };

    case "DELETE_HOST":
      return {
        ...state,
        myHostingList: state.myHostingList.filter(
          host => host.id !== action.payload
        ),
        AllHostingList: state.AllHostingList.filter(
          host => host.id !== action.payload
        )
      };

    case "OPEN_INFO_WINDOW":
      if (state.inforWindow === action.payload) {
        return {
          ...state,
          inforWindow: -1
        }
      } else {
        return {
          ...state,
          inforWindow: action.payload
        }
      }


    case "CLOSE_INFO_WINDOW":

      return {
        ...state,
        inforWindow: action.payload
      }

    default:
      return state
  }
};

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HouseList: [],
      myHouseList: [],
      currentUser: [],
      myHostingList: [],
      AllHostingList: [],
      newRequest: [],
      repliedRequest: [],
      places: [],
      sidebar_show: false,
      logged_in: false,
      inforWindow: -1,
      dialog: {
        open: false,
        login: true
      },
      searchStatus: false,
      mounted: 0,
      didmount: 0,
      dispatch: async action => {
        this.setState(state => reducer(state, action))
      }
    }
  }

  async componentDidMount() {
    const res = await axios.get("/accommodation/")
    this.setState({HouseList: res.data})
    this.setState({didmount: 1})

    const allHosting = await axios.get("/accommodationHosting/")
    this.setState({AllHostingList: allHosting.data})
    if (allHosting.data !== []) {
      const places = addPlaceMaker(allHosting.data, this.state.HouseList)

      this.setState({places: places})
    }

    if (this.state.currentUser.length === 1) {
      const {token, user_id} = this.state.currentUser[0]

      const newRequest = await axios.get(`/bookRequest/?toHost=${user_id}&hasReply=False`)
      const repliedRequest = await axios.get(`/bookRequest/?toHost=${user_id}&hasReply=True`)

      const res = await axios.get(`/accommodationHosting/?user=${user_id}`,
        {
          headers: {
            'Authorization': {token}
          }
        })
      this.setState({
        myHostingList: res.data,
        newRequest: newRequest.data,
        repliedRequest: repliedRequest.data,
      });

    }
  }

  // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"))

    if (currentUser === null) {
      currentUser = []
    }
    if (currentUser.length > 0) {
      this.setState({
        currentUser: JSON.parse(localStorage.getItem("currentUser")),
        logged_in: true
      })
    }
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentUser.length > 0 && this.state.mounted === 0) {
      this.setState({mounted: 1})
      localStorage.setItem('currentUser', JSON.stringify(nextState.currentUser));
      const {token, user_id} = nextState.currentUser[0];
      const res = await axios.get('/accommodationHosting/',
        {
          headers: {'Authorization': {token}}
        }
      )
      const newRequest = await axios.get(`/bookRequest/?toHost=${user_id}&hasReply=False`)
      const repliedRequest = await axios.get(`/bookRequest/?toHost=${user_id}&hasReply=True`)
      const myHouse = await axios.get(`/accommodation/?user=${user_id}`)

      this.setState({
        myHouseList: myHouse.data,
        myHostingList: res.data,
        newRequest: newRequest.data,
        repliedRequest: repliedRequest.data,
      });
    }
    return true
  }

  render() {
    if (this.state.didmount === 0) {
      return (
        <div>
          <CircularProgress color="primary" size={50}/>
        </div>
      )
    } else {
      return (
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      )
    }
  }
}

export const Consumer = Context.Consumer

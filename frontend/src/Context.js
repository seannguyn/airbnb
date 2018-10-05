import React, { Component } from 'react';

import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
const Context = React.createContext();

const reducer = (state,action) => {

  switch(action.type) {
    case 'DELETE_HOUSE':
      return {
        ...state,
        HouseList: action.payload.houselist,
        myHouseList: action.payload.myHouseList
      }

    case 'ADD_HOUSE':
      return {
        ...state,
        HouseList: action.payload
      }

    case 'EDIT_HOUSE':
      return {
        ...state,
        HouseList: state.HouseList.map((eachHouse) => eachHouse.id === action.payload.id ? (eachHouse = action.payload) : eachHouse)
      }

      case 'LOGIN':
        return {
          ...state,
          currentUser: [action.payload],
          logged_in: true,
          dialog: {
            open: false,
            login: true,
          },
        };

      case 'SEARCH':
        return {
          ...state,
          AllHostingList: action.payload,
          searchStatus: true
        };

      case 'CLEAR_SEARCH':

        return {
          ...state,
          AllHostingList: action.payload,
          searchStatus: false
        };

      case 'HOSTING':
        return {
          ...state,
          myHostingList: [action.payload,...state.myHostingList],
          AllHostingList: [action.payload,...state.AllHostingList],
        }

      case 'EDITHOST':
        return {
          ...state,
          myHostingList: state.myHostingList.map((host) => host.id === action.payload.id ? (host = action.payload) : host)
        }
      case 'DELETE_HOST':

        return {
          ...state,
          myHostingList: state.myHostingList.filter((host) => host.id !== action.payload),
          AllHostingList: state.AllHostingList.filter((host) => host.id !== action.payload),
          // myHouseList:
        }

      case 'TOGGLE_SIDEBAR':
        const{sidebar_show} = state;
        return {
          ...state,
          sidebar_show: !sidebar_show
        }
      case 'LOGOUT':
        localStorage.clear();
        return {
          ...state,
          logged_in: false,
          sidebar_show: false,
          currentUser: [],
        }
      case 'OPEN_DIALOG':
        return {
          ...state,
          dialog: action.payload
        }

      case 'CLOSE_DIALOG':
        return {
          ...state,
          dialog: {
            open: false,
            login: true,
          },
        }

      case 'TOGGLE_SIGNIN':
        return {
          ...state,
          dialog: {
            open: true,
            login: !state.dialog.login,
          },
        }

      default:
        return state;
  }
}

export class Provider extends Component {

  constructor() {
    super();
    this.state = {
      HouseList : [],
      myHouseList: [],
      currentUser: [],
      myHostingList: [],
      AllHostingList: [],
      sidebar_show: false,
      logged_in: false,
      dialog: {
        open: false,
        login: true,
      },
      searchStatus: false,
      mounted: 0,
      didmount: 0,
      dispatch: (action) => {
        this.setState((state) => reducer(state,action))
      }

    };
  }

  async componentDidMount(){

    const res = await axios.get('/accommodation/');
    this.setState({HouseList: res.data});
    this.setState({didmount: 1});

    const allHosting = await axios.get('/accommodationHosting/');
    this.setState({AllHostingList: allHosting.data});

    if(allHosting.data !== []){
      this.addPlaceMaker(allHosting.data);
    }

    if(this.state.currentUser.length === 1) {
      const {token,user_id} = this.state.currentUser[0];

      const res = await axios.get(`/accommodationHosting/?user=${user_id}`,
      {
        headers:{
          'Authorization': {token}
        }
      })
        this.setState({myHostingList: res.data});

    }

  }

  // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    var currentUser= JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser  === null) {
      currentUser = []
    }
    if( currentUser.length > 0) {
      this.setState({
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        logged_in: true,
      });
    }
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentUser.length > 0 && this.state.mounted === 0) {
      this.setState({mounted: 1})
      localStorage.setItem('currentUser', JSON.stringify(nextState.currentUser));
      const {token,user_id} = nextState.currentUser[0];
      const res = await axios.get('/accommodationHosting/',
        {
          headers:{ 'Authorization': {token} }
        }
      )
      const myHouse = await axios.get(`/accommodation/?user=${user_id}`)
      this.setState({myHouseList: myHouse.data});
      this.setState({myHostingList: res.data});
      return true;
    }
    return true;
  }

  addPlaceMaker = async (AllHostingList) => {
    const places = [];
    for( let i = 0; i <  AllHostingList.length; i++){
        const accommodation = AllHostingList[i].accommodation;
        await axios.get(`/accommodation/${accommodation}/`)
                    .then(response => {
                        const info = {
                            id : response.data.id,
                            lat: response.data.latitude,
                            lng: response.data.longitude,
                            price: AllHostingList[i].price,
                            name: response.data.title,
                            description: response.data.description,
                            address: response.data.address
                        };
                        places.push(
                            info
                        )
                    })


    }
    this.setState({places: places});
    return places;
}

  render () {
    if (this.state.didmount === 0) {
      return(
        <div>
          <CircularProgress color="primary" size={50}/>
        </div>
      )
    }
    else {
      return(
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      );
    }

  }
}

export const Consumer = Context.Consumer;

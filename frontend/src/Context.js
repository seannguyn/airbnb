import React, { Component } from 'react';

import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
const Context = React.createContext();

const reducer = (state,action) => {

  switch(action.type) {
    case 'DELETE_HOUSE':
      console.log("deleting house",action.payload);
      return {
        HouseList: state.HouseList.filter((eachHouse) => eachHouse.id !== action.payload),
      }


    case 'ADD_HOUSE':
      console.log("ADD_HOUSE");

      return {
        ...state,
        HouseList: action.payload
      }

    case 'EDIT_HOUSE':
      console.log("edit house");
      return {
        ...state,
        HouseList: state.HouseList.map((eachHouse) => eachHouse.id === action.payload.id ? (eachHouse = action.payload) : eachHouse)
      }

      case 'LOGIN':
        console.log('login user login');
        return {
          ...state,
          currentUser: [action.payload],
          logged_in: true,
          dialog: {
            open: false,
            login: true,
          },
        };

      case 'HOSTING':
        console.log("host context",action.payload);
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
        console.log("deleting hosting",action.payload);

        // var updateHouse;
        // for ( var i = 0; i < this.state.myHouseList.length; i++) {
        //   if
        // }

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
        console.log("here LOGOUT");
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
      mounted: 0,
      didmount: 0,
      dispatch: (action) => {
        this.setState((state) => reducer(state,action))
      }

    };
  }

  async componentDidMount(){

    const res = await axios.get('https://localhost:8000/accommodation/');
    this.setState({HouseList: res.data});
    this.setState({didmount: 1});
    // console.log(this.state.currentUser);

    const allHosting = await axios.get('https://localhost:8000/accommodationHosting/');
    this.setState({AllHostingList: allHosting.data});
    
    if(allHosting.data !== []){
      this.addPlaceMaker(allHosting.data);
    }
    
    if(this.state.currentUser.length === 1) {
      const {token,user_id} = this.state.currentUser[0];

      const res = await axios.get(`https://localhost:8000/accommodationHosting/?user=${user_id}`,
      {
        headers:{
          'Authorization': {token}
        }
      })


      // if(this.state.myHostingList.length === 0 ){
        this.setState({myHostingList: res.data});
        // console.log("did mount my hostung lis: ", this.state.myHostingList);
      // }
    }

  }

  // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    var currentUser= JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser  === null) {
      currentUser = []
    }
    console.log("WILL MOUNT",currentUser);
    if( currentUser.length > 0) {
      this.setState({
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        logged_in: true,
        // HouseList: JSON.parse(localStorage.getItem('HouseList')),
        // myHostingList: JSON.parse(localStorage.getItem('myHostingList')),
        // AllHostingList: JSON.parse(localStorage.getItem('AllHostingList')),
      });
    }

    // && localStorage.getItem('HouseList')
    // localStorage.getItem('myHostingList') && localStorage.getItem('AllHostingList')


  }

  async shouldComponentUpdate(nextProps, nextState) {
    // console.log("should it update?",nextProps,nextState);
    if (nextState.currentUser.length > 0 && this.state.mounted === 0) {
      this.setState({mounted: 1})
      localStorage.setItem('currentUser', JSON.stringify(nextState.currentUser));
      const {token,user_id} = nextState.currentUser[0];
      const res = await axios.get('https://localhost:8000/accommodationHosting/',
        {
          headers:{ 'Authorization': {token} }
        }
      )
      const myHouse = await axios.get(`https://localhost:8000/accommodation/?user=${user_id}`)
      this.setState({myHouseList: myHouse.data});
      this.setState({myHostingList: res.data});
      console.log(myHouse.data,"my hosting");
      return true;
    }
    return true;
  }

  addPlaceMaker = async (AllHostingList) => {
    console.log("All Hosting List: ", AllHostingList);
    const places = [];
    for( let i = 0; i <  AllHostingList.length; i++){
        console.log(AllHostingList[i].accommodation)
        const accommodation = AllHostingList[i].accommodation;
        await axios.get(`https://localhost:8000/accommodation/${accommodation}/`)
                    .then(response => {
                        console.log("RES: ", response.data);
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
    console.log("places: ", places, typeof(places));
    this.setState({places: places});
    return places;
}

  render () {
    // const fh = this.findHostingAccommodation(this.state.currentUser);
    // console.log("IN REDNER CONTEXt: ", this.state.currentUser);
    // console.log(this.state.myHostingList);
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
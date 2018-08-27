import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state,action) => {

  switch(action.type) {
    case 'DELETE_HOUSE':
      console.log("deleting house",action.payload);
      return {
        HouseList: state.HouseList.filter((eachHouse) => eachHouse.id !== action.payload),
      }

    case 'ADD_HOUSE':
      console.log("adding house",action.payload);
      return {
        HouseList: [action.payload,...state.HouseList]
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
          currentUser: [action.payload, ...state.currentUser]
        };

        case 'HOSTING':
          console.log("host context",action.payload);
        return {
          myHostingList: [action.payload,...state.myHostingList]
        }

        case 'EDITHOST': 
          return {
            myHostingList: state.myHostingList.map((host) => host.id === action.payload.id ? (host = action.payload) : host)
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
      currentUser: {},
      myHostingList: [],
      dispatch: (action) => {
        this.setState((state) => reducer(state,action))
      }

    };
  }

  async componentDidMount(){
    console.log("DID MOunt: ", this.state.currentUser);
    const res = await axios.get('https://localhost:8000/accommodation/');
    this.setState({HouseList: res.data});
    console.log("HELLO DIDMOUNT");
    console.log(this.state.currentUser);

    if(this.state.currentUser[0] != null){
      const {token} = this.state.currentUser[0];
      const res = await axios.get('https://localhost:8000/accommodationHosting/',
      {
        headers:{
          'Authorization': {token}
        }
      }
    )
    
    if(this.state.myHostingList.length == 0 ){
      this.setState({myHostingList: res.data});
      console.log(this.state.myHostingList);
    }
  }

  }

  componentWillUpdate(){
    console.log("will UPDATE: ", this.state.currentUser);
  }

  componentDidCatch(){
    console.log("DID Catch: ", this.state.currentUser);
  }

  componentWillReceiveProps(){
    console.log("will recieve: ", this.state.currentUser);
  }

  async componentDidUpdate(){
      console.log("DID UPDATE: ", this.state.currentUser);
      if(this.state.currentUser[0] != null){
        const {token} = this.state.currentUser[0];
        const res = await axios.get('https://localhost:8000/accommodationHosting/',
        {
          headers:{
            'Authorization': {token}
          }
        }
      )
      
      if(this.state.myHostingList.length == 0 ){
        this.setState({myHostingList: res.data});
        console.log(this.state.myHostingList);
      }
    }
    return ; 
  }
  

  render () {
    // const fh = this.findHostingAccommodation(this.state.currentUser);
    console.log("IN REDNER CONTEXt: ", this.state.currentUser);
    console.log(this.state.myHostingList);
    return(
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

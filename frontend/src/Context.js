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
      dispatch: (action) => {
        this.setState((state) => reducer(state,action))
      }

    };
  }

  async componentDidMount(){
    const res = await axios.get('https://localhost:8000/accommodation/');
    this.setState({HouseList: res.data});
  }

  render () {
    return(
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

import React, { Component } from 'react';
import uuid from 'uuid';
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
      default:
        return state;
  }
}


export class Provider extends Component {

  constructor() {
    super();
    this.state = {
      HouseList : [],

      dispatch: (action) => {
        this.setState((state) => reducer(state,action))
      }

    };
  }

  componentWillMount() {
    this.fakeHouse();
  }

  AxiosDataBase() {
    // get actual data from db
  }

  fakeHouse() {
    this.setState({HouseList: [
      {
        id: uuid.v4(),
        user:'sean',
        Accommodation_Type: 'House',

        addr_number: 88,
        addr_street: 'George Street',
        addr_city: 'Sydney',
        addr_state: 'NSW',

        area: '100',
        bedroom_master: '1',
        bedroom:'1',
        bathroom:'1',
        kitchen:'1',

        gym:'1',
        pool: '1',
        carpark: '1',
        description:'nice house'

      }
    ]})
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

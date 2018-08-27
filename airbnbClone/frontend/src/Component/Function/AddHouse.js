import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import TextInputGroup from './TextInputGroup'
import axios from 'axios';
import uuid from 'uuid';

class AddHouse extends Component {

  constructor() {
    super();
    this.state = {

      number: '',
      street: '',
      city: '',
      state: '',

      area: '',
      bedroom_master: '',
      bedroom:'',
      bathroom:'',
      kitchen:'',
      gym:'',
      pool: '',
      carpark: '',
      description:'',
      error: {}
    }
  }

  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  async onSubmit(dispatch, e) {
    e.preventDefault();

    const {number, street, city, state} = this.state;
    const {area,bedroom_master,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.state;

    if (number === '') {
      this.setState({error:{number:"number is required"}})
      return;
    } else if (!isFinite(String(number))) {
      this.setState({error:{number:"numeric please"}})
      return;
    }
    if (street === '' ) {
      this.setState({error:{street:"street is required"}})
      return;
    }
    if (city === '' ) {
      this.setState({error:{city:"city is required"}})
      return;
    }

    if (bedroom === ''  || !isFinite(String(bedroom))) {
      this.setState({error:{bedroom:"bedroom is required"}})
      return;
    }
    if (bathroom === '' || !isFinite(String(bathroom))) {
      this.setState({error:{bathroom:"bathroom is required"}})
      return;
    }

    this.setState({
      kitchen : (kitchen === '' ) ? 0 : 1,
      gym     : (gym === '' )     ? 0 : 1,
      pool    : (pool === '' )    ? 0 : 1,
      carpark : (carpark === '' ) ? 0 : 1,
    })

    const newHouse ={
      id: uuid.v4(),
      user:'sean',
      Accommodation_Type: 'House',
      addr_number: number,
      addr_street: street,
      addr_city: city,
      addr_state: state,

      area:area,
      bedroom_master:bedroom_master,
      bedroom:bedroom,
      bathroom:bathroom,
      kitchen:kitchen,

      pool:pool,
      gym:gym,
      carpark:carpark,

      description:description
    }

    console.log(newHouse);

    // await axios.post('',newHouse)

    dispatch({type:'ADD_HOUSE', payload:newHouse})

    this.setState({

      number: '',
      street: '',
      city: '',
      state: '',

      area: '',
      bedroom_master: '',
      bedroom:'',
      bathroom:'',
      kitchen:'',
      gym:'',
      pool: '',
      carpark: '',
      description:'',
      error:{}
    })

    this.props.history.push("/viewHouse")

  }


  render () {

    const {number, street, city, state} = this.state;
    const {area,bedroom_master,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.state;

    return (

      <Consumer>
        {value =>{

          const {dispatch} = value;

          return (
            <div className="card-body mb-3">

              <div className="card-header">Add Accommodation</div>

              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>


                  <TextInputGroup
                    label="number"
                    name="number"
                    placeholder="Enter a number"
                    value={number}
                    onChange={this.onChange.bind(this)}
                    error={this.state.error.number}
                    />

                  <TextInputGroup
                    label="street"
                    name="street"
                    placeholder="Enter a street"
                    value={street}
                    onChange={this.onChange.bind(this)}
                    error={this.state.error.street}
                    />
                  <TextInputGroup
                    label="city"
                    name="city"
                    placeholder="Enter a city"
                    value={city}
                    onChange={this.onChange.bind(this)}
                    error={this.state.error.city}
                    />
                  <TextInputGroup
                    label="state"
                    name="state"
                    placeholder="Enter a state"
                    value={state}
                    onChange={this.onChange.bind(this)}
                    error={this.state.error.state}
                    />

                  <TextInputGroup
                    label="area"
                    name="area"
                    placeholder="Enter a area in square meter"
                    value={area}
                    onChange={this.onChange.bind(this)}
                    error={this.state.error.area}
                    />


                    <TextInputGroup
                      label="bedroom"
                      name="bedroom"
                      placeholder="Enter # of bedroom"
                      value={bedroom}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.bedroom}
                      />
                    <TextInputGroup
                      label="bedroom_master"
                      name="bedroom_master"
                      placeholder="Enter # of master bedroom"
                      value={bedroom_master}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />

                    <TextInputGroup
                      label="bathroom"
                      name="bathroom"
                      placeholder="Enter # of bathroom"
                      value={bathroom}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.bathroom}
                      />
                    <TextInputGroup
                      label="kitchen"
                      name="kitchen"
                      placeholder="Enter # of kitchen"
                      value={kitchen}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />
                    <TextInputGroup
                      label="gym"
                      name="gym"
                      placeholder="Enter # of gym"
                      value={gym}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />
                    <TextInputGroup
                      label="pool"
                      name="pool"
                      placeholder="Enter # of pool"
                      value={pool}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />
                    <TextInputGroup
                      label="carpark"
                      name="carpark"
                      placeholder="Enter # of carpark"
                      value={carpark}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />
                    <TextInputGroup
                      label="description"
                      name="description"
                      placeholder="Enter # of description"
                      value={description}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />

                  <input type="submit" className="btn btn-block btn-light" value="Add Accommodation"></input>
                </form>
              </div>

            </div>
          );
        }}
      </Consumer>


    )
  }
}

export default AddHouse;

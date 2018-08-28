import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import TextInputGroup from './TextInputGroup'
import axios from 'axios';

class EditHouse extends Component {

  constructor() {
    super();
    this.state = {

      currentUser: {},

      id: '',
      user: '',
      Accommodation_Type: '',

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

  componentDidMount() {
    const {HouseList, currentUser} = this.props;
    const {id} = this.props;

    this.setState({currentUser: currentUser}, () => {
      console.log("current user", currentUser[0]);
    });

    let i =0;
    var result;
    for(i=0; i<HouseList.length; i++){
      if(HouseList[i].id == id){
        result = HouseList[i];
      }
    }

    console.log("here",result);

    this.setState({
      id: result.id,
      user: result.user,
      Accommodation_Type: result.Accomodation_Type,

      number: result.addr_number,
      street: result.addr_street,
      city:  result.addr_city,
      state: result.addr_state,

      area: result.area,
      bedroom_master: result.bedroom_master,
      bedroom: result.bedroom,
      bathroom: result.bathroom,
      kitchen: result.kitchen,
      gym: result.gym,
      pool: result.pool,
      carpark: result.carpark,
      description: result.description,
    })

    // axios call ???
    // const {id} = this.props.match.params;
    // const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    // console.log(res.data);
    // this.setState({name: res.data.name, website: res.data.website, email: res.data.email})

  }

  onChange(e) {
    console.log(e.target.name);
    this.setState({[e.target.name] : e.target.value});
  }

  async onSubmit(dispatch, e) {
    e.preventDefault();

    const {id, user, Accommodation_Type, number, street, city, state} = this.state;
    const {area,bedroom_master,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.state;

    const editHouse ={
      id: id,
      user:user,
      Accomodation_Type: Accommodation_Type,

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

    console.log(editHouse);

    // const res = await axios.put(`${id}`,editHouse)
    const {token} = this.state.currentUser; //GET TOKEN FROM CURRENT USER
    const res = await axios.put(`https://localhost:8000/accommodation/${id}/`, editHouse,
            {headers:{
                'Authorization': {token}
            }
        }
    )

    dispatch({type:'EDIT_HOUSE', payload:editHouse})


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

    this.props.history.push("/myhouses")

  }

  render () {

    const {Accommodation_Type,number, street, city, state} = this.state;
    const {area,bedroom_master,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.state;
    console.log(Accommodation_Type,"accomm type");
    return (

      <Consumer>
        {value =>{

          const {dispatch} = value;

          return (
            <div className="card-body mb-3">

              <div className="card-header">Edit Accommodation</div>

              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>

                  <ul>
                    <li><input onChange={this.onChange.bind(this)} type="radio" name="Accommodation_Type" value="Room"      checked={Accommodation_Type === "Room" ? true : false}/>Room</li>
                    <li><input onChange={this.onChange.bind(this)} type="radio" name="Accommodation_Type" value="Studio"    checked={Accommodation_Type === "Studio" ? true : false}/>Studio</li>
                    <li><input onChange={this.onChange.bind(this)} type="radio" name="Accommodation_Type" value="Apartment" checked={Accommodation_Type === "Apartment" ? true : false}/>Apartment</li>
                    <li><input onChange={this.onChange.bind(this)} type="radio" name="Accommodation_Type" value="House"     checked={Accommodation_Type === "House" ? true : false}/>House</li>
                    <li><input onChange={this.onChange.bind(this)} type="radio" name="Accommodation_Type" value="Villa"     checked={Accommodation_Type === "Villa" ? true : false}/>Villa<br/></li>
                  </ul>

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
                      placeholder="Enter # of bedroom"
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
                      placeholder="Enter # of bathroom"
                      value={pool}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />

                    <TextInputGroup
                      label="carpark"
                      name="carpark"
                      placeholder="Enter # of bathroom"
                      value={carpark}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />

                    <TextInputGroup
                      label="description"
                      name="description"
                      placeholder="Enter # of bathroom"
                      value={description}
                      onChange={this.onChange.bind(this)}
                      error={this.state.error.blank}
                      />

                    <input type="submit" className="btn btn-block btn-light" value="Edit Accommodation"></input>
                </form>
              </div>

            </div>
          );
        }}
      </Consumer>


    )
  }
}

export default EditHouse;

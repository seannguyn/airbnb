import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import axios from 'axios';

class Hosting extends Component {

    constructor() {
        super();
        this.state = {
            accommodation: '', //accommodation id
            user: '', //user id
            date_start: '',
            date_end: '',
            price: '',
            description: '',
            error: {}
        }
    }

    //set State when changing text
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    // handle when form is submitted
    onSubmit = async (dispatch, currUser, e) => {
        e.preventDefault();
        console.log('propsss: ', currUser);
        const {accommodation,
                user,
                date_start,
                date_end,
                price,
                description} = this.state;

        const hostingHouse = {
            // user: should be the current login user
            accommodation: this.props.id, //accommodation id
            date_start: date_start,
            date_end: date_end,
            price: price,
            description: description
        }
        console.log(hostingHouse);

        // AXIOS call here
        // Notes: need backend validation for date and available date to
        //        avoid conflicts.
        const {token} = currUser[0]; //GET TOKEN FROM CURRENT USER
        const res = await axios.post('https://localhost:8000/accommodationHosting/', hostingHouse,
                {headers:{
                    'Authorization': {token}
                }
            }
        )

        dispatch({type:'HOSTING', payload:hostingHouse});

        // Add error handling here
        // ......
        // error handling

        // push back to myhosts page
        this.props.history.push("/myHouses");
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    const {currentUser} = value;
                    console.log(currentUser);
                return (

                <div className="card-body mb-3">

                <div className="card-header">Host Accommodation</div>

                <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch, currentUser)}>

                <label htmlFor="date_start">Start Date</label>
                    <div className="form-group">
                        <input type="date"
                               name="date_start"
                               placeholder="Start Date ..."
                               onChange={this.onChange.bind(this)}/>
                    </div>

                    <label htmlFor="date_end">End Date</label>
                    <div className="form-group">

                        <input type="date"
                               name="date_end"
                               placeholder="End Date ..."
                               onChange={this.onChange.bind(this)}/>
                    </div>

                    <label htmlFor="price">Price</label>
                    <div className="form-group">
                        <input type="number"
                                min="1"
                                name="price"
                                placeholder="Choose Price ..."
                                onChange={this.onChange.bind(this)}/>
                    </div>

                    <label htmlFor="description">Description</label>
                    <div className="form-group">
                        <input type="text"
                                name="description"
                                placeholder="Enter Description ..."
                                onChange={this.onChange.bind(this)}/>
                    </div>

                    <input type="submit" className="btn btn-block btn-light" value="Host this accommodationn"></input>
                </form>

                </div>
            </div>

                    );
                }}
            </Consumer>
        );

    }
}

export default Hosting;

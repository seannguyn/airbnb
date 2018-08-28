import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import axios from 'axios';

class EditHosting extends Component {

    constructor() {
        super();
        this.state = {
            id: '', //accommodation hosting id itself
            accommodation: '', //accommodation id
            user: '', //account id
            date_start: '',
            date_end: '',
            price: '',
            description: '',
            error: {}
        }
    }

    componentDidMount(){
        console.log("from edithousingjs: ", this.props);
        const{HouseList, currentUser, myHostingList} = this.props;
        const{id} = this.props;
        
        var result = myHostingList.find(obj => {
            return obj.accommodation === id
        });

        console.log("FILTER EDITHOUSING: ", result);
        console.log("FILTER EDITHOUSING: ", result.date_start);
        this.setState({
            id: result.id,
            accommodation: result.accommodation,
            date_start: result.date_start,
            date_end: result.date_end,
            description: result.description,
            price: result.price
        })
    }

    //set State when changing text
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    // handle when form is submitted
    onSubmit = async (dispatch, currUser, e) => {
        e.preventDefault();
        console.log('propsss: ', this.props);
        const {id} = this.state;
        
        const {accommodation,
                user,
                date_start,
                date_end,
                price,
                description} = this.state;

        const hostingHouse = {
            // account: should be the current login account
            id: id,
            accommodation: this.props.id, //accommodation id
            date_start: date_start,
            date_end: date_end,
            price: price,
            description: description
        }


        // AXIOS call here - PUT REQUEST
        // Notes: need backend validation for date and available date to
        //        avoid conflicts.
        const {token} = currUser[0]; //GET TOKEN FROM CURRENT USER
        const res = await axios.put(`https://localhost:8000/accommodationHosting/24/`, hostingHouse,
                {headers:{
                    'Authorization': {token}
                }
            }
        ) 

        dispatch({type:'EDITHOST', payload:hostingHouse});

        // Add error handling here
        // ......
        // error handling

        // push back to myhosts page
    }

    render() { 
        const {date_start, date_end, price, description} = this.state;
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
                               value={date_start}
                               onChange={this.onChange.bind(this)}/>
                    </div>
                    
                    <label htmlFor="date_end">End Date</label>
                    <div className="form-group">
                        
                        <input type="date" 
                               name="date_end" 
                               value={date_end}
                               onChange={this.onChange.bind(this)}/>
                    </div>

                    <label htmlFor="price">Price</label>
                    <div className="form-group">
                        <input type="number"
                                min="1" 
                                name="price" 
                                value={price}
                                onChange={this.onChange.bind(this)}/>
                    </div>
                    
                    <label htmlFor="description">Description</label>
                    <div className="form-group">
                        <input type="text" 
                                name="description" 
                                value={description}
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
 
export default EditHosting;
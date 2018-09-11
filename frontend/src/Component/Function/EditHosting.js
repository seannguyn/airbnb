import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import axios from 'axios';


class EditHosting extends Component {

    constructor() {
        super();
        this.state = {
            id: '', //accomodation hosting id itself
            accommodation: '', //accommodation id
            user: '', //user id
            date_start: '',
            date_end: '',
            price: '',
            description: '',

            error: {}
        }
    }

    // componentWillUpdate(nextProps, nextState){
    //     console.log("WILL UPDATE: ", this.state.currentUser);
    //     localStorage.setItem('currentUser', JSON.stringify(nextState.currentUser));
    // }

    componentDidMount(){
        console.log("from edithousingjs: ", this.props);
        const{HouseList, currentUser, myHostingList} = this.props;
        const{id} = this.props;

        // console.log('PROPSSSShosting: ', myHostingList, id);
        let i = 0;
        var result;
        for(i=0; i<myHostingList.length; i++){
          if(myHostingList[i].accommodation == id){
            result = myHostingList[i];
          }
        }
        // console.log("FILTER EDITHOUSING: ", result);
        // console.log("FILTER EDITHOUSING: ", result.date_start);
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
        if( e.target.name === 'date_start'){
            let date_start = new Date(e.target.value)
            this.setState({date_start_onchange: date_start});
        }

        if(e.target.name === 'date_end'){
            console.log("DATE END: ", this.state.date_start_onchange);
            let date_end = new Date(e.target.value)
            console.log("DATE INVALID", typeof(date_end));
            if(date_end < this.state.date_start_onchange){
                console.log("DATE INVALID", typeof(e.target.value));
            }
        }
        this.setState({[e.target.name] : e.target.value});
    }

    // handle when form is submitted
    onSubmit = async (dispatch, currUser, e) => {
        e.preventDefault();

        const {id} = this.state;

        const {//accommodation,
                // user,
                date_start,
                date_end,
                price,
                description} = this.state;

        const hostingHouse = {
            // user: should be the current login user
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
        const res = await axios.put(`https://localhost:8000/accommodationHosting/${id}/`, hostingHouse,
                {headers:{
                    'Authorization': {token}
                }
            }
        )
        dispatch({type:'EDITHOST', payload:hostingHouse});
        // Add error handling here
        // ......
        // error handling
        this.props.history.push("/myhouses")
    }

    handleAlternate(id,dispatch,e) {
      e.preventDefault();
      console.log("stop hosting",id);

      axios.delete(`https://localhost:8000/accommodationHosting/${id}/`)
      .then(res => {
        dispatch({type: "DELETE_HOST", payload: id})
      })

      console.log(this.props.history,"historyyyy");
      this.props.history.push("/myhouses")
    }

    render() {
        const {id, date_start, date_end, price, description} = this.state;
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
                    <input type="submit" className="btn btn-block btn-danger" onClick={this.handleAlternate.bind(this, id, dispatch)} value="Stop Hosting this accommodationn"></input>
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

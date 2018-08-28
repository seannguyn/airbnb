import React from 'react'
import PropTypes from 'prop-types'

class Hosting extends React.Component {

<<<<<<< HEAD:airbnbClone/frontend/src/Component/Function/Hosting.js
    constructor() {
        super();
        this.state = {
            accommodation: '', //accommodation id
            user: '', //account id
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
            // account: should be the current login account
            accommodation: this.props.match.params.id, //accommodation id
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
=======
  constructor() {
    super();
>>>>>>> 525e9dfc2ecfa6bdc7bc2acc6164ded7495d8159:frontend/src/Component/Function/Hosting.js

    this.state = {
      showHosting: false
    }

  }

  handleExpand() {
    this.setState({showHosting : !this.state.showHosting})
  }

  render () {

    const {house, SingleHost} = this.props;
    const {showHosting} = this.state;
    return (
      <div className="card card-body mb-3">
          <h4>
            {house.addr_number}, {house.addr_street}, {house.addr_city}, {house.addr_state}
            <i onClick={this.handleExpand.bind(this)} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>
          </h4>

          {showHosting === true ?
            <ul className="list-group">
              <li className="list-group-item">start_date : {SingleHost.date_start}</li>
              <li className="list-group-item">end_date :  {SingleHost.date_end}</li>
              <li className="list-group-item">price :  {SingleHost.price}</li>
            </ul>
          : null}

        </div>
    )
  }
}

export default Hosting;

import React from 'react'
import {Consumer} from '../../Context'
import axios from 'axios';
import {Link} from 'react-router-dom';

class House extends React.Component {

  constructor() {
    super();
    this.state = {
      showDetail: false,
    }
  }

  handleExpand() {
    this.setState({showDetail : !this.state.showDetail }, () => {
      console.log(this.state.showDetail);
    })

  }

  // pass an axios to backend, requesting for delete
    async handleDelete(id, dispatch) {
      console.log('delete');
  // const deletable = axios.post('',id)

      const deletable = false;
      if (deletable === true) {
        dispatch({type:'DELETE_HOUSE',payload:id})
      }
      else {
        alert("cant delete")
      }
    }

  render () {
    const {addr_number, addr_street, addr_city} = this.props.houseDetail;
    const {area,bedroom_master,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.props.houseDetail;
    const {showDetail} = this.state;
    return (
      <Consumer>
        { value => {
          const {dispatch} = value;
          const {id} = this.props.houseDetail;
          return (

            <div className="card card-body mb-3">
              <h4>
                {addr_number} {addr_street}, {addr_city} <i onClick={this.handleExpand.bind(this)} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>

                <i  className="fas fa-times" onClick={this.handleDelete.bind(this, id, dispatch)} style={{cursor:'pointer', float:'right',color:'red'}}/>
                <Link to={`editHouse/${id}`}>
                  <i className="fas fa-pencil-alt" style={{cursor:'pointer', float:'right',color:'black'}}></i>
                </Link>
              </h4>

              {showDetail === true ?
              <ul className="list-group">
                {area           !=='0' ? <li className="list-group-item">Area <i className="fas fa-th-large"/> {area}  sq meters</li>         : null}
                {bedroom_master !=='0' ? <li className="list-group-item">Master Bedroom <i className="fas fa-bed"/> x {bedroom_master} </li>  : null}
                {bedroom        !=='0' ? <li className="list-group-item">Bedroom <i className="fas fa-bed"/> x {bedroom} </li>                : null}
                {bathroom       !=='0' ? <li className="list-group-item">Bathroom <i className="fas fa-bath"/> x {bathroom} </li>             : null}
                {kitchen        !=='0' ? <li className="list-group-item">Kitchen <i className="fas fa-utensils"/> x {kitchen} </li>           : null}
                {gym            !=='0' ? <li className="list-group-item">Gym <i className="fas fa-dumbbell"/> x {gym} </li>                   : null}
                {pool           !=='0' ? <li className="list-group-item">Pool <i className="fas fa-swimming-pool"/> x {pool} </li>            : null}
                {carpark        !=='0' ? <li className="list-group-item">Carpark <i className="fas fa-car-side"/> x {carpark} </li>           : null}

                <li className="list-group-item">Description :{description} </li>
              </ul>
              : null}


            </div>
          )
        }}

      </Consumer>

    );

  }
}

export default House;

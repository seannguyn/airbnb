import React from 'react'
import {Consumer} from '../../Context'
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddHosting from './AddHosting';

class House extends React.Component {

  constructor() {
    super();
    this.state = {
      showDetail: false, // flag to toggle house detail
    }
  }

  handleExpand() {
    this.setState({showDetail : !this.state.showDetail }, () => {
      console.log(this.state.showDetail);
    })
  }

  // pass an axios to backend, requesting for delete
    async handleDelete(id, dispatch) {

      console.log('delete',this.props.value,this.props.myHouses,id);

      const {myHostingList} = this.props.value;
      let i =0;
      var deletable=true;

      for(i=0; i<myHostingList.length; i++){
        if(myHostingList[i].accommodation == id){
          deletable =false;
          break;
        }
      }

      if (deletable === true) {
        alert("can delete")
        // dispatch({type:'DELETE_HOUSE',payload:id})
      }
      else {
        alert("cant delete, have hosting")
      }
    }

  render () {

    const {addr_number, addr_street, addr_city} = this.props.houseDetail;
    const {area,bedroom_master,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.props.houseDetail;

    const {user} = this.props.houseDetail; //-- from houses.js -- user id in each house in houselist
    const {id} = this.props.houseDetail;
    console.log("HDT: ", this.props.houseDetail);

    const {showDetail} = this.state;

    const isMyHouse = false; // flag to check if which current user's houses - for hosting button
    const isHosting = false;// flag to check if the accom is hosting
    return (
      <Consumer>
        { value => {
          const {dispatch} = value;

          const {currentUser, myHostingList} = value;

          if(currentUser[0] !== null){
            const {user_id} = currentUser[0];

            if(user_id === user){
              this.isMyHouse = true;
            }
            let counter = 0;
            let i = 0;
            // this.isHosting = false;
            for(i=0; i < myHostingList.length; i++){
              console.log("counter: ", i);
              console.log("cp: ", 0 + parseInt(myHostingList[i].accommodation), id);
              if( (0 + parseInt(myHostingList[i].accommodation)) === id){
                this.isHosting = true;
                break;
              }else{
                this.isHosting = false;

              }
            }
          }

          return (

            <div className="card card-body mb-3">
              <h5>
                {addr_number} {addr_street}, {addr_city} <i onClick={this.handleExpand.bind(this)} className="fas fa-sort-down" style={{cursor: 'pointer'}}/>
                <i  className="fas fa-times" onClick={this.handleDelete.bind(this, id, dispatch)} style={{cursor:'pointer', float:'right',color:'red'}}/>

                <Link to={`editHouse/${id}`}>
                  <i className="fas fa-pencil-alt" style={{cursor:'pointer', float:'right',color:'black'}}></i>
                </Link>

              {this.isMyHouse === true && this.isHosting === true?
                <div>
                  <Link to={`/edithosting/${id}`}>
                    <i>Edit hosting</i>
                  </Link>
                </div>
              : <Link to={`/hosting/${id}`}>
                    <i>Hosting</i>
                  </Link>

              }
              </h5>

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

import React from 'react'
import EditHouse from './EditHouse.js'
import Images from './Images.js'

class EditOverAll extends React.Component {

  constructor() {
    super();

    this.state = {
      stage_1: false,
      stage_2: true,
      stage_3: false,
    }

  }

  navigate(stage) {
    console.log('here', stage);
    if (stage === 1 && this.state.stage_1 === false) {
      this.setState({stage_1 : true ,stage_2 : false,stage_3 : false})
    } else if (stage === 2 && this.state.stage_2 === false) {
      this.setState({stage_1 : false ,stage_2 : true,stage_3 : false})
    } else if (stage === 3 && this.state.stage_3 === false){
      this.setState({stage_1 : false ,stage_2 : false,stage_3 : true})
    }
  }

  render () {

    const {stage_1, stage_2, stage_3} = this.state;
    const as_1 = (stage_1 === true ) ? " active" : null;
    const as_2 = (stage_2 === true ) ? " active" : null;
    const as_3 = (stage_3 === true ) ? " active" : null;

    return (
      <div>
      <h1>EDIT HOUSE</h1>
        <nav className="nav nav-pills nav-fill mt-5 navbar-light bg-light">
          <a className={"nav-item nav-link" + as_1} onClick={this.navigate.bind(this,1)} style={{cursor:'pointer'}}>Basic Info <i className="fas fa-check" style={{color:"black"}}></i></a>
          <a className={"nav-item nav-link" + as_2} onClick={this.navigate.bind(this,2)} style={{cursor:'pointer'}}>Picture</a>
          <a className={"nav-item nav-link" + as_3} onClick={this.navigate.bind(this,3)} style={{cursor:'pointer'}}>Lets host it</a>
        </nav>



        {stage_1 === true ? <EditHouse
          history={this.props.history}
          id={this.props.id}
          currentUser={this.props.currentUser}
          HouseList={this.props.HouseList}
           >
         </EditHouse>
       : null}

       {stage_2 === true ? <Images id={this.props.id} /> : null}

      </div>
    )
  }
}

export default EditOverAll;

import React, { Component } from 'react';
import TextInputGroup from '../Function/TextInputGroup';
import axios from 'axios';
import {Consumer} from '../../Context.js';
import {Link} from 'react-router-dom';

class Registration extends Component {
    state = {  }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = async (dispatch, e) => {
    
    }
    render() { 
        return ( 
            <Consumer>
            {value =>{
                const {dispatch} = value;
                return (
                    <React.Fragment>
                    <div className="card-header">Login</div>
                    <div className="card-body">
                    <div className="container">
                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  
                        <TextInputGroup
                            label="Username"
                            type="text" 
                            name="username" 
                            className="form-control form-control-lg" 
                            placeholder="Enter username..."
                            onChange={this.onChange}
                            error={this.state.error.username}/>
            
                        <TextInputGroup
                            label="Password" 
                            type="password" 
                            name="password" 
                            className="form-control form-control-lg" 
                            placeholder="Enter password..."
                            onChange={this.onChange}
                            error={this.state.error.password}/>
                       
                        <input type="submit" className="btn btn-block btn-light" value="Login"></input>
                    </form>

                    <Link to="" className="">
                    <i className="fab fa-facebook-square">Login with Facebook</i>
                    </Link>

                    </div>
                    </div>

                </React.Fragment>
                );
            }}
            </Consumer>
         );
    }
}


export default Registration;
import React, { Component } from 'react';
import TextInputGroup from '../Function/TextInputGroup';
import axios from 'axios';
import {Consumer} from '../../Context.js';
import {Link} from 'react-router-dom';

class Registration extends Component {
    
    constructor(){
        super();
        this.state = {
            username: '',
            password1: '',
            password2: '',
            email: '',
            error: {}
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        
        const {username, password1, password2, email, error} = this.state;

        if (username === '' ) {
            this.setState({error:{username:"Username is required"}})
            return;
          }
        if (password1 === '' ) {
            this.setState({error:{password1:"Password is required"}})
            return;
        }
        if (password2 === '' ) {
            this.setState({error:{password2:"Please confirm you password"}})
            return;
        }
        
        if (email === '' ) {
            this.setState({error:{email:"Email is required"}})
            return;
        }

        if(password1 !== password2){
            this.setState({error:{password2:"Passwords do not match"}})
            return;
        }

        const newAccount = {
            username,
            password1,
            password2,
            email
        }

        axios.post('https://localhost:8000/rest-auth/registration/', newAccount)
            .then((response) => {

            })

    }
    render() { 
        return ( 
            <Consumer>
            {value =>{
                const {dispatch} = value;
                return (
                    <React.Fragment>
                    <h1>Register Account</h1>
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
                            name="password1" 
                            className="form-control form-control-lg" 
                            placeholder="Enter password..."
                            onChange={this.onChange}
                            error={this.state.error.password1}/>
                        
                        <TextInputGroup
                            label="Confirm Password" 
                            type="password" 
                            name="password2" 
                            className="form-control form-control-lg" 
                            placeholder="Enter password again"
                            onChange={this.onChange}
                            error={this.state.error.password2}/>
                       
                       <TextInputGroup
                            label="Email" 
                            type="email" 
                            name="email" 
                            className="form-control form-control-lg" 
                            placeholder="Enter email..."
                            onChange={this.onChange}
                            error={this.state.error.email}/>

                        <input type="submit" className="btn btn-block btn-light" value="Register"></input>
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
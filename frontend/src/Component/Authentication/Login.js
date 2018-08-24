import React, { Component } from 'react';
import axios from 'axios';
import {Consumer} from '../../Context.js';
import {Link} from 'react-router-dom';

class Login extends Component {
    
    constructor(){
        super();
        this.state = {
            username : '',
            password : '',
            token: '',
            errors:{}
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        
        const {username, password} = this.state;
        
        if (username === '' ) {
          this.setState({errors:{username:"username is required"}})
          return;
        }
        if (password === '' ) {
          this.setState({errors:{password:"password is required"}})
          return;
        }
        
        const account = {
            username,
            password
        }

        //GET USER AUTH TOKEN - DJANGO
        const res = await axios.post('https://localhost:8000/api-token-auth/', account )
        console.log(res.data);
        
        dispatch({type:'LOGIN', payload:res.data});
        
        this.setState({
          username:'',
          password:'',
          errors:{}
        })
        
        this.props.history.push("/")
      }

      socialSubmit = async(dispatch, e) => {
        //   TODO: OAUTH login facebook
      } 

    render() {
        return(
            <Consumer>
            {value =>{
                const {dispatch} = value;
                return (
                    <React.Fragment>
                    <div className="card-header">Login</div>
                    <div className="card-body">
                    <div className="container">
                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                className="form-control form-control-lg" 
                                placeholder="Enter username..."
                                onChange={this.onChange}
                                error={this.state.errors.username}/>
                        </div> 
        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control form-control-lg" 
                                placeholder="Enter password..."
                                onChange={this.onChange}
                                error={this.state.errors.password}/>
                        </div> 
                        <input type="submit" className="btn btn-block btn-light" value="Login"></input>
                    </form> 
                    
                    <Link className="">
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
 
export default Login;
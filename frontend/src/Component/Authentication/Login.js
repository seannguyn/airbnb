import React, { Component } from 'react';
import axios from 'axios';
import {Consumer} from '../../Context.js';
import {Link} from 'react-router-dom';
import TextInputGroup from '../Function/TextInputGroup';

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

        const {username, password, error} = this.state;
        
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


        axios.post('https://localhost:8000/api-token-auth/', account )
        .then((response) => {
          dispatch({type:'LOGIN', payload:response.data});

        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });

        // console.log("loggin check",res.data);

        //GET USER AUTH TOKEN - DJANGO

        let res;
        let err;
        await axios.post('https://localhost:8000/api-token-auth/', account)
            .then(response => {
                res = response.data;
                dispatch({type:'LOGIN', payload:response.data});
            })
            .catch(error => {
                console.log("ERR: ", error.response);
                err = error.response;
                this.setState({error:{username:"Check your username again", password:"Check your password again"}});
            });

        console.log("ERROR: ", err);
        if( err != null){
            console.log(error);
            this.props.history.push("/login");
            return;
        }

        console.log("RES: ", res);
        if( res != null){
            
            
            this.setState({
                username:'',
                password:'',
                error:{}
            });

            this.props.history.push("/");
        }
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

export default Login;

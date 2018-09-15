import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';


import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  paper: {
    margin: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
  },
  form: {
    width: '80%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  typo: {
    marginBottom: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing.unit*3,
    minWidth: 400,
  },

});

class EditHosting extends Component {

    constructor() {
        super();
        this.state = {
            id: '', //accomodation hosting id itself
            accommodation: '', //accommodation id
            user: '', //user id
            date_start: '',
            date_end: '',
            check_in: '',
            check_out: '',
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
        const{myHostingList} = this.props;
        const{id} = this.props;

        // console.log('PROPSSSShosting: ', myHostingList, id);
        let i = 0;
        var result;
        for(i=0; i < myHostingList.length; i++){
          if(myHostingList[i].accommodation === id){
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
            check_in: result.check_in,
            check_out: result.check_out,
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

        const {
                date_start,
                date_end,
                check_in,
                check_out,
                price,
                description} = this.state;

        const hostingHouse = {
            // user: should be the current login user
            id: id,
            accommodation: this.props.id, //accommodation id
            date_start: date_start,
            date_end: date_end,
            price: price,
            check_in: check_in,
            check_out: check_out,
            description: description
        }


        // AXIOS call here - PUT REQUEST
        // Notes: need backend validation for date and available date to
        //        avoid conflicts.
        const {token} = currUser[0]; //GET TOKEN FROM CURRENT USER
        await axios.put(`https://localhost:8000/accommodationHosting/${id}/`, hostingHouse,
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
        const {id, date_start, date_end, price, description, check_in, check_out} = this.state;
        const { classes } = this.props;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    const {currentUser} = value;
                    console.log(currentUser);
                return (
                  <div className="card-body mb-3">
                    <div className="card-header">Host Accommodation</div>
                    <Paper className={classes.paper}>

                        <form className={classes.form} onSubmit={this.onSubmit.bind(this, dispatch, currentUser)}>
                            <FormControl margin="normal" required fullWidth style={{marginBottom:'15px'}}>
                              <TextField
                                id="date"
                                name="date_start"
                                label="Start date"
                                type="date"
                                value={date_start}
                                className={classes.textField}
                                onChange={this.onChange.bind(this)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth style={{marginBottom:'15px'}}>
                              <TextField
                                id="date"
                                name="date_end"
                                label="End date"
                                type="date"
                                value={date_end}
                                className={classes.textField}
                                onChange={this.onChange.bind(this)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth style={{marginBottom:'15px'}}>
                              <TextField
                                id="time"
                                label="Check In"
                                name="check_in"
                                value={check_in}
                                type="time"
                                className={classes.textField}
                                onChange={this.onChange.bind(this)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  step: 300, // 5 min
                                }}
                              />
                              <TextField
                                id="time"
                                label="Check Out"
                                name="check_out"
                                value={check_out}
                                type="time"
                                className={classes.textField}
                                onChange={this.onChange.bind(this)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  step: 300, // 5 min
                                }}
                              />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth style={{marginBottom:'15px'}}>
                              <TextField
                                label="price"
                                value={price}
                                onChange={this.onChange.bind(this)}
                                name="price"
                                type="text"
                                className={classes.textField}
                              />
                          </FormControl>
                            <FormControl margin="normal" required fullWidth style={{marginBottom:'15px'}}>
                              <TextField
                                label="description"
                                value={description}
                                onChange={this.onChange.bind(this)}
                                name="description"
                                type="text"

                              />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                              >
                                Edit Hosting
                              </Button>
                              <Button
                                  fullWidth
                                  variant="raised"
                                  color="secondary"
                                  className={classes.submit}
                                  onClick={this.handleAlternate.bind(this, id, dispatch)}
                                >
                                  Stop Hosting this accommodation
                                </Button>
                          </form>
                        </Paper>
                      </div>
                    );
                }}
            </Consumer>
        );

    }
}

export default withStyles(styles)(EditHosting);

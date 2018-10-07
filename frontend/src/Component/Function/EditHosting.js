import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {enumerateDaysBetweenDates,yyyymmdd} from '../Helper/Helper'
import {Link} from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

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
            price: 0,
            guest: 2,
            description: '',

            date_start_old: '',
            date_end_old: '',
            error: false,
            error_price: false,
            error_date: false,
            error_guest: false,
            deleteDisable: false,
        }
    }

    // componentWillUpdate(nextProps, nextState){
    //     console.log("WILL UPDATE: ", this.state.currentUser);
    //     localStorage.setItem('currentUser', JSON.stringify(nextState.currentUser));
    // }

    async componentDidMount(){
        console.log("from edithousingjs: ", this.props);
        const{myHostingList} = this.props;
        const{id} = this.props;

        // console.log('PROPSSSShosting: ', myHostingList, id);
        let i = 0;
        var result;
        for(i=0; i < myHostingList.length; i++){
          if(parseInt(myHostingList[i].accommodation,10) === parseInt(id,10)){
            result = myHostingList[i];
          }
        }
        const booking = await axios.get(`/booking/?host=${result.id}`);
        var deleteDisable = false;
        if (booking.data.length > 0) {
          deleteDisable = true;
        }
        // console.log("FILTER EDITHOUSING: ", result);
        // console.log("FILTER EDITHOUSING: ", result.date_start);
        this.setState({
            id: result.id,
            accommodation: result.accommodation,
            date_start: result.date_start,
            date_end: result.date_end,
            date_start_old: new Date(result.date_start),
            date_end_old: new Date(result.date_end),
            check_in: result.check_in,
            check_out: result.check_out,
            description: result.description,
            price: result.price,
            deleteDisable: deleteDisable,
            date_start_onchange: new Date(result.date_start)
        }, () => {console.log("STATE IS:", this.state);})
    }

    //set State when changing text
    onChange = (e) => {
        if( e.target.name === 'date_start'){
          let date_start = new Date(e.target.value)

          if(date_start > this.state.date_start_old){
            console.log("DATE INVALID", typeof(e.target.value));
            this.setState({error_date: true, error: true})
          } else {
            this.setState({error_date: false, error: false})
          }


            this.setState({date_start_onchange: date_start});
        }


        if(e.target.name === 'date_end'){

            let date_end = new Date(e.target.value)

            // console.log("DATE INVALID", typeof(date_end));

            if(date_end < this.state.date_start_onchange || date_end < this.state.date_end_old){

              this.setState({error_date: true, error: true})
            } else {
              this.setState({error_date: false, error: false})
            }
        }
        if(e.target.name === 'price') {
           if(e.target.value.length === 0 || e.target.value <= 0) {
             this.setState({error_price: true, error: true})
           }else {
             this.setState({error_price: false, error: false})
           }
        }
        if(e.target.name === 'guest') {
          console.log("SUPPP...",e.target.value);
           if(e.target.value.length === 0 || e.target.value <= 0) {
             this.setState({error_guest: true, error: true})
           }else {
             this.setState({error_guest: false, error: false})
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
                guest,
                description} = this.state;

        const hostingHouse = {
            // user: should be the current login user
            id: id,
            accommodation: this.props.id, //accommodation id
            date_start: date_start,
            date_end: date_end,
            price: price,
            guest: guest,
            check_in: check_in,
            check_out: check_out,
            description: description
        }

        console.log("ABOUT TO PUT", hostingHouse);
        let newStartDate = new Date(date_start)
        let newEndDate = new Date(date_end)

        // DEAL WITH SEARCH DATA
        var date_free_1="", date_free_2="";
        if (newStartDate < this.state.date_start_old) {
          date_free_1 = date_free_1.concat(enumerateDaysBetweenDates(date_start,yyyymmdd(new Date(this.state.date_start_old.setDate( this.state.date_start_old.getDate() - 1) ))))
          console.log("HEY HEY",date_free_1);
        }
        if (newEndDate > this.state.date_end_old) {
          date_free_2 = date_free_2.concat(enumerateDaysBetweenDates(yyyymmdd(new Date(this.state.date_end_old.setDate( this.state.date_end_old.getDate() + 1) )),date_end))
          console.log("HEY HEY",date_free_2);
        }

        const oldSearch = await axios.get(`/search/${this.props.id}/`)


        const {date_free} = oldSearch.data
        console.log(date_free);

        var newDateFree = date_free.concat(date_free_1,date_free_2)


        const searchAccommodation = {
          accommodation: this.props.id,
          date_free: newDateFree,
          price: price,
          guest: guest,
        }

        console.log(searchAccommodation,"new SEARCH");
        await axios.patch(`/search/${this.props.id}/`,searchAccommodation)

        // AXIOS call here - PUT REQUEST
        // Notes: need backend validation for date and available date to
        //        avoid conflicts.


        const {token} = currUser[0]; //GET TOKEN FROM CURRENT USER
        console.log("ID IS: ",id);
        await axios.put(`/accommodationHosting/${id}/`, hostingHouse,
                {headers:{
                    'Authorization': {token}
                }
            }
        )
        dispatch({type:'EDITHOST', payload:hostingHouse});

        this.props.onPresentSnackbar('success','Edited Hosting');

        this.props.history.push("/myHouses")
    }

    handleAlternate(id,dispatch,e) {
      e.preventDefault();
      console.log("stop hosting",id);

      axios.delete(`/accommodationHosting/${id}/`)
      .then(res => {
        dispatch({type: "DELETE_HOST", payload: id})
      })
      this.props.onPresentSnackbar('error','delete hosting');
    }

    render() {
        const {id, date_start, date_end, price, description, check_in, check_out, guest} = this.state;
        const { classes } = this.props;
        console.log("ERROR", this.state.error);
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
                                error={this.state.error_date}
                                helperText={this.state.error_date === true ? 'Invalid Date' : ''}
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
                                error={this.state.error_date}
                                helperText={this.state.error_date === true ? 'Invalid Date' : ''}
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
                                error={this.state.error_price}
                                helperText={this.state.error_price === true ? 'Invalid Price' : ''}
                                label="price"
                                value={price}
                                onChange={this.onChange.bind(this)}
                                name="price"
                                type="number"
                                className={classes.textField}
                              />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth style={{marginBottom:'15px'}}>
                              <TextField
                                error={this.state.error_guest}
                                helperText={this.state.error_guest === true ? 'Invalid Guest' : ''}
                                label="Guest"
                                value={guest}
                                onChange={this.onChange.bind(this)}
                                name="guest"
                                type="number"
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
                                disabled={this.state.error}
                              >
                                Edit Hosting
                              </Button>

                                <Button
                                    fullWidth
                                    variant="raised"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={this.handleAlternate.bind(this, id, dispatch)}
                                    disabled={this.state.deleteDisable}
                                  ><Link to="/myHouses" style={{ textDecoration: 'none',color:'grey' }}>
                                  Stop Hosting this accommodation</Link>
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
export default withSnackbar(withStyles(styles)(EditHosting));

import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function getModalStyle() {

  const top = 25;


  return {
    top: `${top}%`,
    margin: 'auto'
  };
}

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  paper: {
    margin: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    height: 60,
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
  modal: {
    position: 'center',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class EditHouse extends Component {

  constructor() {
    super();
    this.state = {

      status: 0,
      init: 0,

      currentUser: {},

      id: '',
      user: '',
      title: '',
      Accommodation_Type: '',

      number: '',
      street: '',
      city: '',
      state: '',

      bed: '',
      bedroom:'',
      bathroom:'',
      kitchen:'',
      gym:'',
      pool: '',
      carpark: '',
      description:'',

      error_number: false,
      error_street: false,
      error_city: false,
      error_state: false,
      error_Accommodation_Type: false,
      error_bedroom: false,
      error_bathroom: false,

      error: {
        number: '',
        street: '',
        city: '',
        state: '',
        Accommodation_Type: '',
        bedroom: '',
        bathroom: '',
      },
      modalOpen:false,
    }
    setTimeout(() => {
        this.setState({
            status: 1
        });
    },1000);
  }

  shouldComponentUpdate(nextProps, nextState) {

      if (nextState.status === 1) {
        console.log("Should Component update", this.props, nextProps);

        const {HouseList, currentUser} = this.props;
        const {id} = this.props;



        let i =0;
        var result;
        for(i=0; i < HouseList.length; i++){
          if(HouseList[i].id === parseInt(id,10)){
            result = HouseList[i];
          }
        }

        if (this.state.init === 0) {

          this.setState({

            init: 1,
            id: result.id,
            user: result.user,
            Accommodation_Type: result.Accomodation_Type,

            title: result.title,

            number: result.addr_number,
            street: result.addr_street,
            city:  result.addr_city,
            state: result.addr_state,

            bed: result.bed,
            bedroom: result.bedroom,
            bathroom: result.bathroom,
            kitchen: result.kitchen,
            gym: result.gym,
            pool: result.pool,
            carpark: result.carpark,
            description: result.description,
            currentUser: currentUser
          })
        }

        return true;
      } else {
        return false;
      }

  }

  componentWillMount() {


    // =>

  }

  onChange(e) {

    this.setState({[e.target.name] : e.target.value});
  }

  onCheck(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  errorCheck(current) {
    const {number,Accommodation_Type} = current;
    // const {id, user, Accommodation_Type, number, street, city, state, title} = current;
    // const {bed,bedroom,bathroom,kitchen,gym,pool,carpark,description} = current;

    var flag = false;
    if (number === '') {
      this.setState({error:{number:"number is required"}, error_number: true})
      flag = true;
    } else if (!isFinite(String(number))) {
      this.setState({error:{number:"numeric please"}, error_number: true})
      flag = true;
    }

    if (Accommodation_Type === '') {
      this.setState({error:{Accommodation_Type:"required"}, error_Accommodation_Type: true})
      flag = true;
    }

    // if (street === '' ) {
    //   this.setState({error:{street:"street is required"}})
    //   return;
    // }
    // if (city === '' ) {
    //   this.setState({error:{city:"city is required"}})
    //   return;
    // }
    //
    // if (bedroom === ''  || !isFinite(String(bedroom))) {
    //   this.setState({error:{bedroom:"bedroom is required"}})
    //   return;
    // }
    // if (bathroom === '' || !isFinite(String(bathroom))) {
    //   this.setState({error:{bathroom:"bathroom is required"}})
    //   return;
    // }

    if (flag === true) {
      return true;
    } else {
      return false;
    }

  }

  async onSubmit(dispatch, e) {
    e.preventDefault();

    const {id, user, Accommodation_Type, number, street, city, state, title} = this.state;
    const {bed,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.state;

    if(this.errorCheck(this.state) === true) return;


    const editHouse ={
      id: id,
      user:user,
      Accomodation_Type: Accommodation_Type,
      title: title,
      addr_number: number,
      addr_street: street,
      addr_city: city,
      addr_state: state,

      bed:bed,
      bedroom:bedroom,
      bathroom:bathroom,
      kitchen:kitchen,

      pool:pool,
      gym:gym,
      carpark:carpark,

      description:description
    }

    console.log(editHouse);

    // const res = await axios.put(`${id}`,editHouse)
    const {token} = this.state.currentUser; //GET TOKEN FROM CURRENT USER
    await axios.put(`https://localhost:8000/accommodation/${id}/`, editHouse,
            {headers:{
                'Authorization': {token}
            }
        }
    )

    const searchAccommodation = {
      accommodation: this.props.id,
      location: city
    }
    await axios.patch(`https://localhost:8000/search/${this.props.id}/`,searchAccommodation)
    .catch(error => {
      console.log(error.response,)
    });

    dispatch({type:'EDIT_HOUSE', payload:editHouse})

    this.setState({
      error_number: false,
      error_street: false,
      error_city: false,
      error_state: false,
      error_bedroom: false,
      error_bathroom: false,

      error: {
        number: '',
        street: '',
        city: '',
        state: '',
        bedroom: '',
        bathroom: '',
      },
       modalOpen: true
    })

  }
  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render () {
    const {status} = this.state;
    const {Accommodation_Type,number, street, city, state, title} = this.state;
    const {bed,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.state;
    console.log(Accommodation_Type,"accomm type");
    const {classes} = this.props
    return (
        <Consumer>
        {value =>{

          const {dispatch} = value;
          if (status === 0 ) {
            return(
              <div>
                <CircularProgress className={classes.progress} color="primary" size={50}/>
              </div>
            )
          }
          else {
            return (
              <div>
                  <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <HomeIcon/>
                    </Avatar>

                    <form className={classes.form} onSubmit={this.onSubmit.bind(this, dispatch)}>
                      <Typography className={classes.typo} variant="headline" >Title</Typography>
                        <FormControl margin="normal" required fullWidth style={{marginBottom:'30px'}}>
                          <TextField
                            error={this.state.error_title}
                            value={title}
                            autoFocus
                            onChange={this.onChange.bind(this)}
                            name="title"
                            type="text"
                          />
                        </FormControl>
                      <Typography className={classes.typo} variant="headline">Address</Typography>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_number}
                          label="Number"
                          value={number}

                          onChange={this.onChange.bind(this)}
                          name="number"
                          type="text"
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_street}
                          label="Street"
                          value={street}

                          onChange={this.onChange.bind(this)}
                          name="street"
                          type="text"
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_city}
                          label="City"
                          value={city}

                          onChange={this.onChange.bind(this)}
                          name="city"
                          type="text"
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          error={this.state.error_state}
                          label="State"
                          value={state}

                          onChange={this.onChange.bind(this)}
                          name="state"
                          type="text"
                        />
                      </FormControl>
                      <Typography className={classes.typo} variant="headline">Category</Typography>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="accom-type">select</InputLabel>
                        <Select
                          value={Accommodation_Type}
                          onChange={this.onChange.bind(this)}
                          inputProps={{
                            name: 'Accommodation_Type',
                            id: 'accom-type',
                          }}
                        >
                          <MenuItem value="Room">Room</MenuItem>
                          <MenuItem value="Studio">Studio</MenuItem>
                          <MenuItem value="House">House</MenuItem>
                          <MenuItem value="Apartment">Apartment</MenuItem>
                          <MenuItem value="Villa">Villa</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography className={classes.typo} variant="headline">Basic</Typography>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Bedroom"
                          value={bedroom}
                          onChange={this.onChange.bind(this)}
                          name="bedroom"
                          type="number"
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Bed"
                          value={bed}
                          onChange={this.onChange.bind(this)}
                          name="bed"
                          type="number"
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Bathroom"
                          value={bathroom}
                          onChange={this.onChange.bind(this)}
                          name="bathroom"
                          type="number"
                        />
                      </FormControl>
                      <Typography className={classes.typo} variant="headline">Amenities</Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={kitchen}
                              onChange={this.onCheck.bind(this)}
                              value="kitchen"
                              name="kitchen"
                              />
                          }
                          label="Kitchen"
                          />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={gym}
                              onChange={this.onCheck.bind(this)}
                              value="gym"
                              name="gym"
                              />
                          }
                          label="Gym"
                          />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={pool}
                              onChange={this.onCheck.bind(this)}
                              value="pool"
                              name="pool"
                              />
                          }
                          label="Pool"
                          />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={carpark}
                              onChange={this.onCheck.bind(this)}
                              value="carpark"
                              name="carpark"
                              />
                          }
                          label="Carpark"
                          />
                      <Typography className={classes.typo} variant="headline">Description</Typography>
                      <FormControl margin="normal" required fullWidth>
                        <TextField
                          label="Description"
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
                          Save
                        </Button>
                  </form>
                </Paper>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  style={{alignItems:'center',justifyContent:'center'}}
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.modal}>
                    <Typography variant="title" id="modal-title">
                      Information Saved Successful
                    </Typography>
                    <Button
                      variant="raised" onClick={this.handleClose} color="primary">Close</Button>
                  </div>
                </Modal>

              </div>
            );
          }

        }}
      </Consumer>

    )
  }
}

export default withStyles(styles)(EditHouse);

import React, { Component } from 'react';
import {Consumer} from '../../Context.js';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import { withSnackbar } from 'notistack';
import SearchBar from '../PlacesAutoComplete/LocationSearchInput'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const styles = theme => ({
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

function getModalStyle() {

  const top = 25;


  return {
    top: `${top}%`,
    margin: 'auto'
  };
}

class AddHouse extends Component {

  constructor() {
    super();
    this.state = {

      user:{},

      title: '',

      address: '',
      latitude: 0,
      longitude: 0,

      Accommodation_Type:'',

      bed: 1,
      bedroom: 1,
      bathroom: 1,

      kitchen: false,
      gym: false,
      pool: false,
      carpark: false,
      description:'',

      error_title: false,
      error_number: false,
      error_street: false,
      error_city: false,
      error_state: false,
      error_Accommodation_Type: false,
      error_bedroom: false,
      error_bathroom: false,

      error: {
        title: '',
        Accommodation_Type: '',
        bedroom: '',
        bathroom: '',
      },
      modalOpen:false,
    }
  }

  componentWillMount() {
    this.setState({user: this.props.CurrentUser[0]})
  }

  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }

  onCheck(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  errorCheck(current) {
    const { Accommodation_Type} = current;
    // const {id, user, Accommodation_Type, number, street, city, state} = current;
    // const {bed,bedroom,bathroom,kitchen,gym,pool,carpark,description} = current;

    var flag = false;

    if (Accommodation_Type === '') {
      this.setState({error:{Accommodation_Type:"required"}, error_Accommodation_Type: true})
      flag = true;
    }

    if (flag === true) {
      return true;
    } else {
      return false;
    }

  }

  async onSubmit(dispatch, e) {
    e.preventDefault();

    const {user} = this.state;
    const {/*Accommodation_Type, */bed ,address, latitude, longitude, bedroom,bathroom,kitchen,gym,pool,carpark/*,description*/} = this.state;

    if(this.errorCheck(this.state) === true) return;

    const newHouse ={

      user:             user.user_id,

      Accomodation_Type: this.state.Accommodation_Type,

      address:          address.toLowerCase(),
      latitude:         latitude,
      longitude:        longitude,

      title:            this.state.title,

      bed:              bed,
      bedroom:          bedroom,
      bathroom:         bathroom,

      kitchen:          kitchen,
      pool:             pool,
      gym:              gym,
      carpark:          carpark,

      description:      this.state.description
    }

    console.log(newHouse);

    const id = await axios.post('https://localhost:8000/accommodation/',newHouse)
    const res = await axios.get(`https://localhost:8000/accommodation/`);

    // create review count
    await axios.post(`https://localhost:8000/reviewCounter/`,{accommodation: id.data.id, count: 0})

    dispatch({type:'ADD_HOUSE', payload:res.data})

    this.setState({

      title: '',
      address: '',

      Accomodation_Type:'',
      bed: 0,
      bedroom:0,
      bathroom:0,
      kitchen:false,
      gym:false,
      pool: false,
      carpark: false,
      description:'',
      error:{}
    })

    this.props.history.push({
      pathname: `/editHouse/${id.data.id}`,
    })

    this.props.onPresentSnackbar('success','Accommodation is added');

  }

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
        console.log("state: ", this.state);
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  render () {

    const {title} = this.state;
    const {Accommodation_Type,bed,bedroom,bathroom,kitchen,gym,pool,carpark,description} = this.state;
    const {classes} = this.props

    return (

      <Consumer>
        {value =>{
          const {dispatch} = value;
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
                      <Typography className={classes.typo} variant="headline" >Address</Typography>
                      <SearchBar handleSelect={this.handleSelect}/>

                      <Typography className={classes.typo} variant="headline">Category</Typography>
                      <FormControl className={classes.formControl} error={this.state.error_Accommodation_Type}>
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

        }}
      </Consumer>
    )
  }
}

export default withSnackbar(withStyles(styles, { withTheme: true })(AddHouse));

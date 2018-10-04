import React, {Component} from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';

import {Consumer} from '../../Context.js';

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
    margin: theme.spacing.unit * 3,
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

  constructor(props) {
    super(props);
    this.state = {

      user: {},

      title: '',

      number: '',
      street: '',
      city: '',
      state: '',

      Accommodation_Type: '',
      area: '',
      bedroom_master: '',
      bedroom: '',
      bathroom: '',
      kitchen: '',
      gym: '',
      pool: '',
      carpark: '',
      description: '',

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
        number: '',
        street: '',
        city: '',
        state: '',
        Accommodation_Type: '',
        bedroom: '',
        bathroom: '',
      },
      modalOpen: false,
    }
  }

  componentWillMount() {
    this.setState({user: this.props.CurrentUser[0]})
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  errorCheck(current) {
    const {Accommodation_Type, number} = current;
    // const {id, user, Accommodation_Type, number, street, city, state} = current;
    // const {area,bedroom_master,bedroom,bathroom,kitchen,gym,pool,carpark,description} = current;

    let flag = false;
    if (number === '') {
      this.setState({error: {number: "number is required"}, error_number: true})
      flag = true;
    } else if (!isFinite(String(number))) {
      this.setState({error: {number: "numeric please"}, error_number: true})
      flag = true;
    }

    if (Accommodation_Type === '') {
      this.setState({error: {Accommodation_Type: "required"}, error_Accommodation_Type: true})
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

    return flag === true;
  }

  async onSubmit(dispatch, e) {
    e.preventDefault();

    const {user/*,number, street, city, state*/} = this.state;
    const {/*Accommodation_Type, */area, bedroom_master, bedroom, bathroom, kitchen, gym, pool, carpark/*,description*/} = this.state;

    if (this.errorCheck(this.state) === true) return;


    this.setState({
      bathroom: (bathroom === '') ? 0 : 1,
      bedroom: (bedroom === '') ? 0 : 1,
      area: (area === '') ? 0 : 1,
      bedroom_master: (bedroom_master === '') ? 0 : 1,
      kitchen: (kitchen === '') ? 0 : 1,
      gym: (gym === '') ? 0 : 1,
      pool: (pool === '') ? 0 : 1,
      carpark: (carpark === '') ? 0 : 1,
    });

    const newHouse = {

      user: user.user_id,

      Accomodation_Type: this.state.Accommodation_Type,

      title: this.state.title,
      addr_number: this.state.number,
      addr_street: 'street',
      addr_city: 'city',
      addr_state: 'NSW',

      area: (area === '') ? 0 : 1,
      bedroom_master: (bedroom_master === '') ? 0 : 1,
      bedroom: (bedroom === '') ? 0 : 1,
      bathroom: (bathroom === '') ? 0 : 1,
      kitchen: (kitchen === '') ? 0 : 1,

      pool: (pool === '') ? 0 : 1,
      gym: (gym === '') ? 0 : 1,
      carpark: (carpark === '') ? 0 : 1,

      description: this.state.description
    };

    console.log(newHouse);

    const id = await axios.post('/accommodation/', newHouse);
    const res = await axios.get('/accommodation/?user=${newHouse.user}');

    console.log("NEW ID ISSSSS: ", id.data.id);
    dispatch({type: 'ADD_HOUSE', payload: res.data})

    this.setState({

      title: '',
      number: '',
      street: '',
      city: '',
      state: '',

      Accomodation_Type: '',
      area: '',
      bedroom_master: '',
      bedroom: '',
      bathroom: '',
      kitchen: '',
      gym: '',
      pool: '',
      carpark: '',
      description: '',
      error: {}
    });

    this.props.history.push({
      pathname: `/editHouse/${id.data.id}`,
    })
  }


  render() {

    const {title, number, street, city, state} = this.state;
    const {Accommodation_Type, /*,area,*/bedroom_master, bedroom, bathroom, kitchen, gym, pool, carpark, description} = this.state;
    const {classes} = this.props;

    return (

      <Consumer>
        {value => {
          const {dispatch} = value;
          return (
            <div>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <HomeIcon/>
                </Avatar>

                <form className={classes.form} onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <Typography className={classes.typo} variant="headline">Title</Typography>
                  <FormControl margin="normal" required fullWidth style={{marginBottom: '30px'}}>
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
                  <Typography className={classes.typo} variant="headline">Amenities</Typography>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Bedroom"
                      value={bedroom}
                      onChange={this.onChange.bind(this)}
                      name="bedroom"
                      type="text"
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Bedroom Master"
                      value={bedroom_master}
                      onChange={this.onChange.bind(this)}
                      name="bedroom_master"
                      type="text"
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Bathroom"
                      value={bathroom}
                      onChange={this.onChange.bind(this)}
                      name="bathroom"
                      type="text"
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Kitchen"
                      value={kitchen}
                      onChange={this.onChange.bind(this)}
                      name="kitchen"
                      type="text"
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Gym"
                      value={gym}
                      onChange={this.onChange.bind(this)}
                      name="gym"
                      type="text"
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Pool"
                      value={pool}
                      onChange={this.onChange.bind(this)}
                      name="pool"
                      type="text"
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextField
                      label="Carpark"
                      value={carpark}
                      onChange={this.onChange.bind(this)}
                      name="carpark"
                      type="text"
                    />
                  </FormControl>
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
                style={{alignItems: 'center', justifyContent: 'center'}}
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

export default withStyles(styles, {withTheme: true})(AddHouse);
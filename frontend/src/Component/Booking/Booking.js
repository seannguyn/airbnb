import React, { Component } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
// import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {CardActions } from '../../../node_modules/@material-ui/core';
// import {Link} from 'react-router-dom'


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};


class Booking extends Component {


    handleDelete = async (id) => {
        await axios.delete(`https://localhost:8000/booking/${id}/`);
        alert("Delete successfully - reload page");
    }

    handleEdit = () => {

    }

    handlePayment= () => {

    }

    findImages = (images) => {

    }

    async componentDidMount(){

        const images = await axios.get('https://localhost:8000/accommodationImage/');
        this.findImages(images.data);

    }

    render() {
        const { id, date_start, date_end, note, isPaid } = this.props.booking;
        const { classes } = this.props;
        console.log("Propsss: ", this.props);

        var payButton = []
        if (isPaid === false) {
          payButton.push(
            <Button variant="contained" color="primary" onClick={this.handlePayment}>
              Pay
          </Button>)
        } else {
          payButton.push(
          <Button color="primary">
            Paid
          </Button>)
        }

        return (
            <React.Fragment>
                <Card className={classes.card} style={{width:'30vw'}} >

                    <CardActions>
                        {/* <CardMedia>

                        </CardMedia> */}
                    </CardActions>

                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                        From: {date_start}
                        </Typography>

                        <Typography gutterBottom variant="headline" component="p">
                         To: {date_end} Note: {note}
                        </Typography>

                        <Typography gutterBottom variant="headline" component="p">
                            Note: {note}
                        </Typography>

                        <Button onClick={this.handleEdit}>
                            <i className="fas fa-pencil-alt" style={{cursor:'pointer', float:'right',color:'black'}}></i>
                        </Button>

                        <Button onClick={this.handleDelete.bind(this, id)}>
                            <i  className="fas fa-times" style={{cursor:'pointer', float:'right',color:'red'}}/>
                        </Button>

                        {payButton}

                     </CardContent>
                </Card>
            </React.Fragment>
         );
    }
}

export default withStyles(styles)(Booking);

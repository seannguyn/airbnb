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
import { CardMedia, CardActions } from '../../../node_modules/@material-ui/core'
// import {Link} from 'react-router-dom'
import moment from 'moment'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};


class Booking extends Component {

    constructor(){
        super();
    }

    handleDelete = async (id) => {
        await axios.delete(`https://localhost:8000/booking/${id}/`);
        alert("Delete successfully - reload page");
    }

    handleEdit = () => {

    }

    findImages = (images) => {

    }

    async componentDidMount(){

        const images = await axios.get('https://localhost:8000/accommodationImage/');
        this.findImages(images.data);

    }

    render() {

        let {daysLeft, hoursLeft, minutesLeft} = 0;
        const { classes, booking } = this.props;
        const { id, date_start, date_end, note } = booking;

        console.log("Propsss: ", this.props);

        daysLeft = Math.abs(moment(date_start).diff(moment(), 'hours'))/24;
        hoursLeft = Math.abs((daysLeft - Math.round(daysLeft))) * 24;
        daysLeft = Math.round(daysLeft);

        if(hoursLeft > 1){
            minutesLeft = Math.round(Math.abs((Math.round(hoursLeft) - hoursLeft ))) * 60;
        }
        else{
            minutesLeft = Math.round(hoursLeft * 60);
            hoursLeft = 0;
        }
        hoursLeft = Math.round(hoursLeft);
        return (
            <React.Fragment>
                <Card className={classes.card}>
                    {/* <CardActions> */}
                    <CardMedia className={classes.media} image="" title="">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WywhWyPwGB89RrYhEl9zzlDeqXcLI-lpuMu7-XcuvR3MC9UT"
                            width="345" height="220"/>
                    </CardMedia>
                    {/* </CardActions> */}
                    <CardContent style={{marginLeft:'-1.23rem'}}>
                        <Typography gutterBottom variant="headline" component="h2">
                        From: {date_start}
                        </Typography>
                        <Typography gutterBottom variant="headline" component="p">
                         To: {date_end}
                        </Typography>
                        <Typography gutterBottom variant="headline" component="p">
                            Note: {note}
                        </Typography>
                        {daysLeft >= 0?
                            <p>You stay will start in {daysLeft} days {hoursLeft} hours {minutesLeft} minutes</p>
                        :null
                        }
                        <div style={{float:'right'}}>
                            <Button onClick={this.handleEdit}>
                                <i className="fas fa-pencil-alt" style={{cursor:'pointer', float:'right',color:'black'}}></i>
                                </Button>
                            <Button onClick={this.handleDelete.bind(this, id)}>
                                <i  className="fas fa-times" style={{cursor:'pointer', float:'right',color:'red'}}/>
                            </Button>
                        </div>
                     </CardContent>
                </Card>
            </React.Fragment>
         );
    }
}

export default withStyles(styles)(Booking);

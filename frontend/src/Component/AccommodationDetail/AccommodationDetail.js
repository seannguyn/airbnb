import React, { Component } from 'react';
import axios from 'axios';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class AccommodationDetail extends Component {

    constructor(){
        super()
        this.state = {
            accomDetail: {}
        }
    }
    async componentDidMount(){

        const {id} = this.props.match.params;
        console.log("ID: ", id);
        const res = await axios.get(`https://localhost:8000/accommodation/${id}/`);

        this.setState({accomDetail: res.data});
    }

    render() {
        console.log("state detail: ", this.state.accomDetail);
        const {Accommodation_Type, area, bathroom,
                bedroom, bedroom_master, carpark, kitchen, description} = this.state.accomDetail;
        return (
            <div>
                <h1>
                    House Name Goes Here
                </h1>
                <h3>Description: {description}</h3>
                <div className="row">
                    <i className="fas fa-bed"> {bedroom} bedrooms</i>&#160;
                    <i className="fas fa-bath"> {bathroom} bathrooms</i>&#160;
                    <i className="fas fa-utensils"> {kitchen} kitchens</i>&#160;
                    <i className="fas fa-car"> {carpark} carparks</i>&#160;
                </div>

                <h2>Choose date</h2>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
         );
    }
}
export default AccommodationDetail;
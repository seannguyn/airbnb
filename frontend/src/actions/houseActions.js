import { GET_HOUSES, DELETE_HOUSE, ADD_HOUSE } from './types';
import axios from 'axios';
 
export const getHouses = () => async dispatch => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users'); 
    console.log("DATA: ", res.data);
    dispatch ({
        type: GET_HOUSES,
        payload: res.data
    });
};

export const deleteHouse = (id) => {
    return {
        type: DELETE_HOUSE,
        payload: id
    };
};

export const addHouse = (house) => {
    return {
        type: ADD_CONTACT,
        payload: house
    };
};
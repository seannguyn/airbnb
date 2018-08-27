import { GET_HOUSES, DELETE_HOUSE, ADD_HOUSE } from  '../actions/types';

const initialState = {
    houses: []
};

export default function(state = initialState, action){
    switch(action.type){
        
        case GET_HOUSES:
            return {
                ...state,
                contacts: action.payload
            }
        
        case DELETE_HOUSE:
            return {
                ...state,
                houses: state.contacts.filter(house =>
                            house.id !== action.payload)
            }
        
        case ADD_HOUSE:
            return {
                ...state,
                houses: [action.payload, ...state.houses]
            };

        default: 
            return state;
    }
}
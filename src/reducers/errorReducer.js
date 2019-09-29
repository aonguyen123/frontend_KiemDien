import { GET_ERRORS, CLEARN_ERRORS } from './../constants/types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        case CLEARN_ERRORS: 
            return action.payload;
        default: 
            return state;
    }
}

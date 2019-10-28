import { GET_CURRENT_ACCOUNT } from './../constants/types';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CURRENT_ACCOUNT:
            return action.payload;
        default:
            return state;
    }
}
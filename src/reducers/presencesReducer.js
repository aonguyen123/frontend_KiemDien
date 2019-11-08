import { GET_CLASS_PRESENCES } from './../constants/types';

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CLASS_PRESENCES:
            return action.payload;
        default:
            return state;
    }
};
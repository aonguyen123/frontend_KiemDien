import { GET_CLASS_ASSIGNES } from './../constants/types';

const initialState = [];
export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CLASS_ASSIGNES:
            return action.payload;
        default:
            return state;
    }
};
import { GET_CLASS_ASSIGNES, GET_ASSIGNES_LATEST } from './../constants/types';

const initialState = [];
export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CLASS_ASSIGNES:
            return action.payload;
        case GET_ASSIGNES_LATEST:
            return action.payload;
        default:
            return state;
    }
};
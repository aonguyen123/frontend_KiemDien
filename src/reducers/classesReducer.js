import { GET_CLASSES } from './../constants/types';

const initialState = {
    classes: [],
    status: ''
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CLASSES:
            return {
                ...state,
                classes: action.payload.classes,
                status: action.payload.status
            }
        default:  
            return state;
    }
}
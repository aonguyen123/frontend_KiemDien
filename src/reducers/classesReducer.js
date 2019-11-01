import { GET_CLASSES } from './../constants/types';

const initialState = {
    classes: []
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CLASSES:
            return {
                ...state,
                classes: action.payload.classes
            }
        default:  
            return state;
    }
}
import { GET_CLASSES, GET_CLASS_LATEST } from './../constants/types';

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
        case GET_CLASS_LATEST:
            return {
                ...state,
                classes: action.payload
            }
        default:  
            return state;
    }
}
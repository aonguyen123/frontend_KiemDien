import { GET_CLASS_PRESENCES, PRESENCES_STATISTICAL } from './../constants/types';

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CLASS_PRESENCES:
            return action.payload;
        case PRESENCES_STATISTICAL:
            return action.payload.presences;
        default:
            return state;
    }
};
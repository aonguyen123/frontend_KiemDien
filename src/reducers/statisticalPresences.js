import { PRESENCES_STATISTICAL } from './../constants/types';

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type)
    {
        case PRESENCES_STATISTICAL:
            return action.payload.presences;
        default:
            return state;
    }
};
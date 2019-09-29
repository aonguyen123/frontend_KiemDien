import { UPDATE_INFO, UPDATE_PASSWORD } from './../constants/types';

const initialState = {
    user: {},
    status: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_INFO:
            return {
                ...state,
                user: action.payload.user,
                status: action.payload.status
            }
        case UPDATE_PASSWORD: 
            return {
                ...state,
                user: action.payload.admin,
                status: action.payload.status
            }
        default:
            return state;   
    }
};
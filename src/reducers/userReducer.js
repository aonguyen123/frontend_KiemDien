import { GET_USERS, GET_USER_CONDITION_STATUS_TRUE } from './../constants/types';

const initialState = {
    users: []
};

export default function(state = initialState, action) {
    switch(action.type)
    {   
        case GET_USERS:
            return {
                ...state,
                users: action.payload.users
            }
        case GET_USER_CONDITION_STATUS_TRUE:
            return {
                ...state,
                users: action.payload
            }    
        default:
            return state;
    }
};

import { GET_USERS, DELETE_USERS } from './../constants/types';

const initialState = {
    users: [],
    status: ''
};

export default function(state = initialState, action) {
    switch(action.type)
    {   
        case GET_USERS:
            return {
                ...state,
                users: action.payload.users,
                status: action.payload.status
            }
        case DELETE_USERS: 
            return {
                ...state,
                users: action.payload.users,
                status: action.payload.status
            }
        default:
            return state;
    }
};

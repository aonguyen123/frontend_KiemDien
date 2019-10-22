import { GET_USERS, DELETE_USERS, CLEAR_STATUS_DELETE } from './../constants/types';

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
                status: action.payload.status
            }
        case CLEAR_STATUS_DELETE: 
            return {
                ...state,
                status: action.payload
            }         
        default:
            return state;
    }
};

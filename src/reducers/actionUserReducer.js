import { CREATE_USER, DELETE_USERS } from './../constants/types';

const initialState = {
    status: '',
    message: '',
    isSuccess: null
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case CREATE_USER:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        case DELETE_USERS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            }
        default:
            return state;
    }
}
import { CREATE_USER } from './../constants/types';

const initialState = {
    userAdd: {},
    status: ''
}

export default function(state = initialState, action) {
    switch(action.type)
    {
        case CREATE_USER:
            return {
                ...state,
                userAdd: action.payload.userAdd,
                status: action.payload.status
            };
        default:
            return state;
    }
}
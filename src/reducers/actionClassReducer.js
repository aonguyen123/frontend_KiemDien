import {
    ADD_ClASS,
    UPDATE_INFO_CLASS_BY_ID,
    UPDATE_AVATAR_CLASS_BY_ID,
    REMOVE_AVATAR_CLASS_BY_ID
} from './../constants/types';

const initialState = {
    status: '',
    message: '',
    isSuccess: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_ClASS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        case UPDATE_INFO_CLASS_BY_ID:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        case UPDATE_AVATAR_CLASS_BY_ID:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        case REMOVE_AVATAR_CLASS_BY_ID:
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

import {
    UPDATE_INFO_ACCOUNT,
    UPLOAD_PICTURE_ACCOUNT,
    REMOVE_PICTURE_ACCOUNT,
    UPDATE_PASSWORD_ACCOUNT
} from './../constants/types';

const initialState = {
    status: '',
    message: '',
    isSuccess: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_INFO_ACCOUNT:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        case UPLOAD_PICTURE_ACCOUNT:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        case REMOVE_PICTURE_ACCOUNT:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        case UPDATE_PASSWORD_ACCOUNT:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        default:
            return state;
    }
}

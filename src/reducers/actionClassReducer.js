import {
    ADD_ClASS,
    UPDATE_INFO_CLASS_BY_ID,
    UPDATE_AVATAR_CLASS_BY_ID,
    REMOVE_AVATAR_CLASS_BY_ID,
    IMPORT_DSSV_CLASS_BY_ID,
    ADD_CLASS_MEMBER_BY_ID,
    EDIT_CLASS_MEMBER_BY_ID,
    DELETE_CLASS_MEMBER_BY_ID,
    DELETE_CLASS,
    CHANGE_MANAGER_PERSON,
    REMOVE_MANAGER_PERSON
} from './../constants/types';

const initialState = {
    status: '',
    message: '',
    isSuccess: null
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
        case IMPORT_DSSV_CLASS_BY_ID:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            }   
        case ADD_CLASS_MEMBER_BY_ID:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            }
        case EDIT_CLASS_MEMBER_BY_ID:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            }
        case DELETE_CLASS_MEMBER_BY_ID:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            } 
        case DELETE_CLASS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            } 
        case CHANGE_MANAGER_PERSON:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            } 
        case REMOVE_MANAGER_PERSON:
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

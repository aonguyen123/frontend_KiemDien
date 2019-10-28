import { LOG_IN, LOG_OUT } from './../constants/types';

const initialState = {
    status: '',
    message: '',
    isSuccess: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            };
        case LOG_OUT:
            return state;
        default:
            return state;
    }
}

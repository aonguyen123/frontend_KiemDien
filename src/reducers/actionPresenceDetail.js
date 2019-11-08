import { DELETE_PRESENCES_MEMBER } from './../constants/types';

const initialState = {
    status: '',
    message: '',
    isSuccess: null
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case DELETE_PRESENCES_MEMBER:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                isSuccess: action.payload.isSuccess
            }
        default:
            return state;
    }
};
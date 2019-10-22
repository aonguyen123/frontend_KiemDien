import { GET_CLASS_BY_ID } from './../constants/types';

const initialState = {
    lop: {},
    user: {}
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_CLASS_BY_ID:
            return {
                ...state,
                lop: action.payload.lop,
                user: action.payload.user,
            }
        default:
            return state;
    }
};
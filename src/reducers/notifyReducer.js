import { OPEN_NOTIFY, CLOSE_NOTIFY } from './../constants/types';

const initialState = {
    isShow: false
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case OPEN_NOTIFY:
            return {
                ...state,
                isShow: true
            }
        case CLOSE_NOTIFY:
            return {
                ...state,
                isShow: false
            }    
        default:
            return state;
    }
};
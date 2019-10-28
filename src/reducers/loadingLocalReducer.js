import { LOADING_LOCAL, LOADING_LOCAL_SUCCESS } from './../constants/types';

const initialState = {
    loadingLocal: false
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case LOADING_LOCAL:
            return {
                ...state,
                loadingLocal: true
            }
        case LOADING_LOCAL_SUCCESS:
            return {
                ...state,
                loadingLocal: false
            }    
        default:
            return state;
    }
}
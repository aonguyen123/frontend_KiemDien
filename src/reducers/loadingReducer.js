import { FETCHING_DATA, FETCH_DATA_SUCCESS } from './../constants/types';

const initialState = {
    isLoading : false
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case FETCHING_DATA:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false
            }     
        default:
            return state;
    }
};
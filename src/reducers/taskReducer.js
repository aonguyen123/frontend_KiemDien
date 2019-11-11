import { SEARCH_TASK, FILTER_TASK, CLEARN_TASK } from './../constants/types';

const initialState = {
    search: '',
    index: ''
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case SEARCH_TASK:
            return {
                ...state,
                search: action.payload
            }
        case FILTER_TASK:
            return {
                ...state,
                index: action.payload
            }
        case CLEARN_TASK:
            return {
                ...state,
                search: action.payload,
                index: action.payload
            }
        default:
            return state;
    }
};
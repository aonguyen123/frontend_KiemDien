import { SEARCH_TASK, FILTER_TASK, CLEARN_TASK, DATE_FILTER } from './../constants/types';

const initialState = {
    search: '',
    index: '',
    dateFilter: ''
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
        case DATE_FILTER:
            return {
                ...state,
                dateFilter: action.payload.date,
                index: action.payload.index
            }    
        case CLEARN_TASK:
            return {
                ...state,
                search: action.payload,
                index: action.payload,
                dateFilter: action.payload
            }
        default:
            return state;
    }
};
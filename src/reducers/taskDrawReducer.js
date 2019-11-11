import { SEARCH_TASK_DRAW, CLEARN_TASK_DRAW } from './../constants/types';

const initialState = {
    search: ''
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case SEARCH_TASK_DRAW:
            return {
                ...state,
                search: action.payload
            }
        case CLEARN_TASK_DRAW:
            return {
                ...state,
                search: action.payload
            }
        default:
            return state;
    }
};
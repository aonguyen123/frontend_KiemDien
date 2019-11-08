import { STATISTICAL_TOTAL_CLASS } from '../constants/types';

const initialState = {
    dataClassMonthCurrent: [],
    dataClassMonthLast: []
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case STATISTICAL_TOTAL_CLASS:
            return {
                ...state,
                dataClassMonthCurrent: action.payload.lopsMonthCurrent,
                dataClassMonthLast: action.payload.lopsMonthLast
            }
        default:
            return state;
    }
}; 
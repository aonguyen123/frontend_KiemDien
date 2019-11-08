import { STATISTICAL_TOTAL_USER } from './../constants/types';

const initialState = {
    dataUserMonthCurrent: [],
    dataUserMonthLast: []
};
export default function(state = initialState, action) {
    switch(action.type)
    {
        case STATISTICAL_TOTAL_USER:
            return {
                ...state,
                dataUserMonthCurrent: action.payload.usersMonthCurrent,
                dataUserMonthLast: action.payload.usersMonthLast
            }
        default:
            return state;
    }
};
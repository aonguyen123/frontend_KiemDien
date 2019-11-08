import { STATISTICAL_TOTAL_MEMBER } from './../constants/types';

const initialState = {
    totalMember: ''
};

export default function(state = initialState, action) {
    switch(action.type)
    {
        case STATISTICAL_TOTAL_MEMBER:
            return {
                ...state,
                totalMember: action.payload
            }
        default:
            return state;
    }
}
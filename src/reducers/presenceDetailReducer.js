import { GET_PRESENCES_DETAIL } from './../constants/types';

const initialState = {
    classById: {},
    checkDateList: {}
}
export default function(state = initialState, action) {
    switch(action.type)
    {
        case GET_PRESENCES_DETAIL:
            return {
                ...state,
                classById: action.payload.classes,
                checkDateList: action.payload.checkDate
            }
        default:
            return state;
    }
}
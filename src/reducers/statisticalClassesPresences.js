import { CLASSES_PRESENCE_STATISTICAL } from './../constants/types';

const initialState = {
    checkDates: [],
    classPresences: []
};
export default function(state = initialState, action) {
    switch(action.type)
    {
        case CLASSES_PRESENCE_STATISTICAL:
            return {
                ...state,
                checkDates: action.payload.checkDates,
                classPresences: action.payload.classPresences
            };
        default:
            return state;
    }
};
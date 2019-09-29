import { UPLOAD_PICTURE, REMOVE_PICTURE } from '../constants/types';

const initialState = '';
export default function(state = initialState, action) {
    switch(action.type)
    {
        case UPLOAD_PICTURE:
            return action.payload;
        case REMOVE_PICTURE:
            return action.payload;
        default:
            return state;
    }
}
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cityReducer from './cityReducer';
import uploadFileReducer from './uploadFileReducer';
import updateInfoReducer from './updateInfoReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    citys: cityReducer,
    file: uploadFileReducer,
    info: updateInfoReducer
});
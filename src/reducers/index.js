import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cityReducer from './cityReducer';
import uploadFileReducer from './uploadFileReducer';
import updateInfoReducer from './updateInfoReducer';
import userReducer from './userReducer';
import addUserReducer from './addUserReducer';
import classesReducer from './classesReducer';
import actionClassReducer from './actionClassReducer';
import getClassByIdReducer from './getClassByIdReducer';
import loadingReducer from './loadingReducer';
import notifyReducer from './notifyReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    citys: cityReducer,
    file: uploadFileReducer,
    info: updateInfoReducer,
    users: userReducer,
    userAdd: addUserReducer,
    classes: classesReducer,
    actionClass: actionClassReducer,
    classById: getClassByIdReducer,
    isLoading: loadingReducer,
    showNotify: notifyReducer
});
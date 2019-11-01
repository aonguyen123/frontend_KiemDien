import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cityReducer from './cityReducer';
import userReducer from './userReducer';
import actionUserReducer from './actionUserReducer';
import classesReducer from './classesReducer';
import actionClassReducer from './actionClassReducer';
import getClassByIdReducer from './getClassByIdReducer';
import loadingReducer from './loadingReducer';
import notifyReducer from './notifyReducer';
import accountReducer from './accountReducer';
import actionAccountReducer from './actionAccountReducer';
import loadingLocalReducer from './loadingLocalReducer';
import assignesReducer from './assignesReducer';

export default combineReducers({
    auth: authReducer,
    
    errors: errorReducer,   

    users: userReducer,
    actionUser: actionUserReducer,

    classes: classesReducer,
    actionClass: actionClassReducer,
    classById: getClassByIdReducer,
    
    assignesClass: assignesReducer,

    isLoading: loadingReducer,
    loadingLocal: loadingLocalReducer,
    showNotify: notifyReducer,

    account: accountReducer,
    actionAccount: actionAccountReducer,

    citys: cityReducer
});
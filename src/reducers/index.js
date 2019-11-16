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
import statisticalTotalClassReducer from './statisticalTotalClassReducer';
import statisticalTotalUserReducer from './statisticalTotalUserReducer';
import statisticalTotalMemberReducer from './statisticalTotalMemberReducer';
import presencesReducer from './presencesReducer';
import presenceDetailReducer from './presenceDetailReducer';
import actionPresenceDetailReducer from './actionPresenceDetail';
import taskReducer from './taskReducer';
import taskDrawReducer from './taskDrawReducer';
import statisticalPresencesReducer from './statisticalPresences';

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

    citys: cityReducer,

    totalClass: statisticalTotalClassReducer,
    totalUser: statisticalTotalUserReducer,
    totalMember: statisticalTotalMemberReducer,

    presencesClass: presencesReducer,

    presenceDetailClass: presenceDetailReducer,
    actionPresenceDetail: actionPresenceDetailReducer,

    task: taskReducer,
    taskDraw: taskDrawReducer,
    statisticalPresences: statisticalPresencesReducer
});